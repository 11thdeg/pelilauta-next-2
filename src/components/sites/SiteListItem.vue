<script lang="ts" setup>
import { Site } from '@11thdeg/skaldstore'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { toDisplayString } from '../../utils/firestoreHelpers'
import Card from '../ui/Card.vue'
import SpacerDiv from '../ui/SpacerDiv.vue'

const props = defineProps<{
  site: Site
}>()

const router = useRouter()

const lastUpdate = computed(() => toDisplayString(props.site.flowTime))
</script>

<template>
  <Card
    class="SiteListItem hoverable clickable"
    @click="router.push('/site/' + site.key )"
  >
    <section class="icon">
      <cyan-icon
        :noun="props.site.systemBadge"
        large
      />
    </section>
    <section class="info">
      <h1>{{ site.name }}</h1>
      <p class="TypeBody2">
        {{ site.description }}
      </p>
      <div style="display: flex">
        <SpacerDiv />
        <p class="TypeBody2">
          {{ lastUpdate }}
        </p>
      </div>
    </section>
  </Card>
</template>

<style scoped lang="sass">
.SiteListItem
  display: flex
  flex-direction: row
  .icon
    flex: 0 0 auto
    margin-right: var(--page-grid-gap)
  .info
    flex-grow: 1
</style>