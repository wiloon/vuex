<template>
  <div class="about">
    Login0
  </div>
</template>
<script>
export default {
  name: 'Login',
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
