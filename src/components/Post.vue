<template>
  <div>
    <v-container>
      <p class="display-3 font-weight-light	text-center pa-4">Thương hiệu bán chạy</p>
      <p class="overline text-center">Tác giả <b>Hạo Nhiên</b> | 24 tháng 12 năm 2020</p>
      <div class="row">
        <div class="col-md-12 col-sm-12 col-xs-12">
          <v-img
            class="white--text align-end"
            height="400px"
            :src="require('../assets/img/home/slider2.jpg')"
          ></v-img>
          <p class="display-1 mb-0 pt-5">Thương hiệu </p>
          <p class="pt-5 subtitle-1 font-weight-light">
          </p>
          <ul class="subtitle-1 font-weight-light">
            <li>Sản phẩm bán chạy</li>
            <li>Thương hiệu được quan tâm</li>
          </ul>
          <p class="subtitle-1 font-weight-light pt-5">
          </p>
          <v-img
            class="white--text align-end"
            height="400px"
            :src="require('../assets/img/home/slider3.jpg')"
          ></v-img>
          <p class="display-1 mb-0 pt-5">Thương hiệu tốt nhất</p>
          <p class="subtitle-1 font-weight-light pt-5">
          </p>
          <p class="subtitle-1 font-weight-light">
          </p>
          <p class="body-1	font-weight-light pt-10"><b>Bình luận</b></p>
          <v-list
            three-line="true"
            avatar="true"
          >
            <v-list-item-group v-model="item" color="primary">
              <v-list-item
                v-for="(item, i) in items"
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
        </div>
      </div>
    </v-container>
  </div>
</template>
<script>
    export default {
        data: () => ({
            rating:4.5,
            item: 5,
            items: [
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                    title: 'Chất liệu sản phẩm',
                    subtitle: "<span class='text--primary'>Ngọc Khánh</span> &mdash; Chất liệu sản phẩm khá tốt\n" +
                        "\n",
                },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                    title: 'Màu sắc <span class="grey--text text--lighten-1">4</span>',
                    subtitle: "<span class='text--primary'>to Hạo</span> &mdash; Màu sắc hài hòa"
                },
                
            ],
        }),
    }
</script>
