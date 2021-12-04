//touch位置偏移
const TOUCH_POSITION_OFFSET = 5; //touch时间偏移

const TOUCH_TIMESTAMP_OFFSET = 100;
const methods = {
  TS(e) {
    let point = e.touches && e.touches[0] || e;
    let delta = {
      startX: point.pageX,
      startY: point.pageY,
      endX: point.pageX,
      endY: point.pageY,
      moveX: 0,
      moveY: 0,
      startTimeStamp: e.timeStamp,
      moved: false
    }; //

    this.$target$delta = delta;
    e.delta = delta; //

    let start = this["touchStart"]; //

    start && start.call(this, e);
  },

  TM(e) {
    let point = e.touches && e.touches[0] || e;
    let delta = this.$target$delta || {}; //

    delta.endX = point.pageX;
    delta.endY = point.pageY;
    delta.moveX = delta.endX - delta.startX;
    delta.moveY = delta.endY - delta.startY;
    delta.moveTimeStamp = e.timeStamp - delta.startTimeStamp || 0;
    delta.moved = true; //

    if (delta.moveX === 0 || delta.moveY === 0) {
      //
      delta.moved = false;
    } //


    this.$target$delta = delta;
    e.delta = delta; //

    let move = this["touchMove"]; //

    move && move.call(this, e);
  },

  TE(e) {
    let delta = this.$target$delta || {}; //

    delta.moveTimeStamp = e.timeStamp - delta.startTimeStamp || 0;
    this.$target$delta = delta;
    e.delta = delta; //

    let up = this["touchUp"];
    let left = this["touchLeft"];
    let right = this["touchRight"];
    let down = this["touchDown"];
    let end = this["touchEnd"]; //

    let offset = this.data.TOUCH_POSITION_OFFSET || this.TOUCH_POSITION_OFFSET || TOUCH_POSITION_OFFSET;
    let timestamp = this.data.TOUCH_TIMESTAMP_OFFSET || this.TOUCH_TIMESTAMP_OFFSET || TOUCH_TIMESTAMP_OFFSET; //满足时间偏移

    if (delta.moveTimeStamp >= timestamp) {
      const absX = Math.abs(delta.moveX);
      const absY = Math.abs(delta.moveY); //right

      if (delta.moveX > offset && absX > absY) {
        //
        right && right.call(this, e);
      } //left


      if (delta.moveX < -offset && absX > absY) {
        //
        left && left.call(this, e);
      } //down


      if (delta.moveY > offset && absY > absX) {
        //
        down && down.call(this, e);
      } //up


      if (delta.moveY < -offset && absY > absX) {
        //
        up && up.call(this, e);
      }
    } //end


    end && end.call(this, e);
  }

}; // 提供给子组件调用

var touchevent = Behavior({
  data: {
    TOUCH_POSITION_OFFSET,
    TOUCH_TIMESTAMP_OFFSET
  },
  methods
});

export default touchevent;
