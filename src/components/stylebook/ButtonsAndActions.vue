<script lang="ts" setup>
import Column from '../ui/Column.vue';
import Button from '../ui/Button.vue';
import Fab from '../ui/Fab.vue';
</script>

<template>
  <Column id="ButtonsAndActions">
    <section>
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
    </section>
    <section>
      <h2>Fabs!</h2>
      <Fab
        icon="avatar"
        label="Avatar!"
      />
    </section>
  </Column>
</template>