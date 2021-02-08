<template>
  <v-app id="inspire">
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="primary"
      dark
    >
      <!--      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />-->

      <v-toolbar-title style="width: 350px">
        <v-img
        class="logo"
        :src="require('../assets/logo.png')"
        height="60px"
        width="60px"
        @click="goHome"
        ></v-img>
      </v-toolbar-title>
        <v-text-field
          v-on:keyup.13="search(text)"
          flat
          solo-inverted
          hide-details
          prepend-inner-icon="mdi-magnify"
          label="Search"
          class="hidden-sm-and-down pl-10 ml-4"
          v-model="text"
        />
      <v-spacer />

      <div class="dropdown show">
        <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <v-icon>mdi-account-circle</v-icon> {{getName}}
        </a>

        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <router-link v-if="is" to="/login" tag="button" class="dropdown-item"
            >Đăng nhập</router-link
          >
          <button to="" tag="li" class="dropdown-item"
            >Tài khoản</button
          >
          <button v-if="!is" to="" tag="button" class="dropdown-item" @click="logout"
            >Đăng xuất</button
          >
        </div>
      </div>

      <v-btn icon>
        <v-badge content="2" value="2" color="green" overlap>
          <v-icon>mdi-bell</v-icon>
        </v-badge>
      </v-btn>
      <v-btn to="/cart" icon>
        <v-badge :content="getCartCount" :value="getCartCount" color="green" overlap>
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-bottom-navigation :value="activeBtn" color="primary" horizontal>
        <router-link to="/" active-class="active"  tag="span" class="v-btn" >Trang Chủ</router-link>
        <v-menu open-on-hover offset-y>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on">
              <span>Danh mục</span>
            </v-btn>
          </template>
          <v-card class="mx-auto" max-width="344" outlined>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              :to="`/product/${item._id}`"
              @click="getProductByCategory(item._id, item.name)"
            >
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item>
          </v-card>
        </v-menu>
        <router-link to="/shop" class="v-btn">
          <span>Sản Phẩm</span>
        </router-link>
        <v-btn to="/blog">
          <span>Tin Tức</span>
        </v-btn>
      </v-bottom-navigation>
    </v-content>
    <router-view />
    <v-footer :padless="true">
      <v-card flat tile width="100%" class="secondary white--text text-center">
        <v-card-text>
          <v-btn class="mx-4 white--text" icon>
            <v-icon size="24px">mdi-home</v-icon>
          </v-btn>
          <v-btn class="mx-4 white--text" icon>
            <v-icon size="24px">mdi-email</v-icon>
          </v-btn>
          <v-btn class="mx-4 white--text" icon>
            <v-icon size="24px">mdi-calendar</v-icon>
          </v-btn>
          <v-btn class="mx-4 white--text" icon>
            <v-icon size="24px">mdi-delete</v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0">
          
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>ShopMen
          </strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>
<script>
import axios from "../service/api";
import { mapMutations, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      items: [],
      activeBtn: 0,
      on: "",
      text: "",
    };
  },
  methods: {
    ...mapActions(["getProductByCategory", "search"]),

    ...mapMutations(["setUser", "setCart"]),
    async getCate() {
      await axios
        .get("producttype")
        .then((res) => {
          // console.log(res.data);
          return (this.items = res.data);
        })
        .catch((err) => console.log(err));
    },
    logout() {
      localStorage.clear();
      return (window.location.href = "/");
    },
    goHome(){
      return this.$router.push('/')
    }
  },
  mounted() {
    this.getCate(), this.setUser(), this.setCart();
  },
  computed: {
    ...mapGetters(["getName", "getCartCount"]),

    is() {
      return localStorage.user ? false : true;
    },
  },
};
</script>

<style scoped>
.logo{
  cursor: pointer;
}
</style>