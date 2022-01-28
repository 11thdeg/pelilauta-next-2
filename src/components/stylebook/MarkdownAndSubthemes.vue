<script lang="ts" setup>
import { ref } from 'vue';
import Column from '../ui/Column.vue'
import TextArea from '../ui/TextArea.vue'
import MarkDownSection from '../ui/MarkDownSection.vue';

const markdown = ref('# Markdown demo\n\n- With some text\n')
</script>

<template>
  <Column class="MarkdownAndSubThemes">
    <h1>Markdown and Themes</h1>
    <h2>Enter Markup</h2>
    <TextArea v-model="markdown" label="aaa"/>
    <h2>Preview</h2>
    <MarkDownSection :content="markdown" />
  </Column>
</template>