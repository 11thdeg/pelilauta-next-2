<script lang="ts" setup>
import { ref } from 'vue'
import Button from '../ui/Button.vue'
import Dialog from '../ui/Dialog.vue'
import FileInput from './FileInput.vue';
import Textfield from '../ui/Textfield.vue';

const dialog = ref(true)

const fileName = ref('')

</script>

<template>
  <Button @click.prevent="dialog = true">
    Open
  </Button>
  <Dialog
    v-model="dialog"
    label="File upload dialog"
  >
    <div class="fileDataForm">
      <FileInput />
      <div class="fields">
        <Textfield
          v-model="fileName"
          label="Name"
        />
      </div>
    </div>
  </Dialog>
</template>

<style lang="sass" scoped>
.fileDataForm
  display: flex
  gap: 12px
  .fields
    flex-grow: 1
</style>