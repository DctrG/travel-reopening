<template>
  <div class="fixed top-12 z-30 w-full bg-warm-gray-50 overflow-x-scroll sm:overflow-auto">
    <div class="border-b border-gray-200">
      <div class="main-container mb-0">
        <div class="main-container__inner">
          <nav class="flex -mb-px">
            <router-link :to="{hash: '#map'}" id="sitenav2-map"
              class="py-3 pr-1 text-gray-700 no-underline border-b-2 border-transparent
              whitespace-no-wrap hover:opacity-100 sm:hover:border-gray-300 focus:text-tertiary
              sm:focus:border-tertiary">
              Map
            </router-link>
            <router-link :to="{hash: '#international-travel'}" id="sitenav2-international"
              class="py-3 px-1 ml-4 sm:ml-8 text-gray-700 no-underline border-b-2 border-transparent
              whitespace-no-wrap hover:opacity-100 sm:hover:border-gray-300 focus:text-tertiary
              sm:focus:border-tertiary">
              International Travel
            </router-link>
            <router-link :to="{hash: '#visa-quarantine-measures'}" id="sitenav2-visa-quarantine"
              class="py-3 px-1 ml-4 sm:ml-8 text-gray-700 no-underline border-b-2 border-transparent
              whitespace-no-wrap hover:opacity-100 sm:hover:border-gray-300 focus:text-tertiary
              sm:focus:border-tertiary">
              Visa &amp; Quarantine Measures
            </router-link>
            <router-link :to="{hash: '#domestic-travel'}" id="sitenav2-domestic"
              class="py-3 pl-1 pr-4 sm:px-1 ml-4 sm:ml-8 text-gray-700 no-underline border-b-2
              border-transparent whitespace-no-wrap hover:opacity-100 sm:hover:border-gray-300
              focus:text-tertiary sm:focus:border-tertiary">
              Domestic Travel
            </router-link>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentNav',
};
</script>
