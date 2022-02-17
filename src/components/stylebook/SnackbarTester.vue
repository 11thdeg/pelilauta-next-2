<script lang="ts" setup>
import { ref } from 'vue'
import Column from '../ui/Column.vue'
import Select from '../ui/Select.vue'
import Button from '../ui/Button.vue'
import { useSnack } from '../../composables/useSnack'
import { useBanner } from '../../composables/useBanner'

const snackmessage = ref('a')
const snacks: Record<string, string> = {
  a: 'snacks.profileCreated',
  b: 'snacks.example'
}

const { pushSnack } = useSnack()
const { raise } = useBanner()

function showSnack () {
  pushSnack(snacks[snackmessage.value])
}

function showBanner () {
  raise(snacks[snackmessage.value])
}

</script>

<template>
  <Column id="SnackBarTester">
    <section>
      <h1>Snacks</h1>
      <Select
        v-model="snackmessage"
        label="Snackbar"
        :options="snacks"
      />
      <Button @click="showSnack">
        Show snack
      </Button>
    </section>
    <section>
      <h1>Banner</h1>
      <Button @click="showBanner">
        Show Banner
      </Button>
    </section>
  </Column>
</template>