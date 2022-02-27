<template>
  <div class="hello">

    <div class="menu">
      <div class="head" style="background: #ffffff">试题录入</div>
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
      <div class="Rate">
      <rate :length="5" v-model="questionModel.difficulty"/>
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
      <button @click="saveQuestion">录入试题</button>

      <div v-if="questionModel.type == 1 || questionModel.type == 2" style="background: #1863d2">
        <div class="title">
          <h3>选项设置</h3>
          <div class="numButton">
            <button @click="addOption">新增选项</button>
            <button @click="delOption">删除选项</button>
          </div>
        </div>
        <div v-for="(item, index) in this.form.options" :key="index">
          <span>选项{{index+1}}:</span>
          <input v-model="form.options[index]">
        </div>
      </div>
      <div v-else>
        <span>试题详情</span>
        <input v-model="form.detail">
      </div>

      <br/>
      试题类型 :: {{ questionModel.type }}

      科目 :: {{ questionModel.subject }}

      章节 :: {{ questionModel.chapter }}

      是否公开 :: {{ value1 }}

      试题内容 :: {{questionModel.questionContent}}

      <br/>

    </div>
  </div>
</template>

<script>
import InputSelect from './InputSelect'

import axios from 'axios'
export default {
  name: 'save',
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
        master: '1',
        content: '',
        difficulty: ''
      },
      m_subject: 'getSubject',
      m_questionType: 'getQuestionType',
      m_chapter: 'getChapter',
      m_question: 'getQuestion',
      s_question: 'saveQuestion',
      value1: true,
      // 保存选择题选项的数组
      form: {
        detail: '',
        options: ['选项1']
      }

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
    saveQuestion () {
      var model = this.questionModel
      if (model.type === undefined || model.type === '') {
        alert('未选择试题类型')
        return
      } else if (model.subject === undefined || model.subject === '') {
        alert('未选择科目')
        return
      } else if (model.chapter === undefined || model.chapter === '') {
        alert('未选择章节')
        return
      } else if (model.content === undefined || model.content === '') {
        alert('未输入试题')
        return
      } else if (model.difficulty === undefined || model.difficulty === '') {
        alert('未选择试题难度')
        return
      }
      // 选择题
      if (model.type === '1' || model.type === '2') {
        for (var i = 0; i < this.form.options.length; i++) {
          if (this.form.options[i] === null || this.form.options[i] === '') {
            alert('试题选项未填写')
            return
          }
        }
        this.questionModel.content = this.questionModel.content + '$' + JSON.stringify(this.form.options)
      } else { // 其他
        if (this.form.detail === null || this.form.detail === '') {
          alert('试题具体内容未填写')
          return
        }
        this.questionModel.content = this.questionModel.content + '$' + this.form.detail
      }
      console.log('model is')

      console.log(this.questionModel)
      console.log(this.form)
      axios({
        method: 'post',
        url: this.urlHeader + this.s_question,
        data: this.questionModel
      }
      ).then(response => (
        this.questionList = response.data.data
      ))
    },
    // question detail
    addOption () {
      if (this.form.options.length <= 4) {
        this.form.options.push('')
      } else {
        alert('options count exceed!')
      }
    },
    delOption () {
      if (this.form.options.length > 1) {
        // 寻找最后一个输入框
        this.form.options.pop()
      } else {
        alert('can not delete')
      }
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
