<template>
  <div>
    <div class="input-box">
    <div class="input-text">单选题数量</div>
      <div class="input-content">
        <input v-model="rule.singleNum">
      </div>
    </div>
    <div class="input-box">
      <div class="input-text">分值</div>
      <div class="input-content">
        <input v-model="rule.singleScore">
      </div>
    </div>
    <div class="input-box">
      <div class="input-text">多选题数量</div>
      <div class="input-content">
        <input v-model="rule.multiNum">
      </div>
    </div>
    <div class="input-box">
      <div class="input-text">分值</div>
      <div class="input-content">
        <input v-model="rule.multiScore">
      </div>
    </div>
    <div class="input-box">
      <div class="input-text">填空题数量</div>
      <div class="input-content">
        <input v-model="rule.completeNum">
      </div>
    </div>
    <div class="input-box">
      <div class="input-text">分值</div>
      <div class="input-content">
        <input v-model="rule.completeScore">
      </div>
    </div>
    <div class="input-box">
      <div class="input-text">简答题数量</div>
      <div class="input-content">
        <input v-model="rule.subjectiveNum" style="display: inline; width: fit-content">
      </div>
    </div>
    <div class="input-box">
      <div class="input-text">分值</div>
      <div class="input-content">
        <input v-model="rule.subjectiveScore">
      </div>
    </div>
    <div class="input-text">试题期望难度</div>
    <div class="input-content">
      <input v-model="rule.difficulty">
    </div>
    <button @click="getSmartPaper">自动组卷</button>
    <button @click="jump2Preview">试卷预览</button>
    <div v-if="this.das.length > 0" style="padding: 5px; border: solid; border-radius: 5px">
      <table v-for="(item,index) in this.das" :item="item" :key="index">
        <tr>
          <td class="content">{{index}}</td>
          <td class="content">{{item.questionId}}</td>
          <td class="content">{{item.typeName}}</td>
          <td class="content">{{item.content}}</td>
<!--          <td class="content">{{item.detail}}</td>-->
          <td><button @click="upQuestion(index)" >上移</button></td>
          <td><button @click="downQuestion(index)">下移</button></td>
          <td><button @click="deleteQuestion(index)" >删除</button></td>
        </tr>
      </table>
    </div>
<!--    <div v-for="item in this.das" :item="item" :index="index" :key="item.questionId">-->
<!--      {{item.questionId}} ++-->
<!--      <div class="content">-->
<!--      {{item.content}}-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'auto_generate',
  data () {
    return {
      mode: '0',
      rule: {
        paper: '',
        formId: '',
        totalMark: 0,
        singleNum: 2,
        singleScore: 3,
        multiNum: 2,
        multiScore: 4,
        completeNum: 0,
        completeScore: 0,
        subjectiveNum: 2,
        subjectiveScore: 10,
        difficulty: 4.0,
        pointIds: ''
      },
      das: []
    }
  },
  methods: {
    getSmartPaper () {
      // pointIds = 1#2#3#4#5#6#7#8#9#
      this.rule.pointIds = '1#2#3#4#5#6#7#8#9#'
      let total = 0
      total += this.rule.singleNum * this.rule.singleScore
      total += this.rule.multiNum * this.rule.multiScore
      total += this.rule.completeNum * this.rule.completeScore
      total += this.rule.subjectiveNum * this.rule.subjectiveScore
      this.rule.totalMark = total
      console.log(total)

      axios.post('http://localhost:8080/paper/getSmartPaperList', this.rule).then(response => (
        this.das = response.data.data.questionList
      ))
      this.sortQuestion()
      console.log('result')
    },
    // resort question after got question
    sortQuestion () {
      for (var i = 1; i < this.das.length;) {
        if (this.das[i].type < this.das[i - 1].type) {
          this.upQuestion(i)
        } else {
          i += 1
        }
      }
    },
    upQuestion (index) {
      if (index === 0) {
        alert('can not up')
        return
      }
      let temp = this.das[index - 1]
      console.log(temp)
      this.$set(this.das, index - 1, this.das[index])
      this.$set(this.das, index, temp)
      // this.das[index] = this.das[index - 1]
      // this.das[index - 1] = temp
    },
    downQuestion (index, e) {
      if (index === this.das.length - 1) {
        alert('can not down')
        return
      }
      const temp = this.das[index + 1]
      this.$set(this.das, index + 1, this.das[index])
      this.$set(this.das, index, temp)
      // this.das[index] = this.das[index + 1]
      // this.das[index + 1] = temp
    },
    deleteQuestion (index, e) {
      this.das.splice(index, 1)
    },
    jump2Preview () {
      if (this.das.length <= 0) {
        alert('no data')
        return
      }

      // for (let i = 0; i < this.das.length; i++) {
      //   axios.get('http://localhost:8080/question/' + 'getDetail' + '?questionId=' + this.das[i].questionId).then(response => (
      //     this.das[i].details = response.data.data
      //   ))
      // }

      this.$router.push({
        path: '/paper2word',
        query: {
          paperData: this.das
        }
      })
    }

  }
}
</script>

<style scoped>
.input-box{
  background: #d5d5d5;
  float: left;
  width: 50%;
  border-radius: 5px;
}
.input-text input-content{
  width: 25%;
  float: left;
  display: inline;
  height: complex;
}

.content{
  width: 40px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

</style>
