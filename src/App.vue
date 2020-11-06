<template>
	<div id="app" class="app">
		<div class="navBar">
			<img class="img" src="@/assets/JPEG24.jpg" alt="" srcset="" />
		</div>

		<Chart class="chart" v-bind:chartData="chartData" />

		<CryptoList v-bind:tableData="tableData" />

		<!-- <button @click="click">dvhdhs</button> -->
	</div>
</template>

<script>
import CryptoList from '@/components/cryptocurrenciesList';
import Chart from '@/components/Chart';
import chart from './components/Chart.vue';
export default {
	name: 'App',
	computed: {
		tableData() {
			return this.$store.getters.getTableData || {};
		},
		chartData() {
			// данные для графика
			return this.$store.getters.getData || [];
		},
		titleOfCurrency() {
			return this.$store.getters.GET_TITLE || '';
		},
	},
	watch: {
		titleOfCurrency: function(newValue, oldValue) {
			console.log(newValue);
		},
		chartData: function(val) {
			console.log('change data', val);
		},
	},
	components: {
		CryptoList,
		Chart,
	},
	beforeCreate() {
		// this.$store.dispatch('fetchChartData', 'BTC');
		this.$store.dispatch('fetchTableData');
	},
	mounted() {},
	methods: {},
};
</script>

<style>
* {
	margin: 0px;
	padding: 0px;
	text-align: center;
	/* background: rgb(150, 150, 150); */
}

.app {
	margin-top: 0px;
	margin-bottom: 30px;
}

#app {
	/* padding: 0px; */
	font-size: 16px;
	/* background: rgb(7, 7, 7); */
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	/* color: #2c3e50; */
	/* margin-top: 60px; */
}

.chart {
	margin-top: 20px;
}

.navBar {
	width: 100%;
	height: 30px;
	background: rgb(255, 255, 255);

	text-align: left;

	/* width: 80%; */
	/* width: 100%; */
	/* margin: 2em auto; */
	padding: 1em;
	box-shadow: 0 0 10px 5px rgba(221, 221, 221, 1);
}

.img {
	/* height: 50px; */
	padding-top: 3px;
	margin-left: 2%;
}
</style>
