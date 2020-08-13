<template>
  <div>
    <p class="mt-3 text-base md:text-lg font-medium">{{mapTitle}}</p>
    <svg :width="svgWidth" :height="svgHeight" viewBox="410 120 700 400"></svg>
  </div>
</template>

<script>
import { select, json, mouse } from 'd3';
import { geoPath } from 'd3-geo';
import { geoVanDerGrinten3 } from 'd3-geo-projection';
import { feature } from 'topojson';
import { mapGetters, mapState } from 'vuex';
import { OpenStatus, TravelDirection } from '@/constants/travel';

const EXCLUDE_COUNTRIES = ['Antarctica']; // Antarctica

const renderTooltip = (accessor) => (selection) => {
  if ('ontouchstart' in document) { return; }
  let tooltipDiv;
  const bodyNode = select('body').node();
  selection.on('mouseover', () => {
    // Clean up lost tooltips
    select('body').selectAll('div.tooltip').remove();
    // Append tooltip
    tooltipDiv = select('body').append('div').attr('class', 'tooltip');
    const absoluteMousePos = mouse(bodyNode);
    tooltipDiv.style('left', `${absoluteMousePos[0] + 10}px`)
      .style('top', `${absoluteMousePos[1] - 15}px`)
      .style('position', 'absolute')
      .style('z-index', 1001);
  })
    .on('mousemove', (d, i) => {
      const absoluteMousePos = mouse(bodyNode);
      tooltipDiv.style('left', `${absoluteMousePos[0] + 20}px`)
        .style('top', `${absoluteMousePos[1] - 15}px`);
      const tooltipText = accessor(d, i) || '';
      tooltipDiv.html(tooltipText);
    })
    .on('mouseout', () => {
      tooltipDiv.remove();
    });
};

function travelStateLabel(state) {
  switch (state) {
    case OpenStatus.Open: return 'Allowed';
    case OpenStatus.Closed: return 'Restricted';
    case OpenStatus.Partial: return 'Partially allowed';
    default: return 'Unknown';
  }
}

