<template>
	<div id="app" class="app">
		<div class="navBar">
			<img class="img" src="@/assets/JPEG24.jpg" alt="" srcset="" />
		</div>

		<Chart class="chart" v-bind:chartData="chartData" />

		<CryptoList v-bind:tableData="tableData" />

	</div>
</template>

<script>
import CryptoList from '@/components/cryptocurrenciesList';
import Chart from '@/components/Chart';
import chart from './components/Chart.vue';
export default {
	name: 'App',
	data() {
		return {
			tableData: this.getTableData
		}
	},
	computed: {
		getTableData() {
			return this.$store.getters.getTableData || {};
		},
		chartData() {
			return this.$store.getters.getData || [];
		},
		titleOfCurrency() {
			return this.$store.getters.GET_TITLE || '';
		},
	},
	watch: {
		getTableData: function(newValue, oldValue) {
			this.tableData = this.getTableData
		},
		chartData: function(val) {
			// console.log('change data', val);
		},
	},
	components: {
		CryptoList,
		Chart,
	},
	beforeCreate() {
		this.$store.dispatch('fetchTableData');
	},
	mounted() {
		setTimeout(() => {
			this.$store.dispatch('SUBSCRIBE')
		}, 500);
	},
	methods: {
		click() {
			console.log(this.tableData);
		},
	},
};
</script>

<style>
* {
	margin: 0px;
	padding: 0px;
	text-align: center;
}

.app {
	margin-top: 0px;
	margin-bottom: 30px;
}

#app {
	font-size: 16px;
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

.chart {
	margin-top: 20px;
}

.navBar {
	width: 100%;
	height: 30px;
	background: rgb(255, 255, 255);
	text-align: left;
	padding: 1em;
	box-shadow: 0 0 10px 5px rgba(221, 221, 221, 1);
}

.img {
	padding-top: 3px;
	margin-left: 2%;
}
</style>
