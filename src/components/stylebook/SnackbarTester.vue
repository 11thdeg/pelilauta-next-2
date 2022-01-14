<script lang="ts" setup>
import { ref } from 'vue'
import Column from '../ui/Column.vue'
import Select from '../ui/Select.vue'
import Button from '../ui/Button.vue'
import { useSnack } from '../../composables/useSnack'

const snackmessage = ref('a')
const snacks: Record<string, string> = {
  a: 'snacks.profileCreated',
  b: 'snacks.example'
}

const { pushSnack } = useSnack()

function showSnack () {
  pushSnack(snacks[snackmessage.value])
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
      <Button @click="showSnack">Show snack</Button>
    </section>
  </Column>
</template>