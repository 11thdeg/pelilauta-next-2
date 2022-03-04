<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Icon from '../../ui/Icon.vue'

const props = defineProps<{
  to?: string
  icon?: string
  label: string
  active?: boolean
}>()
const route = useRoute()
const selected = computed(() => props.active || props.to === route.fullPath)
</script>

<template>
  <div
    class="TrayButton TypeButton"
    :class="{ 
      active: selected
    }"
  >
    <router-link
      v-if="to"
      :to="to"
    >
      <Icon
        v-if="icon"
        :icon="icon"
      />
      {{ label }}
    </router-link>
    <template v-else>
      <Icon
        v-if="icon"
        :icon="icon"
      />
      {{ label }}
    </template>
  </div>
</template>
<style scoped>
#app div.TrayButton {
  margin: 0;
  padding: 12px 16px;
  border-radius: 8px;
  transition: background-color 0.2s ease-in-out;
}
#app div.TrayButton:hover {
  background-color: var(--color-rise-b);
}

#app div.TrayButton.active {
  background-color: var(--color-rise-a);
}
#app div.TrayButton.active:hover {
  background-color: var(--color-rise-c);
}

.TrayButton a,
#app div.TrayButton{
  color: var(--chroma-secondary-e);
  text-decoration: none;
}

</style>