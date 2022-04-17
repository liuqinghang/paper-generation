<template>
  <div id="app">
    <h1>智能组卷系统</h1>
<!--    <QuestionSelect></QuestionSelect>-->
    <router-link :to="{name:'view'}">试题查询</router-link>
    <router-link :to="{name:'save'}">试题录入</router-link>
    <router-link :to="{name:'autogenerate'}">智能组卷</router-link>
<!--    <router-link :to="{name:'wordGenerate'}">试卷渲染</router-link>-->
    <router-link :to="{name:'user', params:{userId :13}}">user</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  mounted () {
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
