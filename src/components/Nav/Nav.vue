<template>
  <div class="nav">
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <router-link to="/goods" class="nav-item"
      >點菜 <i class="line"></i
    ></router-link>
    <router-link to="/ratings" class="nav-item"
      >評價({{ commentNum }})<i class="line"></i
    ></router-link>
    <router-link to="/seller" class="nav-item"
      >商家<i class="line"></i
    ></router-link>
  </div>
</template>

<script>
export default {
  props: {
    commentNum: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style>
.nav {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #e4e4e4;
}

.nav .nav-item {
  flex: 1;
  text-align: center;
  font-size: 13px;
  text-decoration: none;
  color: #666;
  position: relative;
}

/* 選中後的樣式 */
.nav .active {
  color: #ffbb22;
}

.nav .active .line {
  width: 20px;
  height: 2px;
  background-color: #ffbb22;
  display: inline-block;
  position: absolute;
  left: 50%;
  bottom: 0;
  margin-left: -10px;
}
</style>
