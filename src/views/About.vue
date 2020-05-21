<template>
  <div class="about">
    <input v-model="vin">
    <button v-on:click="query0">Qury</button>
    {{ msg }}
  </div>
</template>
<script>
export default {
  name: 'About',
  data: function () {
    return {
      vin: 'msg0',
      msg: ''
    }
  },
  methods: {
    query0: function () {
      console.log(this.vin)
      this.$axios.get('/ping').then(response => (this.msg = response))
    }
  }
}
</script>
