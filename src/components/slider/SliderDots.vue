<template>
  <div class="slider-dots-wrap">
    <span class="slider-dot"  v-for="i in count", :class="{ 'slider-dot-selected': this.current === i }", @click="handleClick(i)"></span>
  </div>
</template>

<script>
  export default {
    props: {
      count: {
        type: Number,
        required: true
      },
      current: {
        type: Number,
        required: true,
        default: 0
      },
      turn: {
        type: Function,
        required: true
      }
    },
    methods: {
      handleClick (i) {
        let option = i - this.current
        this.turn(option)
      }
    }
  }
</script>
