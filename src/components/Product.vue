<template>
  <div>
    <v-container>
      <div class="row">
        <div class="col-md-5 col-sm-5 col-xs-12">
          <v-carousel>
            <v-carousel-item
              :src="product.image"
            >
            </v-carousel-item>
            <v-carousel-item
              :src="product.image"
            >
            </v-carousel-item>
            <v-carousel-item
              :src="product.image"
            >
            </v-carousel-item>
          </v-carousel>
        </div>
        <div class="col-md-7 col-sm-7 col-xs-12">
          <v-breadcrumbs class="pb-0" :itemds="breadcrums"></v-breadcrumbs>
          <div class="pl-6">
            <p class="display-1 mb-0">{{product.name}}</p>
            <v-card-actions class="pa-0">
              <p class="headline font-weight-light pt-3" style="color : red">{{product.price}} VNĐ<del style="" class="subtitle-1 font-weight-thin"> {{product.price + product.price*0.1}} VNĐ</del></p>
              <v-spacer></v-spacer>
              <v-rating v-model="rating" class="" background-color="warning lighten-3"
                        color="warning" dense></v-rating>
              <span class="body-2	font-weight-thin"> 25 Đánh giá</span>
            </v-card-actions>
            <p class="subtitle-1 font-weight-thin">{{product.description}}</p>
            <p class="title">Số lượng</p>
              
            <v-text-field
                outlined
                style="width:100px"
                :value="1"
                :max="product.amount"
                dense
                v-model="quantity"
                type="number"
            ></v-text-field>
            <h5>Chọn kích cỡ</h5>
            <v-select style="width : 200px" hide-details  v-model="size" :items="namesize1" v-if="product.producttype === 'Giầy'">
              <option :item="namesize1" :key="i">{{i}}</option>
            </v-select>
            <v-select style="width : 200px" hide-details  v-model="size" :items="namesize" v-else>
              <option :item="namesize" :key="i">{{i}}</option>
            </v-select>
            <p v-if="product.amount == 0">Hết hàng !</p>
            <p v-else>Kho : {{product.amount}}</p>
            <v-btn v-if="product.amount !== 0" class="primary white--text" outlined tile dense @click="addToCart"><v-icon>mdi-cart</v-icon> Thêm vào gió hàng</v-btn>
            <v-btn class="ml-4" outlined tile>Thêm vào yêu thích</v-btn>
          </div> 
      </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-xs-12 col-md-12">
          <v-tabs>
            <v-tab >Mô tả</v-tab>
            <v-tab >Nguyên liệu</v-tab>
            <v-tab>Đánh giá</v-tab>
            <v-tab-item>
              <p class="pt-10 subtitle-1 font-weight-thin">{{product.description}}</p>
            </v-tab-item>
            <v-tab-item>
              <p class="pt-10 subtitle-1 font-weight-thin">
                
              </p>
            </v-tab-item>
            <v-tab-item>
              <v-list
                three-line="true"
                avatar="true"
              >
                <v-list-item-group v-model="item" color="primary">
                  <v-list-item
                    v-for="(item, i) in product"
                    :key="i"
                    inactive="true"
                  >
                    <v-list-item-avatar>
                      <v-img :src="item.avatar"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title v-html="item.title"></v-list-item-title><v-rating v-model="rating" class="" background-color="warning lighten-3"
                                                                                           color="warning" dense></v-rating>
                      <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-tab-item>
          </v-tabs>
          <v-card-text
            class="pa-0 pt-4"
            tile
            outlined
          >
            <p class="subtitle-1 font-weight-light pt-3 text-center">Có thể bạn thích</p>
            <v-divider></v-divider>
            <div class="row text-center">
              <div class="col-md-2 col-sm-4 col-xs-12 text-center">
                <v-hover
                  v-slot:default="{ hover }"
                  open-delay="200"
                >
                  <v-card
                    :elevation="hover ? 16 : 2" center
                  >
                    <v-img
                      class="white--text align-end"
                      height="200px"
                      :src="require('../assets/img/home/deal1.jpg')"
                    >
                      <v-card-title>Phụ kiện </v-card-title>
                    </v-img>

                    <v-card-text class="text--primary text-center">
                      <div>Giảm 60% </div>
                      <div>Baggit, Zara, Fossil</div>
                    </v-card-text>

                    <div class="text-center">
                      <v-btn
                        class="ma-2"
                        outlined
                        color="info"
                      >
                        Xem
                      </v-btn>
                    </div>
                  </v-card>
                </v-hover>
              </div>
              <div class="col-md-2 col-sm-4 col-xs-12 text-center" >
                <v-hover
                  v-slot:default="{ hover }"
                  open-delay="200"
                >
                  <v-card
                    :elevation="hover ? 16 : 2"
                  >
                    <v-img
                      class="white--text align-end"
                      height="200px"
                      :src="require('../assets/img/home/deal2.jpg')"
                    >
                      <v-card-title>Áo phông </v-card-title>
                    </v-img>

                    <v-card-text class="text--primary text-center">
                      <div>Giảm 50%</div>
                      <div>Zara, Selected, Celio</div>
                    </v-card-text>

                    <div class="text-center">
                      <v-btn
                        class="ma-2"
                        outlined
                        color="info"
                      >
                        Xem
                      </v-btn>
                    </div>
                  </v-card>
                </v-hover>
              </div>
              <div class="col-md-2 col-sm-4 col-xs-12 text-center" >
                <v-hover
                  v-slot:default="{ hover }"
                  open-delay="200"
                >
                  <v-card
                    :elevation="hover ? 16 : 2"
                  >
                    <v-img
                      class="white--text align-end"
                      height="200px"
                      :src="require('../assets/img/home/deal3.jpg')"
                    >
                      <v-card-title>Quần</v-card-title>
                    </v-img>

                    <v-card-text class="text--primary text-center">
                      <div>Giảm 60%++</div>
                      <div>Jack & Jones, Levis</div>
                    </v-card-text>

                    <div class="text-center">
                      <v-btn
                        class="ma-2"
                        outlined
                        color="info"
                      >
                       Xem
                      </v-btn>
                    </div>
                  </v-card>
                </v-hover>
              </div>
              
              <div class="col-md-2 col-sm-4 col-xs-12 text-center" >
                <v-hover
                  v-slot:default="{ hover }"
                  open-delay="200"
                >
                  <v-card
                    :elevation="hover ? 16 : 2"
                  >
                    <v-img
                      class="white--text align-end"
                      height="200px"
                      :src="require('../assets/img/home/deal4.jpg')"
                    >
                      <v-card-title>Giày </v-card-title>
                    </v-img>

                    <v-card-text class="text--primary text-center">
                      <div>Giảm 30%++</div>
                      <div>Nike, Adidas, Puma</div>
                    </v-card-text>

                    <div class="text-center">
                      <v-btn
                        class="ma-2"
                        outlined
                        color="info"
                      >
                       Xem
                      </v-btn>
                    </div>
                  </v-card>
                </v-hover>
              </div>
            
            </div>
          </v-card-text>
        </div>
      </div>
    </v-container>
    <v-card  class="accent" >
      <v-container>
        <v-row no-gutters>
          <v-col class="col-12 col-md-4 col-sm-12">
            <v-row >
              <v-col class="col-12 col-sm-3 pr-4 hidden-sm-only" align="right">
                <v-icon class="display-2">mdi-truck</v-icon>
              </v-col>
              <v-col class="col-12 col-sm-9 pr-4">
                <h3 class="font-weight-light">Miễn phí giao hàng</h3>
                <p class="font-weight-thin">Miễn phí giao hàng cho đơn từ 2.000.000 VND</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="col-12 col-md-4 col-sm-12">
            <v-row >
              <v-col class="col-12 col-sm-3 pr-4" align="right">
                <v-icon class="display-2">mdi-cash-usd</v-icon>
              </v-col>
              <v-col  class="col-12 col-sm-9 pr-4">
                <h3 class="font-weight-light">ĐỔI TRẢ HÀNG</h3>
                <p class="font-weight-thin">30 Ngày đổi trả miễn phí</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="col-12 col-md-4 col-sm-12">
            <v-row>
              <v-col class="col-12 col-sm-3 pr-4" align="right">
                <v-icon class="display-2">mdi-headset</v-icon>
              </v-col>
              <v-col  class="col-12 col-sm-9 pr-4">
                <h3 class="font-weight-light">035-939-6996</h3>
                <p class="font-weight-thin"> Hỗ trợ 24/7</p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>
<script>

import axios from '../service/api'
export default {
  data: () => ({
      size : '',
      namesize:['L','M','XL','XXL','S'],
      namesize1:['38','39','40','41','42','43','44','45'],
      rating:4.5,
      breadcrums: [
          {
              text: 'Home',
              disabled: false,
              href: 'breadcrumbs_home',
          },
          {
              text: 'Clothing',
              disabled: false,
              href: 'breadcrumbs_clothing',
          },
          {
              text: 'T-Shirts',
              disabled: true,
              href: 'breadcrumbs_shirts',
          },
      ],
      item: 5,
      product : {},
      product1 :{},
      quantity : 1
  }),
  methods: {
    async getPro(){
      // console.log(this.$route.params)
      let id = this.$route.params.id
      this.product = (await axios.get(`product/details/${id}`)).data
      console.log("product:" , this.product)
    },
    addToCart(){
      this.$store.dispatch('addProductToCart', {
        product : this.product,
        size : this.size,
        quantity : parseInt(this.quantity)
      })
    },

  },
  created(){
    this.getPro()
  }
}
</script>
