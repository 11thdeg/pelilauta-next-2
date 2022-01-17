<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import TopAppBar from '../components/navigation/TopAppBar.vue'
import Button from '../components/ui/Button.vue'
import Textfield from '../components/ui/Textfield.vue'
import { doc, getFirestore, deleteDoc } from '@firebase/firestore'
import { useAuthz } from '../stores/authz'
import { getAuth, signOut } from 'firebase/auth'
import { useSnack } from '../composables/useSnack'

const t = useI18n().t

const deleteConfirm = ref('')

const { user } = useAuthz()
const { pushSnack } = useSnack()

const deleteAccount = async () => {
  if (deleteConfirm.value === 'poista') {
    const profileRef = doc(getFirestore(), 'profiles', user.uid)
    try {
      await deleteDoc (profileRef)
    } catch (error) {
      pushSnack('snacks.error', { topic: (error as Error).message })
      console.error(error)
    }
    const accountRef = doc(getFirestore(), 'accounts', user.uid)
    // Do note: this delete from database, should trigger a cloud function to delete the login details from firebase also.
    await deleteDoc (accountRef)
    await signOut(getAuth())
    pushSnack('snacks.accountDeleted')
  }
}
</script>
<template>
  <div id="AccountDeleteView">
    <TopAppBar
      show-back-button
      :title="t('account.delete.title')"
    />
    <main class="singleColumnLayout">
      <h2>{{ t('account.delete.title') }}</h2>
      <p>
        <Textfield 
          v-model="deleteConfirm"
          :label="t('account.delete.confirm')"
        />
      </p>
      <p>
        <Button
          text
          @click.prevent="$router.push('/account')"
        >
          {{ t('actions.back') }}
        </Button>
        <Button
          text
          :disabled="deleteConfirm != 'poista'"
          @click.prevent="deleteAccount"
        >
          {{ t('actions.delete') }}
        </Button>
      </p>
    </main>
  </div>
</template>