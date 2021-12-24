<template>
  <div id="app">
    <Myheader :poiInfo="poiInfo" />

    <Mynav :commentNum="commentNum" />

    <!-- <div class="content">content</div> -->
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Myheader from 'components/Header/Header';
import Mynav from 'components/Nav/Nav.vue';

export default {
  name: 'App',
  components: {
    Myheader,
    Mynav
  },
  data() {
    return {
      // header 組件需要的訊息(商家訊息)
      poiInfo: {},
      commentNum: 0
    };
  },
  created() {
    // 發起異步請求，獲取數據

    // 通過 axios 發起 get 請求
    this.$http
      // .get('/api/goods')
      .get('/static/01-商品页(点菜).json')
      .then(result => {
        let dataSource = result.data;
        if (dataSource.code === 0) {
          this.poiInfo = dataSource.data.poi_info;
        }
      })
      .catch(err => {
        console.log(err);
      });

    // 通過 axios 發起 get 請求
    this.$http
      // .get('/api/ratings')
      .get('/static/02-商品页(评价).json')
      .then(result => {
        let dataSource = result.data;
        if (dataSource.code === 0) {
          this.commentNum = dataSource.data.comment_num;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style></style>
