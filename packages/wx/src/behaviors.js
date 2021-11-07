import wxapp from './index';

export default Behavior({
  behaviors:[],
  properties:{},
  data:{},
  methods:{
    ...wxapp
  },
  created(){
    //
    Object.assign(this,wxapp)
  }
})