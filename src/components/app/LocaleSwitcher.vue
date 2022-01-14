<script lang="ts" setup>
import { computed } from 'vue'
import { useAuthz } from '../../stores/authz'
import Select from '../ui/Select.vue'

const { user, setLocale } = useAuthz()

const locale = computed({
  get():string {
    return user.locale
  },
  set(value: string) {
    setLocale(value)
  },
})

const locales = {
  en: "English",
  fi: "Suomi"
}

</script>

<template>
  <Select
    v-model="locale"
    :options="locales"
    label="Language"
  />
</template>