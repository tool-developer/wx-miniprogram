import wxapp from './index.js';

var behaviors = Behavior({
  behaviors: [],
  properties: {},
  data: {},
  methods: { ...wxapp
  },

  definitionFilter(defFields) {
    //
    defFields.methods.__getEvents = () => defFields.events || {};
  },

  created() {
    //
    Object.assign(this, wxapp, {
      data: this.data
    }); // 扩展wxapp方法到this
    // 扩展events

    this.events = wxapp.extend(this.__getEvents(), this.events);
  }

});

export default behaviors;
