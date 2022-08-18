<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import SiteListFilter from '../../../components/sites/SiteListFilter.vue'

const { t } = useI18n()
const orderBy=ref('date_desc')

</script>

<template>
  <h1>{{ t('sites.all.title') }}</h1>
  <SiteListFilter
    @order_date_desc="orderBy = 'date_desc'"
    @order_name_asc="orderBy ='name_asc'"
  />
</template>