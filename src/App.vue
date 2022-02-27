<template>
  <div id="app">
    <h1>智能组卷系统</h1>
<!--    <QuestionSelect></QuestionSelect>-->
    <router-link :to="{name:'view'}">view</router-link>
    <router-link :to="{name:'save'}">save</router-link>
    <router-link :to="{name:'user', params:{userId :12}}">user</router-link>
    <router-link :to="{name:'user', params:{userId :13}}">user</router-link>
    <router-view></router-view>
  </div>
</template>

<script>

import QuestionSelect from './components/Question'

export default {
  name: 'App',
  components: {
    QuestionSelect
  },
  mounted () {
    // setTimeout(() => {
    //   this.$router.push({name: 'login'})
    // }, 3000)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
