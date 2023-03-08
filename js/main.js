let app = new Vue({
    el: '#app',
    data: {
        product: "Носки",
        description: "Пара теплых и пушистых носков.",
        selectedVariant: 0,
        altText: "Пара носков",
        link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
        inStock: false,
        inventory:false,
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
        }




    }








})
