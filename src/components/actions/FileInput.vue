<script lang="ts" setup>
import Icon from '../ui/Icon.vue'


function onChange () {

}

</script>

<template>
  <label class="FileInput">
    <input
      type="file"
      class="FileInputInput"
      @change="onChange"
    >
    <Icon
      icon="assets"
      xlarge
    />
  </label>
</template>

<style lang="sass" scoped>
label.FileInput
  display: block
  width: 128px
  height: 128px
  background-color: var(--chroma-secondary-d)
  border: none
  border-radius: 4px

input[type="file"]
  display: none
</style>