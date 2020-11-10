<template>
	<div class="chart">
		<canvas ref="canvas"></canvas>
		<br />
		<br />
		<hr />
		<br />
	</div>
</template>

<script>
import { Line } from 'vue-chartjs';

let chart = {
	extends: Line,
	props: ['chartData'],
	computed: {
		getTitle() {
			return this.$store.getters.GET_TITLE || '';
		},
	},
	methods: {
		showChart: function() {
			const price = this.chartData.reduce((acc, cur) => [...acc, ...Object.keys(cur)], []) || null;
			const time = this.chartData.reduce((acc, cur) => [...acc, ...Object.values(cur)], []) || null;

			this.renderChart(
				{
					labels: time,
					datasets: [
						{
							label: this.getTitle,
							data: price,
							backgroundColor: [
								'rgba(54, 162, 235, 0.2)',
							],
							borderColor: 'rgba(255, 99, 132, 1)',
							borderWidth: 1,
						},
					],
				},
				{
					scales: {
						yAxes: [
							{
								ticks: {
									beginAtZero: true,
								},
							},
						],
					},
				}
			);
		},
	},
	mounted() {
		this.showChart();
	},
	watch: {
		chartData: function(newValue, oldValue) {
			this.showChart();
		},
	},
};

export default chart;
</script>

<style>
.chart {
	max-width: 70%;
	margin-left: auto;
	margin-right: auto;
	padding: 10px;
	background: #e7e7e7;
	align-content: center;
}
</style>
