import wxapp from './index.js';

var behaviors = Behavior({
  behaviors: [],
  properties: {},
  data: {},
  methods: { ...wxapp
  },

  created() {
    //
    Object.assign(this, wxapp);
  }

});

export default behaviors;
