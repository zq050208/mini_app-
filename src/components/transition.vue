<!--
来自 vant 
-->
<template>
  <view
    wx:if="{{ inited }}"
    class="van-transition custom-class {{ classes }}"
    style="-webkit-transition-duration:{{ currentDuration }}ms; transition-duration:{{ currentDuration }}ms; {{ display ? '' : 'display: none;' }} {{ customStyle }}"
    bind:transitionend="onTransitionEnd"
  >
    <slot />
  </view>
</template>

<script name="json">
module.exports = {
  component: true,
};
</script>

<script>
import { isObj } from '@/utils/types';
const getClassNames = name => ({
  enter: `van-${name}-enter van-${name}-enter-active enter-class enter-active-class`,
  'enter-to': `van-${name}-enter-to van-${name}-enter-active enter-to-class enter-active-class`,
  leave: `van-${name}-leave van-${name}-leave-active leave-class leave-active-class`,
  'leave-to': `van-${name}-leave-to van-${name}-leave-active leave-to-class leave-active-class`,
});

const nextTick = () => new Promise(resolve => setTimeout(resolve, 1000 / 30));

mpx.createComponent({
  externalClasses: [
    'enter-class',
    'enter-active-class',
    'enter-to-class',
    'leave-class',
    'leave-active-class',
    'leave-to-class',
    'custom-class',
  ],
  properties: {
    customStyle: String,
    show: {
      type: Boolean,
      value: false,
      observer: 'observeShow',
    },
    duration: {
      type: null,
      value: 300,
      observer: 'observeDuration',
    },
    name: {
      type: String,
      value: 'fade',
    },
  },
  data: {
    type: '',
    inited: false,
    display: false,
    classes: '',
    currentDuration: null,
  },
  methods: {
    observeShow(value, old) {
      if (value === old) {
        return;
      }
      value ? this.enter() : this.leave();
    },

    enter() {
      const { duration, name } = this;
      const classNames = getClassNames(name);
      const currentDuration = isObj(duration) ? duration.enter : duration;

      this.status = 'enter';
      this.triggerEvent('before-enter');

      Promise.resolve()
        .then(nextTick)
        .then(() => {
          this.checkStatus('enter');
          this.triggerEvent('enter');

          /*         this.setData({
            inited: true,
            display: true,
            classes: classNames.enter,
            currentDuration,
          }); */
          this.inited = true;
          this.display = true;
          this.classes = classNames.enter;
          this.currentDuration = currentDuration;
        })
        .then(nextTick)
        .then(() => {
          this.checkStatus('enter');
          this.transitionEnded = false;

          /*  this.setData({
            classes: classNames['enter-to'],
          }); */
          this.classes = classNames['enter-to'];
        })
        .catch(() => {});
    },

    leave() {
      if (!this.display) {
        return;
      }

      const { duration, name } = this;
      const classNames = getClassNames(name);
      const currentDuration = isObj(duration) ? duration.leave : duration;

      this.status = 'leave';
      this.triggerEvent('before-leave');

      Promise.resolve()
        .then(nextTick)
        .then(() => {
          this.checkStatus('leave');
          this.triggerEvent('leave');

          /* this.setData({
            classes: classNames.leave,
            currentDuration,
          }); */
          this.classes = classNames.leave;
          this.currentDuration = currentDuration;
        })
        .then(nextTick)
        .then(() => {
          this.checkStatus('leave');
          this.transitionEnded = false;
          setTimeout(() => this.onTransitionEnd(), currentDuration);

          /*  this.setData({
            classes: classNames['leave-to'],
          }); */
          this.classes = classNames['leave-to'];
        })
        .catch(() => {});
    },

    checkStatus(status) {
      if (status !== this.status) {
        throw new Error(`incongruent status: ${status}`);
      }
    },

    onTransitionEnd() {
      if (this.transitionEnded) {
        return;
      }

      this.transitionEnded = true;
      this.triggerEvent(`after-${this.status}`);

      const { show, display } = this;
      if (!show && display) {
        // this.setData({ display: false });
        this.display = false;
      }
    },
  },
});
</script>

<style lang="less">
.van-transition {
  transition-timing-function: ease;
}

.van-fade-enter-active,
.van-fade-leave-active {
  transition-property: opacity;
}

.van-fade-enter,
.van-fade-leave-to {
  opacity: 0;
}

.van-fade-up-enter-active,
.van-fade-up-leave-active,
.van-fade-down-enter-active,
.van-fade-down-leave-active,
.van-fade-left-enter-active,
.van-fade-left-leave-active,
.van-fade-right-enter-active,
.van-fade-right-leave-active {
  transition-property: opacity, transform;
}

.van-fade-up-enter,
.van-fade-up-leave-to {
  transform: translate3d(0, 100%, 0);
  opacity: 0;
}

.van-fade-down-enter,
.van-fade-down-leave-to {
  transform: translate3d(0, -100%, 0);
  opacity: 0;
}

.van-fade-left-enter,
.van-fade-left-leave-to {
  transform: translate3d(-100%, 0, 0);
  opacity: 0;
}

.van-fade-right-enter,
.van-fade-right-leave-to {
  transform: translate3d(100%, 0, 0);
  opacity: 0;
}

.van-slide-up-enter-active,
.van-slide-up-leave-active,
.van-slide-down-enter-active,
.van-slide-down-leave-active,
.van-slide-left-enter-active,
.van-slide-left-leave-active,
.van-slide-right-enter-active,
.van-slide-right-leave-active {
  transition-property: transform;
}

.van-slide-up-enter,
.van-slide-up-leave-to {
  transform: translate3d(0, 100%, 0);
}

.van-slide-down-enter,
.van-slide-down-leave-to {
  transform: translate3d(0, -100%, 0);
}

.van-slide-left-enter,
.van-slide-left-leave-to {
  transform: translate3d(-100%, 0, 0);
}

.van-slide-right-enter,
.van-slide-right-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
