<template>
  <div class="allSelect">
    <div v-if="form.type == 1">
      <div v-for="(item, key, index) in form.select_options" :key="index" class="item">
        <el-radio
          class="radioIcon"
          v-model="form.single_select_answer"
          :label="item.label"
          @change="select"
        >{{item.label}}</el-radio>
        <el-input class="radioInput" v-model="item.text"></el-input>
        <div>
          <upload v-model="item.image"></upload>
        </div>
      </div>
    </div>
    <div v-if="form.type == 2">
      <div v-for="(item, key, index) in form.select_options" :key="index" class="item">
        <el-checkbox
          class="checkboxIcon"
          v-model="form.multiple_select_answer"
          :label="item.label"
          @change="select"
        >{{item.label}}</el-checkbox>
        <el-input class="checkboxInput" v-model="item.text"></el-input>
        <div>
          <upload v-model="item.image"></upload>
        </div>
      </div>
    </div>
    <div v-if="form.type == 3" style="padding-top:70px">
      <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="form.short_answer" @change="select"></el-input>
    </div>
  </div>
</template>

<script>
import upload from "./upload.vue";
export default {
  components: {
    upload
  },
  props: ["form"],
  methods: {
    select(){
      this.$emit('change')
    }
  }
};
</script>

<style lang='less'>
.allSelect {
  .item {
    display: flex;
    justify-content: space-between;
    .radioIcon {
      padding-top: 83px;
    }
    .radioInput {
      padding-top: 70px;
      padding-right: 20px;
    }
    .checkboxIcon {
      padding-top: 70px;
    }
    .checkboxInput {
      padding: 70px 20px 0 30px;
    }
  }
}
</style>