<script lang="ts" setup>
import Button from '../ui/Button.vue'
import Fab from '../ui/Fab.vue'
import Section from '../layout/Section.vue'
import LoveButton from '../actions/LoveButton.vue'
import { computed, ref } from 'vue'
import ToggleButton from '../ui/ToggleButton.vue'


const loveCount = ref(11)
const loveState = ref(false)
const toggled = ref(false)

const loves = computed(
  {
    get: () => {
      return loveState.value
    },
    set (value) {
      loveState.value = value
      if (value) loveCount.value++
      else loveCount.value--
    }
  }
)

</script>

<template>
  <cyan-column id="ButtonsAndActions">
    <Section>
      <h1>Buttons and Actions</h1>
      <Button>A Standard button</Button>
      <Button disabled>
        A Disabled button
      </Button>
      <Button text>
        A Text only button
      </Button>
      <Button
        text
        disabled
      >
        A Disabled button
      </Button>
      <Button icon="avatar">
        With Avatar
      </Button>
      <Button
        icon="avatar"
        text
      >
        With Avatar
      </Button>
    </Section>
    <Section>
      <h2>Fabs!</h2>
      <Fab
        icon="avatar"
        label="Avatar!"
      />
    </Section>
    <Section>
      <h2>Toggle</h2>
      <ToggleButton v-model="toggled" />
      {{ toggled }}
    </Section>
    <Section>
      <h2>Clickables</h2>
      <LoveButton
        v-model:loves="loves"
        :count="loveCount"
      />
    </Section>
  </cyan-column>
</template>