function tooltipBodyGlobal(country) {
  const state = this.getCountryGlobalState(country.code);
  return `
    <div class="bg-white rounded-md shadow">
      <div class="px-4 py-3">
        <div class="flex flex-col">
          <p class="mb-2 text-xs font-semibold">${country.name}</p>
          <div class="inline-grid grid-cols-legend row-gap-1 col-gap-2 items-baseline">
            <span class="text-xs">Domestic</span>
            <span class="badge badge--xs badge--${state.domestic || OpenStatus.Unknown}">
              ${travelStateLabel(state.domestic)}
            </span>
            <span class="text-xs">Entry</span>
            <span class="badge badge--xs badge--${state.inbound || OpenStatus.Unknown}">
              ${travelStateLabel(state.inbound)}
            </span>
            <span class="text-xs">Exit</span>
            <span class="badge badge--xs badge--${state.outbound || OpenStatus.Unknown}">
              ${travelStateLabel(state.outbound)}
            </span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function tooltipBodyForCountry(country) {
  const state = this.getCountryState(country.code, this.travelContext, this.country);
  return `
    <div class="bg-white rounded-md shadow">
      <div class="p-2">
        <div class="flex items-baseline">
          <span class="mr-2 text-xs font-semibold">${country.name}</span>
          <span class="badge badge--xs badge--${state || OpenStatus.Unknown}">
             ${travelStateLabel(state)}
          </span>
        </div>
      </div>
    </div>
  `;
}

function tooltipBody(d) {
  const country = this.getCountryById(d.id);
  if (!country) { return false; }

  const bodyFunction = this.country ? tooltipBodyForCountry : tooltipBodyGlobal;
  return bodyFunction.bind(this)(country);
}

export default {
  data() {
    return {
      isMobile: false,
      svgMaxWidth: 900,
      svgWidth: undefined,
      svgHeight: undefined,
      baseUrl: process.env.BASE_URL,
    };
  },
  computed: {
    ...mapGetters(['getCountryById', 'getCountryState', 'getCountryGlobalState']),
    ...mapState(['country', 'travelContext']),
    oembedMap() {
      return this.$route.name === 'OembedMap';
    },
    mapTitle() {
      if (this.country) {
        return this.travelContext === TravelDirection.Inbound
          ? `I can travel to ${this.country.name} from:`
          : `I can travel from ${this.country.name} to:`;
      }
      return this.travelContext === TravelDirection.Inbound
        ? 'Entry travel restrictions'
        : 'Exit travel restrictions';
    },
  },
  methods: {
    handleSizeChange() {
      const padding = 12 * 2; // 2 rem
      this.svgWidth = Math.min(+select('body').style('width').slice(0, -2) - padding, this.svgMaxWidth) - padding;
      this.svgHeight = Math.round(this.svgWidth / 2);
      this.isMobile = 'ontouchstart' in document && window.matchMedia('(max-width: 400px)').matches;
    },
    handleCountryChange(country) {
      this.drawCurrentCountry(country);
      this.drawOpenRegions(this.travelContext);
    },
    handleContextChange(context) {
      this.drawOpenRegions(context);
    },
    drawCurrentCountry(currentCountry) {
      select(this.$el)
        .selectAll('.state')
        .classed('current', (d) => !!currentCountry && +d.id === +currentCountry.id);
    },
    drawOpenRegions(context) {
      select(this.$el)
        .selectAll('.state')
        .classed('open', (d) => {
          if (d?.id) {
            const country = this.getCountryById(d.id);
            return this.getCountryState(country.code, context, this.country) === OpenStatus.Open;
          }
          return false;
        })
        .classed('closed', (d) => {
          if (d?.id) {
            const country = this.getCountryById(d.id);
            return this.getCountryState(country.code, context, this.country) === OpenStatus.Closed;
          }
          return false;
        })
        .classed('partial', (d) => {
          if (d?.id) {
            const country = this.getCountryById(d.id);
            return this.getCountryState(country.code, context, this.country) === OpenStatus.Partial;
          }
          return false;
        })
        .classed('undefined', (d) => {
          if (d?.id) {
            const country = this.getCountryById(d.id);
            return this.getCountryState(country.code, context, this.country) === undefined;
          }
          return true;
        });
    },
  },
  created() { window.addEventListener('resize', this.handleSizeChange); },
  destroyed() {
    select('body').selectAll('div.tooltip').remove();
    window.removeEventListener('resize', this.handleSizeChange);
  },
  mounted() {
    const svg = select(this.$el).select('svg');
    const projection = geoVanDerGrinten3();
    const path = geoPath().projection(projection);

    json(`${this.baseUrl}data/countries-110m.json`).then((data) => {
      const countries = feature(data, data.objects.countries)
        .features
        .filter(({ properties: { name } }) => !EXCLUDE_COUNTRIES.includes(name));
      const g = svg.append('g');
      g
        .selectAll('.state')
        .data(countries)
        .enter()
        .append('path')
        .attr('class', 'state')
        .attr('d', path)
        .on('click', (d) => {
          if (this.isMobile) { return; }

          const country = this.getCountryById(d.id);

          if (this.$route.params.country === country.slug) return;

          if (this.oembedMap) {
            window.open(`${this.baseUrl}/${country.slug}.html`, '_blank');
          } else {
            this.$router.push({ name: 'Country', params: { country: country.slug } });
          }
        })
        .call(renderTooltip(tooltipBody.bind(this)))
        .attr('transform', 'scale(1.55)');

      if (this.country) this.handleCountryChange(this.country);
      if (this.travelContext) this.handleContextChange(this.travelContext);
      this.handleSizeChange();
    });
  },
  watch: {
    country(currentCountry) { this.handleCountryChange(currentCountry); },
    travelContext(context) { this.handleContextChange(context); },
  },
};
</script>

<style lang="scss">
  .state {
    @media (min-width: 400px), (hover: hover) {
      cursor: pointer;
      &:hover { opacity: 0.85; }
    }
    fill: theme("colors.gray.400");
    stroke: theme("colors.gray.200");
    stroke-width: 0.5;
    transition: fill 100ms ease;
    &.undefined { fill: theme("colors.gray.400"); }
    &.closed    { fill: theme("colors.secondary"); }
    &.open      { fill: theme("colors.state-open") }
    &.partial   { fill: theme("colors.state-partial") }
    &.current   {
      fill: theme("colors.primary");
      &:hover {
        cursor: unset;
        opacity: 1;
      }
    }
  };
</style>
