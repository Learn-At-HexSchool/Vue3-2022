import { apiLogCheck, apiGetProductList } from '/src/scripts/apis.js';
// console.log(apiLogin);
/** end of import */


const sampleData = [
    {
        category: "甜甜圈",
        content: "尺寸：14x14cm",
        description: "濃郁的草莓風味，中心填入滑順不膩口的卡士達內餡，帶來滿滿幸福感！",
        id: "-L9tH8jxVb2Ka_DYPwng",
        is_enabled: 1,
        origin_price: 150,
        price: 99,
        title: "草莓莓果夾心圈",
        unit: "個",
        num: 10,
        imageUrl: "https://images.unsplash.com/photo-1583182332473-b31ba08929c8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzR8fGRvbnV0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
        imagesUrl: [
            "https://images.unsplash.com/photo-1626094309830-abbb0c99da4a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2832&q=80",
            "https://images.unsplash.com/photo-1559656914-a30970c1affd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTY0fHxkb251dHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
        ]
    },
    {
        category: "蛋糕",
        content: "尺寸：6寸",
        description: "蜜蜂蜜蛋糕，夾層夾上酸酸甜甜的檸檬餡，清爽可口的滋味讓人口水直流！",
        id: "-McJ-VvcwfN1_Ye_NtVA",
        is_enabled: 16,
        origin_price: 1000,
        price: 900,
        title: "蜂蜜檸檬蛋糕",
        unit: "個",
        num: 1,
        imageUrl: "https://images.unsplash.com/photo-1627834377411-8da5f4f09de8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1001&q=80",
        imagesUrl: [
            "https://images.unsplash.com/photo-1618888007540-2bdead974bbb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=987&q=80",
        ]
    },
    {
        category: "蛋糕",
        content: "尺寸：6寸",
        description: "法式煎薄餅加上濃郁可可醬，呈現經典的美味及口感。",
        id: "-McJ-VyqaFlLzUMmpPpm",
        is_enabled: 1,
        origin_price: 700,
        price: 600,
        title: "暗黑千層",
        unit: "個",
        num: 15,
        imageUrl: "https://images.unsplash.com/photo-1505253149613-112d21d9f6a9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDZ8fGNha2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
        imagesUrl: [
            "https://images.unsplash.com/flagged/photo-1557234985-425e10c9d7f1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTA5fHxjYWtlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
            "https://images.unsplash.com/photo-1540337706094-da10342c93d8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fGNha2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
        ]
    }
]
/** end of sampleData[] */

/**
 * #TODO:
 * productsModal.js
 */
