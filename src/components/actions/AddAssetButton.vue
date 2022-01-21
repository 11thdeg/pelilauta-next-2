<script lang="ts" setup>
import { ref } from 'vue'
import Button from '../ui/Button.vue'
import Dialog from '../ui/Dialog.vue'

const dialog = ref(true)

</script>

<template>
  <Button @click.prevent="dialog = true">
    Open
  </Button>
  <Dialog
    v-model="dialog"
    label="File upload dialog"
  >
    <div>
      <Button
        @click.prevent="dialog = false"
      >
        close
      </Button>
    </div>
  </Dialog>
</template>