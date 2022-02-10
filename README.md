# pelilauta-next

An alpha quality upgrade for Pelilauta.

Will replace the old Pelilauta completely when all the code has been ported to the new version.

## Composition model

### If the call to a service is done in a component only

Do it inside the SFC component ```<script lang="ts" setup>``` as a function

### If its done by multiple components, but does not affect app state

Do it inside a composable in ```@/composables```. See ``ùseThreads.ts``` for an example.

### If its done by multiple components, and affects the app state

Do in in a Pinia Store. See ```assets.ts``` for an example.