Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
  `
})



Vue.component('product', {
    props:{
        premium:{
            type: Boolean,
            required: true,
        }
    },
    template:`
    <div class="product">

        <div class="product-image">
            <img v-bind:alt="altText" v-bind:src="image"/>
        </div>

        <div class="product-info">
            <h1>{{ title }}</h1>
            <p>{{description}}</p>
            <a v-bind:href="link">Больше таких продуктов</a>
            
            <p>Доставка: {{ shipping }}</p>

            <p v-if="inventory > 10">В наличии</p>
            <p v-else-if="inventory <= 10 && inventory > 0">Почти распродано!</p>
            <p v-else :class="{ outOfStock: !inStock }">Распродано</p>
            <span>{{sale}}</span>

            <product-details :details="details"></product-details>

            <div
                    class="color-box"
                    v-for="(variant, index) in variants"
                    :key="variant.variantId"
                    :style="{ backgroundColor:variant.variantColor }"
                    @mouseover="updateProduct(index)"
            >
            </div>

            <ul>
                <li v-for="size in sizes">{{ size }}</li>
            </ul>


            <div class="cart">
                <p>Cart({{ cart }})</p>
            </div>

            <button  v-on:click="addToCart"
                     :disabled="!inStock"
                     :class="{ disabledButton: !inStock }">
                Добавить в корзину</button>
            <button @click="removeFromCart">Удалить из корзины</button>

        </div>
    </div>
    `,
    data(){
        return{
            product: "Носки",
            description: "Пара теплых и пушистых носков.",
            selectedVariant: 0,
            altText: "Пара носков",
            link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
            inStock: true,
            inventory:true,
            onSale: true,
            details: ['80% хлопок', '20% полиэстер', 'Gender-neutral'],
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: "./assets/vmSocks-green-onWhite.jpg",
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 0
                }
            ],
            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            cart: 0,
            brand: 'Vue Mastery',
        }

    },

    methods: {
        addToCart() {
            this.cart += 1
        },

        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        },

        removeFromCart() {
            this.cart -= 1
        },


    },


    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },

        image() {
            return this.variants[this.selectedVariant].variantImage;
        },

        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },

        sale() {
            if (this.onSale) {
                return this.brand + ' ' + this.product + ' распродажа!'
            }
            return  this.brand + ' ' + this.product + ' нет распродажи'
        },

        shipping() {
            if (this.premium) {
                return "Бесплатно";
            } else {
                return 2.99
            }
        }



    }

})



let app = new Vue({
    el: '#app',
    data:{
        premium: false
    }
})
