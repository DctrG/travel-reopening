<template>
  <div id="app" class="font-body text-gray-800">
    <component :is="layout" />
  </div>
</template>

<script>
import DefaultLayout from '@/views/layouts/DefaultLayout.vue';

export default {
  name: 'App',
  components: {
    DefaultLayout,
  },
  computed: {
    layout() {
      if (this.$route.name === 'OembedMap') {
        return OembedLayout;
      }
      return DefaultLayout;
    },
  },
};
</script>
