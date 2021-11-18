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
    defFields.methods.__getEvents = () => defFields.events
  },
  created(){
    //
    Object.assign(this,wxapp);
    // 扩展events
    this.events = wxapp.extend(this.__getEvents(),this.events);
  }
})