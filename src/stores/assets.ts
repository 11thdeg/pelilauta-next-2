import { defineStore } from "pinia"
import { Asset } from "../skaldstore/dist"
import type { FirebaseError } from '@firebase/app'
import { getFirestore, getDocs, query, where, collection, addDoc, getDoc, doc, deleteDoc} from '@firebase/firestore'
import { getStorage, ref as storageRef, uploadString, getDownloadURL, deleteObject } from '@firebase/storage'
import { useAuthz } from "./authz"
import { ref } from "vue"
import { logError } from "../utils/loghelpers"

export const useAssets = defineStore('assets', () => {
  const assetCache = ref(new Map<string, Asset>())

  /**
   * This will init the assetcache for a user.
   * 
   * Do note, we will not subscribe to asset changes – as the changes are primarily done
   * by the user, on this app instance.
   * 
   * In effect, to see assets uploaded through another app instance, a reload is required.
   */
  async function initAssetCache () {
    const authz = useAuthz()
    assetCache.value = new Map<string, Asset>()

    const q = query(
      collection(
        getFirestore(),
        'assets'
      ),
      where('owner', '==', authz.user.uid)
    )

    const docs = await getDocs(q)

    docs.forEach((assetDoc) => {
      const asset = new Asset(assetDoc.data())
      assetCache.value.set(asset.id, asset)
    })
  }

  async function uploadAsset (name: string, mimetype:string, dataURL:string): Promise<Asset> {
    const { user } = useAuthz()
    const storage = getStorage()
  
    const asseteRef = storageRef(
      storage,
      '/assetuploads/' + user.uid + '/' + name
    )
  
    const storageSnapshot = await uploadString(
      asseteRef,
      dataURL,
      'data_url'
    )
  
    const downloadUrl = await getDownloadURL(asseteRef)

    const asset = new Asset(name)
    asset.owners = [user.uid]
    asset.mimetype = mimetype
    asset.url = downloadUrl
    asset.storagePath = storageSnapshot.ref.fullPath
  
    const assetDocRef = await addDoc(
      collection(getFirestore(), 'assets'),
      asset.docData
    )

    // Get the fields auto-updated by the server, and add the asset
    // data to the cache
    const savedAssetDoc = await getDoc(assetDocRef)
    const data = await savedAssetDoc.data()

    if (!data) throw new Error('No data returned from addDoc')
    data.id = savedAssetDoc.id

    const cachedAsset = new Asset(data)
    assetCache.value.set(cachedAsset.id, cachedAsset)
    return cachedAsset
  }

  async function deleteAsset (id:string): Promise<void> {
    const { user } = useAuthz()
    const assetDocRef = doc(getFirestore(), 'assets', id)
    const assetDoc = await getDoc(assetDocRef)
  
    if (!assetDoc.data()?.owners.includes(user.uid)) throw new Error('Delete would fail due to the firebase side security rules, aborting.')
  
    const storage = getStorage()
    try {
      const asseteRef = storageRef(
        storage,
        assetDoc.data()?.storagePath
      )
      await deleteObject(asseteRef)
    } catch (err) {
      if ((err as FirebaseError).code !== 'storage/object-not-found') throw err
      logError('Asset does not exist. The Firestore record will be deleted to avoid orphaned data.')
    }
  
    assetCache.value.delete(id)
    return deleteDoc(assetDocRef)
  }

  return {
    assetCache,
    initAssetCache,
    uploadAsset,
    deleteAsset
  }
})