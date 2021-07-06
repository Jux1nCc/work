<template>
  <div class="comment_list">
    <div>
      <dl v-for="(item, index) in list" :key="index">
        <dt>
          <img :src="item.user.avatarUrl" alt="" />
        </dt>
        <dd class="name">{{ item.user.nickname }}</dd>
        <dd class="detail">
          {{ item.content }}
        </dd>
      </dl>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: []
    }
  }
}
</script>
<style></style>
