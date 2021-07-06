<template>
  <div class="allSelect">
    <div v-if="form.type==1">
      <!-- 这里都是单选的 -->
      <div v-for="(item, index) in form.select_options" :key="index" class="item">
        <!-- radio  label才是它的值 -->
        <el-radio
          v-model="form.single_select_answer"
          :label="item.label"
          @change="selectChange"
        >{{item.label}}</el-radio>
        <el-input v-model="item.text"></el-input>
        <div>
          <!-- 该组件要的就是这么一个值 -->
          <uploadFile v-model="item.image"></uploadFile>
        </div>
      </div>
    </div>
    <div v-else-if="form.type==2">
      <!-- 这里都是多选的 -->
      <div v-for="(item, index) in form.select_options" :key="index" class="item">
        <!-- el-checkbox  label才是它的值 -->
        <el-checkbox
          v-model="form.multiple_select_answer"
          :label="item.label"
          @change="selectChange"
        >{{item.label}}</el-checkbox>
        <el-input v-model="item.text"></el-input>
        <div>
          <!-- 该组件要的就是这么一个值 -->
          <uploadFile v-model="item.image"></uploadFile>
        </div>
      </div>
    </div>
    <div v-else>
      <!-- el-input   type="textarea"  类似我们原生的textarea     rows多少行 -->
      <el-input type="textarea" rows="10" v-model="form.short_answer" @change="selectChange"></el-input>
    </div>
  </div>
</template>

<script>
import uploadFile from "./uploadFile.vue";
export default {
  props: ["form"],
  components: {
    uploadFile
  },
  methods: {
    selectChange() {
      //为了触发父组件的emit的change事件
      this.$emit("change");
    }
  }
};
</script>

<style lang="less">
.allSelect {
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>