<script setup lang="ts">
import Icon from '/src/components/ui/Icon.vue'
</script>

<template>
  <div class="loader">
    <Icon
      xlarge
      icon="mekanismi"
      class="spinner"
    />
  </div>
</template>

<style scoped>

.loader {
  background-color: var(--color-rise-a);
  width: 104px;
  border-radius: 50%;
  height: 104px;
  padding: 0;
  margin: 12px;
}
.spinner {
  margin-top: -12px !important; 
  margin-left: -12px !important;
  opacity: 0.2;
  animation-name: spin;
  animation-duration: 4000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear; 
}

@keyframes spin {
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
}

</style>