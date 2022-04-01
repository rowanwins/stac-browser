import Utils from '../utils';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      shownAssetsOnMap: [],
      shownBandsOnMap: [],
      tab: null,
      selectedAsset: null,
      selectedAssetKey: null
    };
  },
  computed: {
    ...mapGetters(['thumbnails', 'hasAssets', 'assets']),
    shownAssets() {
      if (this.tab === 0) {
        return this.shownAssetsOnMap;
      }
      else if (this.tab === 1 || (this.tab === null && this.thumbnails.length > 0)) {
        let keys = [];
        for(let key in this.assets) {
          let asset = this.assets[key];
          if (this.thumbnails.includes(asset)) {
            keys.push(key);
          }
        }
        return keys;
      }
      return [];
    }
  },
  methods: {
    showAsset(asset, id, isThumbnail) {
      if (isThumbnail) {
        this.tab = 1;
      }
      else {
        this.tab = 0;
        this.selectedAsset = asset;
        this.selectedAssetKey = id;
      }
      if (this.$refs.tabs) {
        Utils.scrollTo(this.$refs.tabs.$el);
      }
    },
    mapChanged(data) {
      if (!Utils.isObject(data)) {
        this.shownBandsOnMap = [];
        this.shownAssetsOnMap = [];
      }
      else {
        if (Utils.size(data.assets) > 0) {
          if (this.selectedAssetKey) {
            this.shownAssetsOnMap = [this.selectedAssetKey];
          }
          else {
            this.shownAssetsOnMap = data.assets.map(meta => meta.key);
          }
        }
        if (Utils.size(data.bands) > 0) {
          this.shownBandsOnMap = data.bands;
        }
      }
    }
  }
}