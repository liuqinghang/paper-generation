<template>
  <div>
    <p>user id is :{{$route.params.userId}}</p>
    <br>
    <router-link v-bind:to="'/user/'+$route.params.userId+'/profile'">view</router-link>
    <router-link v-bind:to="'/user/'+$route.params.userId+'/post'">save</router-link>
    <br>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'user',
  components: {
  },
  data () {
    return {
      user: {}
    }
  },
  methods: {
    getUserInfo (id) {

    }
  },
  mounted () {
    console.log(this.$route.params.userId)
    // axios.get().then(response => (
    //   this.subjectList = response.data.data
    // ))
  }
}
</script>

<style scoped>

</style>
