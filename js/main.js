let app = new Vue({
    el: '#app',
    data: {
        product: "Носки",
        description: "Пара теплых и пушистых носков.",
        image: "./assets/vmSocks-blue-onWhite.jpg",
        altText: "Пара носков",
        link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
        inventory:9,
        onSale: true,
        details: ['80% хлопок', '20% полиэстер', 'Gender-neutral'],
        variants: [
            {
                variantId: 2234,
                variantColor: 'green',
                variantImage: "./assets/vmSocks-green-onWhite.jpg",
            },
            {
                variantId: 2235,
                variantColor: 'blue',
                variantImage: "./assets/vmSocks-blue-onWhite.jpg",
            }
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        cart: 0,





    },

    methods: {
        addToCart() {
            this.cart += 1
        },

        updateProduct(variantImage) {
            this.image = variantImage
        }
    },







})
