<template>
  <div>
    <v-container>

      <p class="display-3 font-weight-light	text-center pa-4">GIỎ HÀNG</p>
      <v-row>
        <v-col :cols="12" md="9" sm="12" >
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-center">Sản phẩm</th>
                <th class="text-center">Kích cỡ</th>
                <th class="text-center">Giá</th>
                <th class="text-center">Số lượng</th>
                <th class="text-center">Thành tiền</th>
                <th class="text-center"></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in getcart" :key="item._id">
                <td>
                  <v-list-item
                  key="1"
                >
                  <v-list-item-avatar>
                    <v-img :src="item.product.image"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title >{{item.product.name}}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item></td>
                <td>{{item.size}}</td>
                <td>{{item.product.price}} VNĐ</td>
                <td>
                  <div class="d-flex">
                    <button @click="downQuantity(item.product)" class="mr-3 btn btn-outline-success" style="height : 30px; margin-top : 50px; padding-top: 2px">-</button>
                    <v-text-field
                      class="pt-10"
                      label="Outlined"
                      style="width:20px;"
                      single-line
                      outlined
                      :value="item.quantity"
                    ></v-text-field>
                    <button @click="upQuantity(item.product)" class="ml-3 btn btn-outline-success" style="height : 30px; margin-top : 50px; padding-top: 2px">+</button>
                  </div>
                </td>
                <td>{{item.quantity * item.product.price}} VNĐ</td>
                <td><button class="btn btn-danger" @click.prevent="deleteProductToCart(item.product)">X</button></td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
        <v-col :cols="12" md="3" sm="12" style="background-color: lightgray">
          <p class="headline">Hóa đơn thanh toán</p>
          <p class="overline">CHI PHÍ VẬN CHUYỂN VÀ THUẾ ĐƯỢC TÍNH THEO CÁC GIÁ TRỊ BẠN ĐÃ NHẬP.
          </p>
          <v-simple-table>
            <template v-slot:default>
              <tbody>
              <tr>
                <td>Tổng tiền</td>
                <td class="text-right" style="width: 50px;">{{getOrder}} VNĐ</td>
              </tr>
              <tr>
                <td>Phí ship</td>
                <td class="text-right" style="width: 50px;">20.000 VNĐ</td>
              </tr>
              <tr>
                <td>Thuế</td>
                <td class="text-right" style="width: 50px;">{{getOrder * 0.05}} VNĐ</td>
              </tr>
              <tr>
                <td>Tổng hóa đơn</td>
                <td class="text-right" style="width: 50px;"><b>{{total}} VNĐ</b></td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
          <br>
          <v-text-field 
            prepend-icon="mdi-map-marker"
            label="nhập địa chỉ nhận hàng ..." 
            :rules="rules"
            hide-details="auto"
            v-model="address"></v-text-field>
          <div class="text-center">
            <v-btn class="primary white--text mt-5" outlined @click="checkout({total, address})">Thanh Toán </v-btn>
          </div>
        </v-col>
      </v-row>
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
                <p class="font-weight-thin">Hỗ trợ 24/7</p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>
<script>
import Product from './Product'
import {mapActions, mapMutations, mapGetters} from 'vuex';
    export default {
  components: { Product },
        data: () => ({
            rating: 4.5,
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
            rules: [
              value => !!value || 'Required.',
              value => (value && value.length >= 10) || 'Min 10 characters',
            ],
            address :'',
        }),
        computed:{
          getcart(){
            return this.$store.getters.getCart
          },
          ...mapGetters(['getOrder']),
          total(){
            return this.getOrder + 20000 + this.getOrder * 0.05
          }
        },
        methods:{
          ...mapActions(['deleteProductToCart', 'checkout']),
          ...mapMutations(['upQuantity', 'downQuantity']),
        }
    }
</script>

