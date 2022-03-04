<script lang="ts" setup>
import TopAppBar from '../../components/navigation/TopAppBar.vue'
import Main from '../../components/layout/Main.vue'
import { useI18n } from 'vue-i18n'
import Column from '../../components/ui/Column.vue'
import Textfield from '../../components/ui/Textfield.vue'
import { Site } from '@11thdeg/skaldstore'
import { computed, ref } from 'vue'
import ActionBar from '../../components/ui/ActionBar.vue'
import SpacerDiv from '../../components/ui/SpacerDiv.vue'
import Button from '../../components/ui/Button.vue'
import { useAccount } from '../../composables/useAccount'
import { useSites } from '../../composables/useSites'

const { t } = useI18n()
const { account } = useAccount()
const { createSite } = useSites()
const site = ref(new Site())

const name = computed({
  get: () => site.value.name,
  set: (value:string) => {
    site.value.name = value
  }
})

function submit () {
  site.value.owners = [account.value.uid]
  createSite(site.value as Site)
}

</script>

<template>
  <div class="CreateSiteView">
    <TopAppBar
      show-back-button
      :title="t('cta.createSite.add') "
    />
    <Main>
      <Column>
        <Textfield
          v-model="name"
          :label="t('site.fields.name')"
        />
        <ActionBar>
          <SpacerDiv />
          <Button
            text
            @click="$router.back()"
          >
            {{ t('actions.cancel') }}
          </Button>
          <Button @click.prevent="submit">
            {{ t('actions.create') }}
          </Button>
        </ActionBar>
      </Column>
    </Main>
  </div>
</template>