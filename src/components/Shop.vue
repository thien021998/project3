<template>
  <div>
    <v-container>
      <div class="row">
        <div class="col-md-3 col-sm-3 col-xs-12">
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
                  label="cao nhất"
                  outlined
                  dense
                  @change="$set(range, 1, $event)"
                ></v-text-field>
              </v-col>
            </v-row>
            <button class="btn btn-success ml-5" @click="filter(range)">
              Lọc
            </button>
            <v-divider></v-divider>
            <template>
              <v-treeview
                :items="items"
                :open="[1]"
                :active="[5]"
                :selected-color="'#fff'"
                activatable
                open-on-click
                dense
              ></v-treeview>
            </template>
            <v-divider></v-divider>
          </v-card>
        </div>
        <div class="col-md-9 col-sm-9 col-xs-12">
          <v-breadcrumbs class="pb-0" :items="breadcrums"></v-breadcrumbs>

          <v-row dense>
            <v-col cols="12" sm="8" class="pl-6 pt-6"> </v-col>
            <v-col cols="12" sm="4">
              <select class="custom-select">
                <option selected @click.prevent="caoToThap">Cao đến thấp</option>
                <option @click.prevent="thapToCao">Thấp đến cao</option>
              </select>
            </v-col>
          </v-row>
          <v-divider></v-divider>

          <div class="row text-center">
            <div
              class="col-md-3 col-sm-6 col-xs-12"
              :key="pro.id"
              v-for="pro in getProducts"
            >
              <v-hover v-slot:default="{ hover }">
                <v-card class="mx-auto" color="grey lighten-4" max-width="600">
                  <v-img
                    class="white--text align-end"
                    :aspect-ratio="16 / 9"
                    height="200px"
                    :src="pro.image"
                  >
                    <v-expand-transition>
                      <div
                        v-if="hover"
                        class="d-flex transition-fast-in-fast-out white darken-2 v-card--reveal display-3 white--text"
                        style="height: 100%;"
                      >
                        <v-btn
                          v-if="hover"
                          :to="`/product/details/${pro._id}`"
                          class=""
                          outlined
                          >Xem</v-btn
                        >
                      </div>
                    </v-expand-transition>
                  </v-img>
                  <v-card-text class="text--primary" style="height : 100px">
                    <div>
                      <a href="/product" style="text-decoration: none">{{
                        pro.name
                      }}</a>
                    </div>
                    <div class="">{{ pro.price }}VNĐ</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </div>
          </div>
          <template>
            <div class="text-center">
              <v-container @click="getProduct(page)">
                <v-row justify="center">
                  <v-col cols="6">
                    <v-container class="max-width">
                      <v-pagination
                        v-model="page"
                        class="my-4"
                        :length="getAllpage"
                      ></v-pagination>
                    </v-container>
                  </v-col>
                </v-row>
              </v-container>
            </div>
          </template>
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
  opacity: 0.8;
  position: absolute;
  width: 100%;
}
</style>
<script>
import axios from "../service/api";
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    range: [0, 10000000],
    select: "",
    options: [
      {
        type: "Từ cao đến thấp",
        func: "caoToThap"
      },
      {
        type: "Từ thấp đến cao",
        func: "thapToCao"
      }
    ],
    page: 1,
    breadcrums: [
      {
        text: "Trang chủ",
        disabled: true,
        href: "breadcrumbs_home"
      },
      {
        text: "Sản phẩm",
        disabled: false,
        href: "breadcrumbs_clothing"
      }
    ],
    min: 0,
    max: 10000000,
    items: [
      {
        id: 2,
        name: "Giày",
        children: [
          { id: 2, name: "Giày tây" },
          { id: 3, name: "Giày thể thao" },
          
        ]
      },
      {
        id: 1,
        name: "Clothing",
        children: [
          { id: 4, name: "Áo" },
          { id: 5, name: "Quần" },
          
        ]
      }
    ],
    products: []
  }),
  methods: {
    ...mapActions(["getProduct", "filter"]),
    caoToThap() {
      console.log("cao to thap");
    },
    thapToCao() {
      console.log("thap cao");
    }
  },
  computed: {
    ...mapGetters(["getProducts", "getAllpage"])
  },
  mounted() {
    this.getProduct();
  }
};
</script>
