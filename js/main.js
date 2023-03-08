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


Vue.component('product-review', {
    template: `
         <form class="review-form" @submit.prevent="onSubmit">
             <p v-if="errors.length">
                 <b>Пожалуйста исправьте следующие ошибки:</b>
                 <ul>
                     <li v-for="error in errors">{{ error }}</li>
                 </ul>
            </p>

             <p>
               <label for="name">Имя:</label>
               <input id="name" v-model="name" placeholder="name">
             </p>
        
             <p>
               <label for="review">Комментарий:</label>
               <textarea id="review" v-model="review"></textarea>
             </p>
        
             <p>
               <label for="rating">Оценка:</label>
               <select id="rating" v-model.number="rating">
                 <option>5</option>
                 <option>4</option>
                 <option>3</option>
                 <option>2</option>
                 <option>1</option>
               </select>
             </p>
            
             <p>
               <input type="submit" value="Отправить"> 
             </p>
        
         </form>

         `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                this.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
            } else {
                if (!this.name) this.errors.push("Не указано имя.")
                if (!this.review) this.errors.push("Отсутствует комментарий.")
                if (!this.rating) this.errors.push("Оценка не выбрана.")
            }
        }
    }
})



Vue.component('product', {
    props:{
        premium:{
            type: Boolean,
            required: true,
        }
    },
    // language=HTML
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


            <button  v-on:click="addToCart"
                     :disabled="!inStock"
                     :class="{ disabledButton: !inStock }">
                Добавить в корзину</button>
            <button @click="removeFromCart">Удалить из корзины</button>
            
        </div>
        <div>
            <h2>Отзывы</h2>
            <p v-if="!reviews.length">Отзывов пока нет.</p>
            <ul>
                <li v-for="review in reviews">
                    <p>{{ review.name }}</p>
                    <p>Оценка: {{ review.rating }}</p>
                    <p>{{ review.review }}</p>
                </li>
            </ul>
        </div><product-review @review-submitted="addReview"></product-review>
        
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
            brand: 'Vue Mastery',
            reviews:[],
        }

    },

    methods: {
        addToCart() {
            this.$emit('add-to-cart');
        },


        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        },

        removeFromCart: function() {
            this.$emit('remove-from-cart');
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
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        },
        removeCart(id){
            this.cart.pop(id);
        }
    }


})
