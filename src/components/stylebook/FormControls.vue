<script lang="ts" setup>
import { computed, ref } from 'vue';
import Column from '../ui/Column.vue';
import Textfield from '../ui/Textfield.vue';
import Select from '../ui/Select.vue';
import FileInput from '../actions/FileInput.vue';

const tfValue = ref('')
const selectValue = ref('init')
const selectOpts: Record<string, string> = {
  init: 'Option init',
  one: 'Option one',
  two: 'Option two',
  three: 'Option three',
  aReallyLongOption: 'Option aReallyLongOption which is quite long',
}
const selectedOp = computed(() => selectOpts[selectValue.value])
</script>

<template>
  <Column class="FormContols double">
    <h1>Forms</h1>
    <p>
      <router-link to="/stylebook/formcontrols">
        Show only this column
      </router-link>
    </p>
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
    <section>
      <h2>Selects</h2>
      <Select 
        v-model="selectValue"
        label="An example select"
        :options="selectOpts"
      />
      <p>The field value is [<span class="code">{{ selectValue }}</span>], which corresponds to option [<span class="code">{{ selectedOp }}</span>]</p>
    </section>
    <section>
      <h2>File Input</h2>
      <p>
        <FileInput />
      </p>
    </section>
  </Column>
</template>
