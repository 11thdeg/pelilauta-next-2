<script lang="ts" setup>
import { computed } from 'vue';
import Section from '../layout/Section.vue'
import ActionBar from '../ui/ActionBar.vue';

const props = defineProps<{
  posterurl?: string
  title: string
}>()

const posterURL = computed(() => {
  if (props.posterurl) {
    return props.posterurl
  }
  return 'https://via.placeholder.com/452x256'
})

</script>
<template>
  <Section class="CallToActionSection">
    <div class="poster">
      <img
        :src="posterURL"
        class="posterImage"
        alt=""
      >
      <h1 class="TypeHeadline5">
        {{ title }}
      </h1>
    </div>
    <div class="content chroma-box-1">
      <slot />
      <ActionBar
        class="actions"
        centered
      >
        <slot name="actions" />
      </ActionBar>
    </div>
  </Section>
</template>

<style scoped>
img.posterImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}
div.poster {
  position: relative;
  height: 220px;
  z-index: 0;
}
#app div.poster h1.TypeHeadline5 {
  z-index: 1;
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 0;
  padding: 8px 16px;
  line-height: 24px;
  height: 24px;
  width: calc(100% - 32px);
  background: linear-gradient(180deg,rgba(0,32,30,0),var(--chroma-secondary-a));
  color: white
}

div.content {
  padding: 12px 16px;
  color: var(--chroma-secondary-a)
}

</style>