import router from '../../router';

mpx.createComponent({
  properties: {
    station: Object,
  },
  methods: {
    toDetail() {
      router.toStationDetail({
        params: {
          id: this.station.id,
        },
      });
    },
    async onTapNavigation() {
      const { latitude, longitude, name, address } = this.station;
      mpx.openLocation({
        latitude,
        longitude,
        name,
        address,
      });
    },
  },
});
