<script lang="ts" setup>
import Card from '../ui/Card.vue'
import Button from '../ui/Button.vue'

</script>

<template>
  <cyan-column class="MarkdownAndSubThemes">
    <h1>Cards</h1>
    <p>
      <router-link to="/stylebook/cards">
        Show only this column
      </router-link>
    </p>
    <div class="gridTwoByTwo">
      <Card :rise="0">
        <h1>Rise 0</h1>
        <p class="subtitle">
          With some text?
        </p>
        <p>And some actual text?</p>
      </Card>
      <Card>
        <p class="subtitle">
          <router-link to="/">
            And a link on top
          </router-link>
        </p>
        <h1>[Rise 1]</h1>
        <p><i>Or more actual text, with italics and some styling and a <a href="/">outlink?</a> maybe?</i></p>
      </Card>
      <Card :rise="2">
        <h1>Rise 2</h1>
        <template #actions>
          <Button text>
            Action?
          </Button>
          <Button>And a Button?</Button>
        </template>
      </Card>
      <Card :rise="3">
        <h1>Rise 3</h1>
      </Card>
    </div>
  </cyan-column>
</template>

<style lang="sass">
.gridTwoByTwo
  display: grid
  grid-template-columns: 1fr 1fr
  grid-template-rows: 1fr 1fr
  gap: var(--page-grid-gap)
</style>