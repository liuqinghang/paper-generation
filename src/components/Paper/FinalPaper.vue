<template>
  <div>
    <h1>sss</h1>
    <button @click="save2Word">生成数据</button>
    <preview :wordFile="this.blobFile" v-if="isPreview"></preview>
  </div>
</template>

<script>
import Docxtemplater from 'docxtemplater'
import JSZipUtils from 'jszip-utils'
import PizZip from 'pizzip'
import WordPreview from './WordPreview'
// import axios from 'axios'

export default {
  name: 'word_generate',
  components: {
    'preview': WordPreview
  },
  props: {

  },
  data () {
    return {
      paperData: '',
      idString: '',
      detailList: [],
      isPreview: false,
      blobFile: '',
      singleList: [],
      multiList: [],
      shortQuestionList: [],
      questionList: [],
      subjectList: [
        {
          'selectLabel': '数据库概述',
          'selectKey': '1',
          'selectValue': '1'
        },
        {
          'selectLabel': '数据模型',
          'selectKey': '2',
          'selectValue': '2'
        },
        {
          'selectLabel': '关系数据库',
          'selectKey': '3',
          'selectValue': '3'
        },
        {
          'selectLabel': 'SQL语言基础',
          'selectKey': '4',
          'selectValue': '4'
        },
        {
          'selectLabel': 'SQL数据操作',
          'selectKey': '5',
          'selectValue': '5'
        },
        {
          'selectLabel': '索引和视图',
          'selectKey': '6',
          'selectValue': '6'
        },
        {
          'selectLabel': '触发器和存储过程',
          'selectKey': '7',
          'selectValue': '7'
        }
      ],
      urlHeader: 'http://localhost:8080/question/'
    }
  },
  mounted () {
    this.paperData = this.$route.query.paperData
    // this.idString = this.$route.query.idString
    // axios.get(this.urlHeader + 'getDetail' + '?questionId=' + this.idString).then(response => (
    //   this.detailList = response.data.data
    // ))
    // console.log('idString')
    // console.log(this.idString)
  },
  methods: {
    handlePaperData () {
      debugger
      console.log(this.detailList)
      console.log(this.idString)

      let i = 0
      while (i < this.paperData.length) {
        let item = this.paperData[i]
        // let details = []

        // while (j < this.detailList.length && this.detailList[j].questionId === item.questionId) {
        //   details.push(this.detailList[j])
        //   j++
        // }
        // item.details = details
        if (item.type === 1) {
          this.singleList.push(item)
        } else if (item.type === 2) {
          this.multiList.push(item)
        } else if (item.type === 3) {
          // this.multiList.push(item)
        } else if (item.type === 4) {
          this.shortQuestionList.push(item)
        } else if (item.type === 5) {
          this.questionList.push(item)
        }
        i++
      }
    },

    // 为模板中变量赋值
    setProp (doc) {
      this.handlePaperData()
      console.log('singleList ')
      console.log(this.singleList)
      console.log(this.multiList)
      console.log(this.shortQuestionList)
      console.log(this.questionList)
      doc.setData({
        subjectList: this.subjectList,
        singleList: this.singleList,
        multiList: this.multiList,
        shortQuestionList: this.shortQuestionList,
        questionList: this.questionList
      })
      return doc
    },

    loadFile (url, callback) {
      // 获取流文件
      JSZipUtils.getBinaryContent(url, callback)
    },
    save2Word () {
      const that = this
      // server
      // let host = 'http://localhost:8080/paperdemos/'
      // client
      let host = 'static/templates/'
      let templateName = 'PaperTemplate.docx'
      this.loadFile(host + templateName, function (error, content) {
        if (error != null) {
          throw error // 抛出异常
        }
        let zip = new PizZip(content)
        let doc = new Docxtemplater().loadZip(zip)

        // 设置模板变量的值
        // doc.setData({
        //   subjectList: that.subjectList
        // })
        doc = that.setProp(doc)

        try {
          // console.log('已用模板变量的值替换所有模板变量')
          // 用模板变量的值替换所有模板变量
          doc.render()
        } catch (error) {
          let e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties
          }
          console.log(JSON.stringify({error: e}))
          throw error
          // 捕获并抛出异常
        }
        let out = doc.getZip().generate({
          type: 'blob',
          mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        })
        // 将目标文件对象保存为目标类型的文件，并命名
        // 生成文件后进行渲染
        that.isPreview = true
        that.blobFile = out

        // 下载文件
        // saveAs(out, 'result.docx')
      })
    }

  }

}
</script>

<style scoped>

</style>
