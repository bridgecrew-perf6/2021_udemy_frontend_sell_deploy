<template>
  <div class="shopcart" :class="{ highlight: totalCount > 0 }">
    <div class="shopcart-wrapper">
      <div class="content-left">
        <div
          class="logo-wrapper"
          :class="{ highlight: totalCount > 0 }"
          @click="toggleList"
        >
          <span
            class="icon-shopping_cart logo"
            :class="{ highlight: totalCount > 0 }"
          ></span>
          <i class="num" v-show="totalCount">{{ totalCount }}</i>
        </div>

        <div class="desc-wrapper">
          <p class="total-price" v-show="totalPrice">${{ totalPrice }}</p>
          <p class="tip" :class="{ highlight: totalCount > 0 }">
            另需{{ poiInfo.shipping_fee_tip }}
          </p>
        </div>
      </div>

      <div class="content-right" :class="{ highlight: totalCount > 0 }">
        {{ payStr }}
      </div>

      <div class="shopcart-list" v-show="listShow" :class="{ show: listShow }">
        <div class="list-top" v-if="poiInfo.discounts2">
          {{ poiInfo.discounts2[0].info }}
        </div>

        <div class="list-header">
          <h3 class="title">1號口袋</h3>

          <div class="empty" @click="emptyFn">
            <img src="./ash_bin.png" />
            <span>清空購物車</span>
          </div>
        </div>

        <div class="list-content" ref="listContent">
          <ul>
            <li
              class="food-item"
              v-for="(food, index) in selectFoods"
              :key="index"
            >
              <div class="desc-wrapper">
                <div class="desc-left">
                  <p class="name">{{ food.name }}</p>

                  <p class="unit" v-show="!food.description">
                    {{ food.unit }}
                  </p>

                  <p class="description" v-show="food.description">
                    {{ food.description }}
                  </p>
                </div>

                <div class="desc-right">
                  <span class="price">${{ food.min_price }}</span>
                </div>
              </div>

              <div class="cartcontrol-wrapper">
                <Cartcontrol :food="food" />
              </div>
            </li>
          </ul>
        </div>
        <div class="list-bottom"></div>
      </div>
    </div>

    <div class="shopcart-mask" v-show="listShow" @click="hideMask"></div>
  </div>
</template>

<script>
// 導入 BScroll
import BScroll from 'better-scroll';
// 導入 CartControl
import Cartcontrol from 'components/Cartcontrol/Cartcontrol';

export default {
  data() {
    return {
      fold: true
    };
  },
  props: {
    // min_price_tip: {
    //   type: String,
    //   default: ''
    // },
    // shipping_fee_tip: {
    //   type: String,
    //   default: ''
    // },
    poiInfo: {
      type: Object,
      default: {}
    },
    selectFoods: {
      type: Array,
      default() {
        return [
          // {
          //   min_price: 10,
          //   count: 3
          // },
          // {
          //   min_price: 7,
          //   count: 1
          // }
        ];
      }
    }
  },
  computed: {
    // 總個數
    totalCount() {
      let num = 0;
      this.selectFoods.forEach(food => {
        num += food.count;
      });
      return num;
    },
    // 總金額
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach(food => {
        total += food.min_price * food.count;
      });
      return total;
    },
    // 結算按鈕顯示
    payStr() {
      if (this.totalCount > 0) {
        return '去結算';
      } else {
        return this.poiInfo.min_price_tip;
      }
    },
    listShow() {
      if (!this.totalCount) {
        this.fold = true;

        return false;
      }

      let show = !this.fold;

      // BScoll 相關
      if (show) {
        this.$nextTick(() => {
          if (!this.shopScroll) {
            this.shopScroll = new BScroll(this.$refs.listContent, {
              click: true
            });
          } else {
            this.shopScroll.refresh();
          }
        });
      }

      return show;
    }
  },
  methods: {
    toggleList() {
      if (!this.totalCount) {
        return;
      }

      this.fold = !this.fold;
    },
    emptyFn() {
      this.selectFoods.forEach(food => {
        food.count = 0;
      });
    },
    hideMask() {
      this.fold = true;
    }
  },
  components: {
    Cartcontrol,
    BScroll
  }
};
</script>

<style>
.shopcart-wrapper {
  width: 100%;
  height: 51px;
  background-color: #514f4f;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  z-index: 99;
}

.shopcart-wrapper.highlight {
  background-color: #2d2b2a;
}

.shopcart-wrapper .content-left {
  flex: 1;
}

.shopcart-wrapper .content-left .logo-wrapper {
  width: 50px;
  height: 50px;
  background-color: #666;
  border-radius: 50%;
  position: relative;
  top: -14px;
  left: 10px;
  text-align: center;
  float: left;
}

