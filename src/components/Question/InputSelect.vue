<template>
  <select v-model="res" @change="retRes(res)" style="width: 100%">
    <option
      v-for="item in info"
      :key="item.selectKey"
      :label="item.selectLabel"
      :value="item.selectValue"
    >
    </option>
  </select>
</template>

<script>
export default {
  name: 'InputSelect',
  props: {
    info: [],
    method: ''
  },
  data: function () {
    return {
      res: ''
    }
  },
  beforeCreate () {
    console.log()
  },
  created: function () {
  },
  methods: {
    retRes (res) {
      console.log('调用返回2')
      this.$emit(this.method, res)
    },
    updateInfo (info) {
      this.info = info
    },
    resetChoosed () {
      this.res = ''
    }
  },
  // 组件初始化时 加载数据
  mounted () {
  }
}
</script>
