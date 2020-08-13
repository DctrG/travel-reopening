<template>
  <div>
    <div class="main-container">
      <div class="main-container__inner">
        <div class="mb-4 sm:mb-6 lg:mb-8">
          <h1>The Ultimate Guide to COVID-19 Travel Restrictions</h1>
          <div class="flex flex-col sm:justify-between sm:flex-row mb-2 sm:mb-4">
            <div class="sm:order-last mt-1 mb-2 sm:my-0">
              <ShareNetwork />
              <button @click="embed">Embed</button>
              <OembedMapComponent v-show="false" ref="oembedMap" />
              <textarea ref="codeContainer"></textarea>
            </div>
            <p class="w-full md:w-9/12 sm:order-first">
              A free and open-source project by
              <a class="inline-flex no-underline" href="https://www.tourhero.com/" target="_blank">TourHero</a>.
              <span class="inline-block mb-3 sm:mb-0">Made with
                <svg class="inline h-6 w-6 text-secondary fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M33.78 18C22.142 18 15 28.178 15 36.526 15 54.578 35.517 71.333 50 82c14.483-10.667 35-27.422 35-45.474C85 28.178 77.858 18 66.22 18c-6.5 0-12.053 5.182-16.22 10.105C45.833 23.182 40.28 18 33.78 18z"/></svg>
                by travelers for travelers.
              </span>
            </p>
          </div>
          <p class="w-full md:w-9/12">
            <span class="font-semibold">How it works:</span>
            Select the country you want to visit and view the travel restrictions.
            Or, switch to the country you’re traveling from to see which countries
            you’re allowed to enter.
            Travel safe!
          </p>
        </div>
        <div class="flex flex-col sm:flex-row mb-4 sm:mb-6 lg:mb-8">
          <div class="mr-0 sm:mr-2">
            <TravelDirectionToggle/>
          </div>
          <CountrySelect class="w-full md:max-w-md mt-4 sm:mt-0"/>
        </div>
      </div>
    </div>
    <div class="bg-warm-gray-50 py-1 mb-4 sm:mb-6 lg:mb-8">
      <div class="main-container">
        <div class="main-container__inner">
          <WorldMap/>
          <div class="mt-8 md:-mt-24 md:pl-6">
            <Legend/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CountrySelect from '@/components/CountrySelect.vue';
import Legend from '@/components/Map/Legend.vue';
import OembedMapComponent from '@/components/Map/OembedMapComponent.vue';
import ShareNetwork from '@/components/ShareNetwork.vue';
import TravelDirectionToggle from '@/components/TravelDirectionToggle.vue';
import WorldMap from '@/components/Map/WorldMap.vue';

export default {
  name: 'TitleMapSelect',
  components: {
    CountrySelect,
    Legend,
    OembedMapComponent,
    ShareNetwork,
    TravelDirectionToggle,
    WorldMap,
  },
  methods: {
    embed() {
      const omebedMapHtml = this.$refs.oembedMap.$el.innerHTML;
      const { codeContainer } = this.$refs;
      codeContainer.value = omebedMapHtml;
      document.execCommand('copy', codeContainer.select());
    },
  },
};
</script>
