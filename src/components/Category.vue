<template>
  <div>
    <v-container>
      <div class="row">
        <div
         class="col-md-3 col-sm-3 col-xs-12">
          <v-card outlined>

           <v-card-title>Lọc</v-card-title>
            <v-range-slider
              v-model="range"
              :max="max"
              :min="min"
              :height="10"
              class="align-center"
              dense
            ></v-range-slider>
            <v-row class="pa-2" dense>
              <v-col cols="12" sm="5">
                <v-text-field
                  :value="range[0]"
                  label="Thấp nhất"
                  outlined
                  dense
                  @change="$set(range, 0, $event)"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2">
                <p class="pt-2 text-center">Đến</p>
              </v-col>
              <v-col cols="12" sm="5">
                <v-text-field
                  :value="range[1]"
                  label="Cao nhất"
                  outlined
                  dense
                  @change="$set(range, 1, $event)"
                ></v-text-field>
              </v-col>
            </v-row>
            <button class="btn btn-success ml-5" >Lọc</button>
            <v-divider></v-divider>
            <template>
              <v-treeview :items="items" :open="[1]" :active="[5]" :selected-color="'#fff'" activatable open-on-click dense></v-treeview>
            </template>
            <v-divider></v-divider>
          </v-card>
        </div>
        <div
          class="col-md-9 col-sm-9 col-xs-12"
        >

          <v-breadcrumbs class="pb-0" :items="breadcrums"></v-breadcrumbs>

          <v-row dense>
            <v-col cols="12" sm="8" class="pl-6 pt-6">
            </v-col>
            <v-col cols="12" sm="4">
              <v-select class="pa-0" v-model="select" :items="options" style="margin-bottom: -20px;" outlined dense></v-select>
            </v-col>
          </v-row>

          <v-divider></v-divider>

          <div class="row text-center">
            <div class="col-md-3 col-sm-6 col-xs-12" :key="pro.id" v-for="pro in getProductByCategory">
              <v-hover v-slot:default="{ hover }">
                <v-card
                  class="mx-auto"
                  color="grey lighten-4"
                  max-width="600"
                >
                  <v-img
                    class="white--text align-end"
                    :aspect-ratio="16/9"
                    height="200px"
                    :src="pro.image"
                  >
                    <v-expand-transition>
                      <div
                        v-if="hover"
                        class="d-flex transition-fast-in-fast-out white darken-2 v-card--reveal display-3 white--text"
                        style="height: 100%;"
                      >
                        <v-btn v-if="hover" :href="`/product/details/${pro._id}`" class="" outlined>Xem</v-btn>
                      </div>

                    </v-expand-transition>
                  </v-img>
                  <v-card-text class="text--primary">
                    <div><a href="/product" style="text-decoration: none">{{pro.name}}</a></div>
                    <div>{{pro.price}}VNĐ</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </div>
          </div>
          <div class="text-center mt-12">
            <v-pagination
              v-model="page"
              :length="6"
            ></v-pagination>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>
<style>
  .v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .8;
    position: absolute;
    width: 100%;
  }
</style>
<script>
import {mapGetters} from 'vuex';
import axios from '../service/api'
    export default {
        data: () => ({
            range: [0, 10000000],
            select:'Popularity',
            options: [
                'Price: Low to High',
                'Price: High to Low',
            ],
            page:1,
            breadcrums: [
                {
                    text: 'Trang chủ',
                    disabled: true,
                    href: 'breadcrumbs_home',
                },
                {
                    text: 'Sản phẩm',
                    disabled: true,
                    href: 'breadcrumbs_clothing',
                },
                {
                    text: '',
                    disabled: false,
                    href: 'breadcrumbs_shirts',
                },
            ],
            min:0,
            max:10000000,
            items: [
                {
                    id: 2,
                    name: 'Giày',
                    children: [
                        { id: 2, name: 'Giày tây' },
                        { id: 3, name: 'Giày thể thao' },
                        
                    ],
                },
                {
                    id: 1,
                    name: 'Quần áo',
                    children: [
                        { id: 5, name: 'Áo' },
                        { id: 6, name: 'Quần' },
                        
                    ],
                }
            ],
            products :[]
        }),
        computed:{
          ...mapGetters(['getProductByCategory'])
        },
        async mounted() {
          this.breadcrums[2].text = (await axios.get(`/${this.$route.params.id}`)).data
        }
    }
</script>
