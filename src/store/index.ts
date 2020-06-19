/* eslint-disable max-len */
import Vue from 'vue';
import Vuex from 'vuex';
/* eslint-disable-next-line @typescript-eslint/ban-ts-ignore */
// @ts-ignore
import * as CountryOptions from '@/constants/countries';
// import Travel from '@/constants/travel';
import { Travel, OpenStatus, TravelDirection } from '@/constants/travel';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    country: null,
    countryOptions: CountryOptions
      .sort((a: {name: string}, b: {name: string}) => a.name.localeCompare(b.name)),
    travelContext: TravelDirection.Inbound,
    Travel,
  },
  mutations: {
    updateCountry(state, country) {
      state.country = country;
    },
    toggleContext(state) {
      const context = state.travelContext === TravelDirection.Inbound
        ? TravelDirection.Outbound : TravelDirection.Inbound;
      state.travelContext = context;
    },
  },
  actions: {
    updateCountryAction({ commit }, country) {
      commit('updateCountry', country);
    },
    toggleContextAction({ commit }) {
      commit('toggleContext');
    },
  },
  modules: {
  },
  getters: {
    getCountryByCode(state) {
      return (code: string) => state.countryOptions
        .find((country: {code: string}) => country.code === code);
    },
    getCountryById(state) {
      return (id: string) => state.countryOptions
        .find((country: {id: string}) => country.id === id);
    },
    getCountryGlobalState(state) {
      return (code: string) => {
        const c = state.Travel.countries[code] || {};
        return {
          domestic: c?.travel?.domestic,
          inbound: c?.travel?.inbound,
          outbound: c?.travel?.outbound,
          updatedOn: c.updated_on,
        };
      };
    },
    getCountryState(state) {
      return (code: string, direction: string, currentCountry: {code: string}) => {
        if (currentCountry && direction === TravelDirection.Inbound) {
          const currentCountryTravel = state.Travel.countries[currentCountry.code]?.travel;
          if (currentCountryTravel?.inbound_allowed) { return currentCountryTravel.inbound_allowed.includes(code) ? OpenStatus.Open : OpenStatus.Closed; }
          if (currentCountryTravel?.inbound_restricted) { return currentCountryTravel.inbound_restricted.includes(code) ? OpenStatus.Closed : OpenStatus.Open; }
          return currentCountryTravel?.inbound;
        }
        if (currentCountry && direction === TravelDirection.Outbound) {
          const currentCountryTravel = state.Travel.countries[currentCountry.code]?.travel;
          if (currentCountryTravel?.outbound === OpenStatus.Closed) { return OpenStatus.Closed; }
          const countryTravel = state.Travel.countries[code]?.travel;
          if (countryTravel?.inbound_allowed) { return countryTravel.inbound_allowed.includes(currentCountry.code) ? OpenStatus.Open : OpenStatus.Closed; }
          if (countryTravel?.inbound_restricted) { return countryTravel.inbound_restricted.includes(currentCountry.code) ? OpenStatus.Closed : OpenStatus.Open; }
          return countryTravel?.inbound;
        }
        return state.Travel.countries[code]?.travel[direction];
      };
    },
  },
});
