<template>
  <div class="wrapper">
      <button class="loginButton" v-on:click="login()">Login</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.wrapper{
  .loginButton{
    background-color:blue;
  }
}
</style>
