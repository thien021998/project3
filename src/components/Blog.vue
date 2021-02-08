<template>
  <div>
    <v-container>
      <p class="display-3 font-weight-light	text-center pa-4">
        Hiểu biết thêm về thời trang
      </p>
      <div class="row">
        <div class="col-md-4 col-sm-4 col-xs-12">
          <v-card class="mx-auto" max-width="400" outlined tile href="/post">
            <v-img
              class="white--text align-end"
              height="400px"
              :src="require('../assets/img/home/slider2.jpg')"
            >
              <v-card-title>10 xu hướng tốt nhất tháng</v-card-title>
            </v-img>

            <v-card-subtitle class="pb-0">Xu hướng thời trang</v-card-subtitle>

            <v-card-text class="text--primary">
              <div>Xu hướng thời trang gần đây có sự chuyển dịch một cách rõ ràng...</div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="orange" text>
                Đọc thêm
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
        <div class="col-md-4 col-sm-3 col-xs-12">
          <v-card class="mx-auto" max-width="400" outlined tile href="/post">
            <v-img
              class="white--text align-end"
              height="400px"
              :src="require('../assets/img/home/slider3.jpg')"
            >
              <v-card-title>Thương hiệu thời trang tốt nhất</v-card-title>
            </v-img>

            <v-card-subtitle class="pb-0">Thương hiệu</v-card-subtitle>

            <v-card-text class="text--primary">
              <div>
                Những thương hiệu thời trang nam tốt nhất hiện nay...
              </div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="orange" text>
                Đọc thêm
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
        <div class="col-md-4 col-sm-3 col-xs-12">
          <v-card class="mx-auto" max-width="400" outlined tile href="/post" >
            <v-img
              class="white--text align-end"
              height="400px"
              :src="require('../assets/img/home/slider4.jpg')"
            >
              <v-card-title >Tạo phong cách thời trang</v-card-title>
            </v-img>

            <v-card-subtitle class="pb-0">Thời trang của bạn</v-card-subtitle>

            <v-card-text class="text--primary">
              <div>
                Định hướng phong cách thời trang cho bản thân mới nhất...
              </div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="orange" text>
               Đọc thêm
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </div>
    </v-container>
  </div>
</template>
