<script setup lang="ts">
import Button from '../components/ui/Button.vue'
import NavigationComponents from '../components/stylebook/NavigationComponents.vue'
import Loader from '../components/ui/Loader.vue'
import Column from '../components/ui/Column.vue'
import StyleBookIntro from '../components/stylebook/StyleBookIntro.vue'
</script>

<template>
  <div class="bookLayout">
    <StyleBookIntro />
    <Column class="double-cut">
      <Button>Button</Button>
      <Loader />
    </Column>
    
    <NavigationComponents class="double" />
  </div>
</template>