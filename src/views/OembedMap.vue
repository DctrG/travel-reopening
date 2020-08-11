<template>
  <div class="py-12 bg-warm-gray-50">
    <div class="main-container">
      <div class="main-container__inner">
        <h1 class="mb-4">The Ultimate Guide to COVID-19 Travel Restrictions</h1>
        <div class="mb-8">
          <WorldMap/>
          <Legend class="mt-8 md:-mt-24 md:pl-6" />
        </div>
        <div class="text-sm sm:text-center">
          <p class="inline-block sm:mr-1">
            A free and open-source project by <a class="no-underline" href="https://www.tourhero.com/" target="_blank">TourHero</a>.
          </p>
          <p class="inline-block">
            Made with
            <svg class="inline h-6 w-6 text-secondary fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M33.78 18C22.142 18 15 28.178 15 36.526 15 54.578 35.517 71.333 50 82c14.483-10.667 35-27.422 35-45.474C85 28.178 77.858 18 66.22 18c-6.5 0-12.053 5.182-16.22 10.105C45.833 23.182 40.28 18 33.78 18z"/></svg>
            by travelers for travelers.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Legend from '@/components/Map/Legend.vue';
import WorldMap from '@/components/Map/WorldMap.vue';

export default {
  name: 'OembedMap',
  components: {
    Legend,
    WorldMap,
  },
  mounted() {
    this.$nextTick(() => document.dispatchEvent(new Event('render-completed')));
  },
};
</script>