export default {
    name: "LoginModal",

    /**
     * 【子元件的自訂命名變數】
     * 其中數值會自動接收來自外層的資料
     */
    // props: ['isLogin', 'isMask'],

    data() {
        return {
            isLogin: false,
            isMask: true,
            isShowStatus: false,
            hintMsg: '驗證中',

            itemInfo: {},
            products: sampleData,
            // products: [],
        }
        /** end of return */
    },
    /** end of data() */


    methods: {
        goHome() {
            // #DEV:-cos page changing fast if api response too slow
            window.location = 'index.html';
        },
        /** end of goHome() */


        showInfo(item) {
            this.itemInfo = item;
        },
        /** end of showInfo() */

        showStatus() {
            this.isMask = false;
            this.isShowStatus = true;
        },
        /** end of showStatus() */


        getProducts() {
            alert('2-getProducts()')
            // this.showStatus();
            // console.log(apiGetProductList);

            apiGetProductList()
                .then((res) => {
                    alert('2.1-then')
                    // console.dir(res);
                    const { products } = res.data;
                    // response.data.products
                    if (!this.products) {
                        this.isMask = true;
                    }
                    // statusText
                    // hintMsg = success
                    this.hintMsg = 'Hi'
                    this.products = products;
                    this.showStatus();
                })
                .catch((err) => {
                    alert('2.2-catch')
                    // console.dir(err);
                    const { data } = err.response;
                    this.hintMsg = data.message
                });
        },
        /** end of getProducts() */

        loginChecker() {
            alert('1-loginChecker()')
            // this.getProducts()
            apiLogCheck()
                .then((res) => {
                    alert('1.1-then')
                    const { success, message } = res.data;
                    this.hintMsg = message;
                    this.hintMsg = success
                    this.isLogin = true;
                    this.getProducts();
                })
                .catch((err) => {
                    alert('1.2-catch')
                    // console.dir(err);
                    const { data } = err.response;
                    this.hintMsg = data.message
                });
        },
        /** end of loginChecker() */

    },
    /** end of methods: {} */

    computed: {
        modalStyle() {
            return {
                display: this.isMask ? '' : 'none'
            };
        }
        /** end of modalStyle()  */
    },
    /** end of computed: {} */


    created() {
        console.log("created-loginModal");
    },
    mounted() {
        console.log('mounted-loginModal')
        this.loginChecker();
        // this.getProducts()
    },
    /** end of mounted() */



    template: `
    <section class="modal-mask" :style="modalStyle">
        <section class="modal-container">
            <div class="modal-body">
                <button type="button" class="btn"  v-show="hintMsg" 
                    :class="[ isLogin ? 'btn-success':'btn-danger', 
                        isShowStatus ? 'msg-btn' : 'btn-warning' ]"
                    @click="isMask==='false' ? '' : goHome()"
                >
                    {{ hintMsg }}
                </button>
            </div>
        </section>
    </section>
    <!-- end of modal-mask -->

    <section class="list-container" v-if="isLogin">
            <button type="button" class="btn msg-btn btn-success" v-if="isLogin">
                {{ hintMsg }}
            </button>

            <div class="row py-3">
                
                <section class="col-md-6">
                    <h2>產品列表</h2>

                    <table class="table table-hover mt-4">
                        <thead>
                            <tr>
                                <th width="150">產品名稱</th>
                                <th width="120">
                                    原價
                                </th>
                                <th width="120">
                                    售價
                                </th>
                                <th width="150">
                                    是否啟用
                                </th>
                                <th width="120">
                                    查看細節
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                    <!-- 
                        #NOTE:【計數器放外層的標籤】
                        https://book.vue.tw/CH1/1-6-conditions-and-flow-control.html
                    -->
                            <tr v-for="(item) in products" :key="item.id">
                                <td width="150">
                                    {{ item.title }}
                                </td>

                                <td width="120">
                                    {{ item.origin_price }}
                                </td>

                                <td width="120">
                                    {{ item.price }}
                                </td>
                                
                                <td width="150">
                                <!-- #TODO:_Toggle-Switch -->
                                    <span v-if="item.is_enabled" class="text-success">啟用</span>
                                    <span v-else>未啟用</span>
                                </td>

                                <td width="120">
                                    <button type="button" class="btn btn-primary" 
                                            @click="showInfo(item)">
                                        查看細節
                                    </button>
                                </td>                                
                            </tr>
                        </tbody>
                    </table>

                    <p>目前有 <span>{{ products.length }}</span> 項產品</p>
                </section>
                <!-- end of col-list -->

                <section class="col-md-6">
                    <h2>單一產品細節</h2>
            <!-- 
                #NOTE:【判斷放外層的標籤】
                template-if
            -->
                    <template v-if="itemInfo.title">

                        <div class="card mb-3">
                            <img :src="itemInfo.imageUrl" class="card-img-top primary-image" alt="主圖" />

                            <div class="card-body">
                                <h5 class="card-title">
                                    {{ itemInfo.title }}
                                    <span class="badge bg-primary ms-2">
                                        {{ itemInfo.category }}
                                    </span>
                                </h5>

                                <p class="card-text">【商品描述】：{{ itemInfo.description }}</p>
                                <p class="card-text">【商品內容】：{{ itemInfo.content }}</p>

                                <div class="d-flex">
                                    <p class="card-text me-2">
                                        {{ itemInfo.price }}
                                    </p>

                                    <p class="card-text text-secondary">
                                        <del>{{ itemInfo.origin_price }}</del>
                                    </p>

                                    {{ itemInfo.unit }} / 元
                                </div>
                            </div>
                        </div>

                    <!--                        
                        <template v-for="(image, id) in itemInfo.imagesUrl" :key="id">                        
                            #DEBUG:                            
                            <img v-if="image" :src="image" class="images m-2">
                        </template>
                    -->

                    </template>
                    <p v-else class="text-secondary">請選擇一個商品查看</p>

                </section>
                <!-- end of col-info -->
            </div>
            <!-- end of row -->

        </section>
        <!-- end of list-container -->
    `,
    /** end of template */

};
/** end of export-default */