<script lang="ts" setup>
import { ref } from 'vue';
import Column from '../ui/Column.vue';
import Textfield from '../ui/Textfield.vue';

const tfValue = ref('')

</script>

<template>
  <Column class="FormContols double">
    <h1>Forms</h1>
    <p>
      And other input components.
    </p>
    <section>
      <h2>Input fields</h2>
      <Textfield
        v-model="tfValue"
        label="An example field"
      />
      <p>The field value is [<span class="code">{{ tfValue }}</span>]</p>
    </section>
  </Column>
</template>