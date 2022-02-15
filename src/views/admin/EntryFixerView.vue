<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import TopAppBar from '../../components/navigation/TopAppBar.vue'
import { Timestamp, getDocs, getFirestore, collection, DocumentData, updateDoc, doc, getDoc } from '@firebase/firestore'
import SinceTag from '../../components/ui/SinceTag.vue'
import Button from '../../components/ui/Button.vue'
import Select from '../../components/ui/Select.vue'

interface Entry {
  title: string
  content: string
  created: Timestamp
  flowTime: Timestamp
  createdAt: Timestamp
  updatedAt: Timestamp
}

const entries = ref(new Map<string, Entry>()) 
const replyEntries = ref(new Map<string, Entry>())

onMounted(async () => {
  const docs = await getDocs(
    collection(getFirestore(), 'stream')
  )
  docs.forEach(d => {
    const entry = d.data() as Entry
    entries.value.set(d.id, entry)
  })
})

function migrate (entry: Entry): DocumentData {
  const data:DocumentData = {}
  data.created = entry.created
  if (!entry.createdAt) data.createdAt = entry.created
  if (!entry.updatedAt) data.updatedAt = entry.flowTime || entry.created
  if (!entry.flowTime) data.flowTime = entry.updatedAt || entry.created
  return data
}

async function fixEntry(id: string, entry: Entry) {
  const data = migrate(entry)
  await updateDoc(
    doc(
      getFirestore(),
      'stream',
      sel.value,
      'comments',
      id
    ),
    data
  )
  const updated = await getDoc(
    doc(
     getFirestore(),
      'stream',
      sel.value,
      'comments',
      id
    )
  )
  replyEntries.value.set(id, updated.data() as Entry)
}

const options = computed(() => {
  const opts:Record<string, string> = {}
  entries.value.forEach((entry, id) => {
    opts[id] = entry.title
  })
  return opts
})

const sel = ref('')
const selected = computed({
  get: () => {
    return sel.value
  },
  set: (entry:string) => {
    sel.value = entry
    fetchThread()
  }
})

async function fetchThread () {
  replyEntries.value = new Map<string, Entry>()
  const docs = await getDocs(
    collection(getFirestore(), 'stream', sel.value, 'comments')
  )
  docs.forEach(d => {
    const e = d.data() as Entry
    replyEntries.value.set(d.id, e)
  })
}

</script>

<template>
  <TopAppBar title="ENTRYFIXER" />
  <main class="singleColumnLayout">
    <p>Just a tool to fix entries post pelilauta 14 to have createdAt, updatedAt, and flowDate fields</p>
    <p>
      <Select
        v-model="selected"
        :options="options"
        label="threads"
      />  {{ replyEntries.size }} replies
    </p>
    <div class="flex">
      <div
        v-for="entry in replyEntries"
        :key="entry[0]"
        class="grid-item"
      >
        <p>
          {{ entry[0] }} <Button
            :disabled="!!entry[1].createdAt && !!entry[1].updatedAt"
            @click.prevent="fixEntry(entry[0], entry[1])"
          >
            Fix
          </Button><br>
          {{ entry[1].title }}
        </p>
        <p>
          Created: <SinceTag
            :time="entry[1].created"
            style="color: green"
          />
        </p>
        <p>
          Flowtime: <SinceTag
            :time="entry[1].flowTime"
            style="color: blue"
          />
          <span v-if="!entry[1].flowTime"> --> <SinceTag
            :time="migrate(entry[1]).flowTime"
            style="color:green"
          />
          </span>
        </p>
        <p>
          createdAt:
          <SinceTag :time="entry[1].createdAt" />
          <span v-if="!entry[1].createdAt"> --> <SinceTag
            :time="migrate(entry[1]).createdAt"
            style="color:green"
          />
          </span>
        </p>
        <p>
          updatedAt: <SinceTag :time="entry[1].updatedAt" />
          <span v-if="!entry[1].updatedAt && entry[1].flowTime"> --> <SinceTag
            :time="migrate(entry[1]).updatedAt"
            style="color:blue"
          />
          </span>
          <span v-if="!entry[1].updatedAt && !entry[1].flowTime"> --> <SinceTag
            :time="migrate(entry[1]).updatedAt"
            style="color:green"
          />
          </span>
        </p>
      </div>
    </div>
  </main>
</template>