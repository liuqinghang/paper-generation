<template>
  <h1>profile</h1>
</template>
<script>
export default {
  name: 'profile',
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
