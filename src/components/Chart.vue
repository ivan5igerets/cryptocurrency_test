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
			return this.$store.getters.GET_TITLE || ''
		}
	},
	methods: {
		showChart: function() {
			const price = Object.keys(this.chartData) || null;
			const time = Object.values(this.chartData) || null;

			this.renderChart(
				{
					labels: time,
					datasets: [
						{
							label: this.getTitle,
							data: price,
							backgroundColor: [
								// 'rgba(255, 99, 132, 0.2)',
								'rgba(54, 162, 235, 0.2)',
								// 'rgba(255, 206, 86, 0.2)',
								// 'rgba(75, 192, 192, 0.2)',
								// 'rgba(153, 102, 255, 0.2)',
								// 'rgba(255, 159, 64, 0.2)'
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
			// console.log('new value', newValue);
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
	/* min-width: 40%; */
	/* max-height: 100px; */
	/* max-width: 90%; */
	background: #e7e7e7;
	align-content: center;
}
</style>
