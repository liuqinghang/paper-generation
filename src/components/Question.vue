<template>
  <div class="hello">

      <div class="menu">
        <div class="head" style="background: #ffffff">Item 1</div>
        <div class="input-box" style="background: #ffffff">
          <div class="input-text" style="background: #ffffff">
            科目:
          </div>
          <div class="input-content" style="background: #ffffff">
            <input-select ref="subject" :info="subjectList" :method="m_subject"
                          v-on:getSubject="getSubject"></input-select>
          </div>
        </div>

        <div class="input-box" style="background: #4070a3">
          <div class="input-text" style="background: #1863d2">
            章节:
          </div>
          <div class="input-content" style="background: #8c939d">
            <input-select ref="chapter" :method="m_chapter" :info="chapterList"
                          v-on:getChapter="getChapter"></input-select>
          </div>
        </div>

        <div class="input-box" style="background: #41744e">
          <div class="input-text" style="background: #1863d2">
            试题类型:
          </div>
          <div class="input-content">
            <input-select ref="type" :info="typeList" :method="m_questionType"
                          v-on:getQuestionType="getQuestionType">
            </input-select>
          </div>
        </div>

        <div class="input-box" style=" background: #223242">
          <div class="input-text" style="background: #ffffff">
            是否公开:
          </div>
          <div class="input-content">
            <input type="checkbox" v-model="value1" style="">
          </div>
        </div>
        <div class="input-box" style="background: #ffffff">
          <div class="input-text" style="background: #ffffff">
            题目内容
          </div>
          <div class="input-content">
            <input v-model="questionModel.content" placeholder="请输入试题">
          </div>
        </div>
        <br/>
        <button @click="commitForm">提交信息</button>
        <div class="content">

        </div>

        <br/>
        试题类型 :: {{ questionModel.type }}

        科目 :: {{ questionModel.subject }}

        章节 :: {{ questionModel.chapter }}

        是否公开 :: {{ value1 }}

        试题内容 :: {{questionModel.questionContent}}

        <br/>
        <ul id="questionShow">
          <li v-for="item in questionList" :key="item.questionId">
           {{item}}
          </li>
        </ul>
  </div>
  </div>
</template>

<script>
import InputSelect from './Question/InputSelect'
import axios from 'axios'
export default {
  name: 'QuestionSelect',
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
  padding-top: 5px;
  float: left;
}

.input-text {
  text-align:center;
  padding-left: 5px;
  width: 30%;
  float: left;
}

.input-content{
  width: 70%;
  float: left;
}

.content {
  width: 100%;
  padding: 5px;
}
</style>
