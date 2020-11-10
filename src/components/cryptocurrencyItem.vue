<template>
    <div class="cryptoItem" v-on:click.capture="drowChart">
        <span>{{price[0]}}</span>
        <span>{{price[1]}}   
            <span class="dinamyc" > {{price[2]}} </span>
        </span>
    </div>
</template>

<script>
export default {
    props: ['price', 'onDrow'],
    computed: {
        chartData() {
			// данные для графика
			return this.$store.getters.getData || {};
		}
    },
    methods: {
        drowChart() {
            let el = document.querySelector('.cryptoItem:hover')

            el = el.getElementsByTagName('span')
            this.$store.dispatch('fetchChartData', el[0].innerHTML)
            this.$store.dispatch('SUBSCRIBE')

            window.scrollTo(0, 0)
        }
    },
    mounted() {
    }
}
</script>

<style>
.cryptoItem {
    margin-left: auto;
    margin-right: auto;
    max-width: 90%;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 10px;
    background: #C4C4C4;
    display: flex;
    justify-content: space-between;
}

.cryptoItem:hover {
    background: #929292;
}

.dinamyc {
    padding: 3px;
    background: #636363;
    min-width: 300px;
    color: #5dd600;
}
</style>