.shopcart-wrapper .content-left .logo-wrapper.highlight {
  background-color: #ffd161;
}

.shopcart-wrapper .content-left .logo-wrapper .logo {
  font-size: 28px;
  color: #c4c4c4;
  line-height: 50px;
}

.shopcart-wrapper .content-left .logo-wrapper .logo.highlight {
  color: #2d2b2a;
}

.shopcart-wrapper .content-left .logo-wrapper .num {
  width: 15px;
  height: 15px;
  line-height: 15px;
  border-radius: 50%;
  font-size: 9px;
  color: white;
  background-color: red;
  position: absolute;
  right: 0;
  top: 0;
}

.shopcart-wrapper .content-left .desc-wrapper {
  float: left;
  margin-left: 13px;
}

.shopcart-wrapper .content-left .desc-wrapper .total-price {
  font-size: 18px;
  line-height: 33px;
  color: white;
}

.shopcart-wrapper .content-left .desc-wrapper .tip {
  font-size: 12px;
  color: #bab9b9;
  line-height: 51px;
}

.shopcart-wrapper .content-left .desc-wrapper .tip.highlight {
  line-height: 12px;
}

.shopcart-wrapper .content-right {
  flex: 0 0 110px;
  font-size: 15px;
  color: #bab9b9;
  line-height: 51px;
  text-align: center;
}

.shopcart-wrapper .content-right.highlight {
  background-color: #ffd161;
  color: #2d2b2a;
}

.shopcart-wrapper .shopcart-list {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  width: 100%;
}

.shopcart-wrapper .shopcart-list.show {
  transform: translateY(-100%);
}

.shopcart-wrapper .shopcart-list .list-top {
  height: 30px;
  text-align: center;
  font-size: 11px;
  background-color: #f3e6c6;
  line-height: 30px;
  color: #646158;
}

.shopcart-wrapper .shopcart-list .list-header {
  height: 30px;
  background-color: #f4f4f4;
}

.shopcart-wrapper .shopcart-list .list-header .title {
  float: left;
  border-left: 4px solid #53c123;
  padding-left: 6px;
  line-height: 30px;
  font-size: 12px;
}

.shopcart-wrapper .shopcart-list .list-header .empty {
  float: right;
  line-height: 30px;
  margin-right: 10px;
  font-size: 0;
}

.shopcart-wrapper .shopcart-list .list-header .empty img {
  height: 14px;
  margin-right: 9px;
  vertical-align: middle;
}

.shopcart-wrapper .shopcart-list .list-header .empty span {
  font-size: 12px;
  vertical-align: middle;
}

.shopcart-wrapper .shopcart-list .list-content {
  max-height: 360px;
  overflow: hidden;
  background-color: white;
}

.shopcart-wrapper .shopcart-list .list-content .food-item {
  height: 38px;
  padding: 12px 12px 10px 12px;
  border-bottom: 1px solid #f4f4f4;
}

.shopcart-wrapper .shopcart-list .list-content .food-item .desc-wrapper {
  float: left;
  width: 240px;
}

.shopcart-wrapper
  .shopcart-list
  .list-content
  .food-item
  .desc-wrapper
  .desc-left {
  float: left;
  width: 170px;
}

.shopcart-wrapper
  .shopcart-list
  .list-content
  .food-item
  .desc-wrapper
  .desc-left
  .name {
  font-size: 16px;
  margin-bottom: 8px;

  /* 超出部分隱藏 */
  -webkit-line-clamp: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 16px;
}

.shopcart-wrapper
  .shopcart-list
  .list-content
  .food-item
  .desc-wrapper
  .desc-left
  .unit {
  font-size: 12px;
  color: #b4b4b4;
}

.shopcart-wrapper
  .shopcart-list
  .list-content
  .food-item
  .desc-wrapper
  .desc-left
  .description {
  font-size: 12px;
  color: #b4b4b4;

  /* 超出部分隱藏 */
  overflow: hidden;
  height: 12px;
}

.shopcart-wrapper
  .shopcart-list
  .list-content
  .food-item
  .desc-wrapper
  .desc-right {
  float: right;
  width: 70px;
  text-align: right;
}

.shopcart-wrapper
  .shopcart-list
  .list-content
  .food-item
  .desc-wrapper
  .desc-right
  .price {
  font-size: 12px;
  line-height: 38px;
}

.shopcart-wrapper .shopcart-list .list-content .food-item .cartcontrol-wrapper {
  float: right;
  margin-top: 6px;
}

.shopcart .shopcart-mask {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 98px;
  background: rgba(7, 17, 27, 0.6);
}
</style>
