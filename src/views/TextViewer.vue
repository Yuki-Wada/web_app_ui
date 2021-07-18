<template>
  <div class="home">
    <input @change="selectedFile" type="file" name="file">
    <button @click="upload" type="submit">アップロード</button>
    <VueGoodTable
      :columns="columns"
      :rows="rows"/>
  </div>
</template>

<script>
import constant from '@/constant';

import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
import axios from 'axios';

export default {
  name: 'home',
  mixins: [constant],
  components: {
    VueGoodTable
  },
  data(){
    return {
      columns: [
        {
          label: 'Name',
          field: 'name',
        },
        {
          label: 'Age',
          field: 'age',
          type: 'number',
        },
        {
          label: 'Created On',
          field: 'createdAt',
          type: 'date',
          dateInputFormat: 'yyyy-MM-dd',
          dateOutputFormat: 'MMM Do yy',
        },
        {
          label: 'Percent',
          field: 'score',
          type: 'percentage',
        },
      ],
      rows: [
        { id:1, name:"John", age: 20, createdAt: '',score: 0.03343 },
        { id:2, name:"Jane", age: 24, createdAt: '2011-10-31', score: 0.03343 },
        { id:3, name:"Susan", age: 16, createdAt: '2011-10-30', score: 0.03343 },
        { id:4, name:"Chris", age: 55, createdAt: '2011-10-11', score: 0.03343 },
        { id:5, name:"Dan", age: 40, createdAt: '2011-10-21', score: 0.03343 },
        { id:6, name:"John", age: 20, createdAt: '2011-10-31', score: 0.03343 },
      ],
    }
  },
  mounted: function() {
  },
  methods: {
    selectedFile: function(e) {
      // 選択された File の情報を保存しておく
      e.preventDefault();
      let files = e.target.files;
      this.uploadFile = files[0];
    },
    upload: function() {
      // FormData を利用して File を POST する
      let formData = new FormData();
      formData.append('yourFileKey', this.uploadFile);
      let config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      axios
        .post(this.host + '/text_viewer/upload', formData, config)
        .then(function() {
          console.log(111)
        // response 処理
        })
        .catch(function() {
          console.log(1112)
        // error 処理
      })
    }
  }
}
</script>
