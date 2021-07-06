<template>
  <div>
    <router-link
      :to="{ path: '/pagea', query: { id: '我是id', xxx: '我是xxx' } }"
      >跳转至pageA页面</router-link
    >
    <!-- <button @click="topageA">跳转至pageA页面</button> -->
    <router-link to="/pageb">跳转至pageB页面</router-link>
    <router-view></router-view>
    <!-- 路由传值
    传：this.$router.push("path?参数名=参数值&参数名2=参数值2")
       this.$router.push({
         path:"路径",
         query:{
           参数名:参数值
         }
       })
    收：（当前需要接收参数的页面）
       this.$route.query.参数名    
     -->
  </div>
</template>
<script>
export default {
  methods: {
    topageA () {
      // this.$router.push('/pagea?id=' + 123 + '&xxx=' + 456)
      this.$router.push({
        path: '/pagea',
        query: {
          id: 123,
          xxx: 456
        }
      })
    }
  }
}
</script>
<style></style>
