import Vue from 'vue';
import Vuex from 'vuex';
import api from '../service/api';
import decode from 'jwt-decode';
import router from '../router/index'
Vue.use(Vuex);

export const store = new Vuex.Store({
  state:{
    user : '',
    products : [],
    cart : [],
    productsByCategory : [],
    productsSearch : [],
    allpage : 0,
    danhmuc : ''
  },
  mutations:{
    setUser(state){
      return state.user = decode(localStorage.user).sub
    },
    addToCart(state, {product, size,  quantity}){
      let productInCart = state.cart.find(item => item.product._id === product._id)
      if(productInCart){
        productInCart.quantity += quantity
        return
      }
      state.cart.push({product, size, quantity})
    },
    async setCart(state){
      let cart = await api.get(`getCart/${state.user._id}`)
      return state.cart = cart.data
    },
    deleteProductToCart(state, product){
      return state.cart = state.cart.filter(item => item.product._id !== product._id)
    },
    async upQuantity(state, product){
      let pro = state.cart.find(item => item.product._id === product._id)
      pro.quantity ++
      await api.put(`cart/${state.user._id}`, state.cart)
    },
    async downQuantity(state, product){
      let pro = state.cart.find(item => item.product._id === product._id)
      if(pro.quantity == 1){
        state.cart =  state.cart.filter(item => item.product._id !== product._id)
      }
      pro.quantity --
      await api.put(`cart/${state.user._id}`, state.cart)
    },
    async CHECKOUT(state,{total, address}){
      await api.post('checkout',{
        username : state.user.username,
        userPhone : state.user.phonenumber,
        address : address,
        products : state.cart,
        totalOrder : total,
        completed : 'Chưa xác nhận'
      })
      await state.cart.forEach(item => {
        api.put(`updateProduct/${item.product._id}/${item.quantity}`)
      })
      state.cart = []
      await api.put(`cart/${state.user._id}`, state.cart)
    },
    async GET_PRODUCT_BY_CATEGORY(state, id){
      state.productsByCategory = (await api.get(`/product/${id}`)).data
    },
    async SEARCH(state, text){
      let a = (await api.get(`search/${text}`)).data
      state.productsSearch = a
    },
    GET_PRODUCT(state, page){
      let a = page || 1
      api.get(`pagination/${a}`).then(res => { 
        state.products = res.data.pagination
        state.allpage = res.data.allPage
      })
    },
    FILTER(state, range){
      api.get(`filter/${range[0]}/${range[1]}`).then(res =>{
        state.products = res.data
      })
    }
  },
  actions:{
    async addProductToCart({commit, state}, {product, size, quantity}){
      commit('addToCart', {product, size, quantity})
      // console.log(state.cart);
      await api.put(`cart/${state.user._id}`, state.cart)
      return router.push('/shop')
    },
    async deleteProductToCart({commit, state}, product){
      commit('deleteProductToCart', product)
      await api.put(`cart/${state.user._id}`, state.cart)
    },
    checkout({commit}, {total, address}){
      commit('CHECKOUT', {total, address})
      return router.push('/shop')
    },
    getProductByCategory({commit}, id){
      commit('GET_PRODUCT_BY_CATEGORY', id)
    },
    async search({commit} , text){
      await commit('SEARCH', text)
      if(router.app._route.fullPath !== '/search'){
        router.push('/search')
      }
    },
    getProduct({commit}, page){
      commit('GET_PRODUCT', page)
    },
    filter({commit}, range){
      commit('FILTER', range)
    }
  },
  getters:{
    getCartCount(state){
      return state.cart.length
    },
    getCart(state){
      return state.cart
    },
    getName(state){
      return state.user.username
    },
    getOrder(state){
      return state.cart.reduce((a, b) => a + (b.product.price * b.quantity), 0)
    },
    getProductByCategory(state){
      return state.productsByCategory
    },
    getProductSearch(state){
      return state.productsSearch
    },
    getProducts(state){
      return state.products
    },
    getAllpage(state){
      return state.allpage
    }
  }
})