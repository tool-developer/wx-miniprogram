import wxapp from './index';

export default Behavior({
  behaviors:[],
  properties:{},
  data:{},
  methods:{
    ...wxapp
  },
  definitionFilter(defFields){
    //
    defFields.methods = defFields.methods || {};
    defFields.methods.__getEvents = () => defFields.events || {}
  },
  created(){
    //
    Object.assign(this, wxapp,{
      data:this.data
    }); // 扩展wxapp方法到this
    // 扩展events
    this.events = wxapp.extend(this.__getEvents(),this.events);
  }
})