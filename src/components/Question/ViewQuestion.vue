<template>
  <div class="hello">

    <div class="menu">
      <div class="head" style="background: #ffffff">试题查询</div>
      <div class="input-box" style="background: #ffffff">
        <div class="input-text" style="background: #ffffff">
          科目:
        </div>
        <div class="input-content" style="background: #ffffff">
          <input-select ref="subject" :info="subjectList" :method="m_subject"
                        v-on:getSubject="getSubject"></input-select>
        </div>
      </div>

      <div class="input-box" style="background: #ffffff">
        <div class="input-text" style="background: #ffffff">
          章节:
        </div>
        <div class="input-content" style="background: #ffffff">
          <input-select ref="chapter" :info="chapterList" :method="m_chapter"
                        v-on:getChapter="getChapter"></input-select>
        </div>
      </div>

      <div class="input-box" style="background: #ffffff">
        <div class="input-text" style="background: #ffffff">
          试题类型:
        </div>
        <div class="input-content">
          <input-select ref="type" :info="typeList" :method="m_questionType"
                        v-on:getQuestionType="getQuestionType">
          </input-select>
        </div>
      </div>

      <div class="input-box" style=" background: #ffffff">
        <div class="input-text" style="background: #ffffff">
          是否公开:
        </div>
        <div class="input-content">
          <input type="checkbox" v-model="value1" style="float: left">
        </div>
      </div>
      <div class="input-box" style="background: #ffffff">
        <div class="input-text" style="background: #ffffff">
          题目内容
        </div>
        <div class="input-content" >
          <input v-model="questionModel.content" placeholder="请输入试题" name="question-content">
        </div>
      </div>

      <br/>
      <button @click="commitForm">提交信息</button>

        <table v-for="(item,index) in this.questionList" :item="item" :key="index">
          <tr>
            <td class="content">{{index}}</td>
            <td class="content">{{item.questionId}}</td>
            <td class="content">{{item.typeName}}</td>
            <td class="content">{{item.content}}</td>
<!--            <td><button @click="upQuestion(index,$event)" >上移</button></td>-->
<!--            <td><button @click="downQuestion(index,$event)">下移</button></td>-->
<!--            <td><button @click="deleteQuestion(index,$event)" >删除</button></td>-->
          </tr>
        </table>

<!--      <br/>-->
<!--      试题类型 :: {{ questionModel.type }}-->

<!--      科目 :: {{ questionModel.subject }}-->

<!--      章节 :: {{ questionModel.chapter }}-->

<!--      是否公开 :: {{ value1 }}-->

<!--      试题内容 :: {{questionModel.questionContent}}-->
    </div>
  </div>
</template>

<script>
import InputSelect from './InputSelect'
import axios from 'axios'
export default {
  name: 'view',
  components: {
    'input-select': InputSelect
  },
  data () {
    return {
      urlHeader: 'http://localhost:8080/question/',
      subjectList: [],
      chapterList: [],
      typeList: [],
      questionList: [],
      questionModel: {
        subject: '',
        chapter: '',
        type: '',
        master: '',
        content: '',
        difficulty: ''
      },
      m_subject: 'getSubject',
      m_questionType: 'getQuestionType',
      m_chapter: 'getChapter',
      m_question: 'getQuestion',
      value1: true
    }
  },
  methods: {
    getChapterList () {
      axios.get(this.urlHeader + this.m_chapter, {
        params: {
          subjectId: this.questionModel.subject
        }
      }).then(response => (
        this.chapterList = response.data.data

      ))
      this.questionModel.chapter = ''
      this.$refs.chapter.resetChoosed()
      this.$refs.chapter.updateInfo(this.chapterList)
    },
    getQuestionType (res) {
      this.questionModel.type = res
    },
    getSubject (res) {
      // update chapter list after get subject
      this.questionModel.subject = res
      this.getChapterList()
    },
    getChapter (res) {
      this.questionModel.chapter = res
    },
    // commit question content
    commitForm () {
      console.log('model is')
      console.log(this.questionModel)
      axios({
        method: 'post',
        url: this.urlHeader + this.m_question,
        data: this.questionModel
      }
      ).then(response => (
        this.questionList = response.data.data
      ))
    }
  },
  mounted () {
    axios.get(this.urlHeader + this.m_subject).then(response => (
      this.subjectList = response.data.data
    ))
    axios.get(this.urlHeader + this.m_questionType).then(response => (
      this.typeList = response.data.data
    ))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #ffffff;
  }

  .menu {
    padding: 2px;

  }

  .head {
    height: 40px;
    top: 0px;
    left: 0px;
    width: 100%;
  }

  .input-box {
    width: 32%;
    padding-top: 20px;
    padding: 5px;
    border-radius: 2px;
    float: left;
  }

  .input-text {
    text-align:center;
    width: 30%;
    float: left;
  }

  .input-content{
    width: 70%;
    float: left;
  }

  .content{
    width: 40px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>
