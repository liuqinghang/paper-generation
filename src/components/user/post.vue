<template>
  <h1>post</h1>
</template>
<script>
export default {
  name: 'post',
  data () {
    return {
      user: {}
    }
  },
  methods: {
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
