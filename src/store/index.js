import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({


    actions: {
        async fetchChartData(ctx, name) {
            const res = await fetch('https://min-api.cryptocompare.com/data/v2/histominute?fsym=' + name + '&tsym=USD&limit=6')
            let crypt = await res.json()

            crypt = Object.entries(crypt)[5][1].Data

            let data = [];

            for (let i = 0; i < crypt.length - 1; ++i) {

                let a = new Date(crypt[i].time * 1000);
                let hour = a.getHours();
                let min = a.getMinutes();
                let sec = a.getSeconds();

                if (hour < 10) {
                    hour = '0' + hour
                }

                if (min < 10) {
                    min = '0' + min
                }

                if (sec < 10) {
                    sec = '0' + sec
                }
                let time = hour + ':' + min + ':' + sec;

                data.push({ [crypt[i].open]: time });
            }

            // this.title = name
            ctx.commit('UPDATE_TITLE', name)

            this.data = data
            ctx.commit('updateOnChart', data)
        },
        SUBSCRIBE(context, msg) {
            Vue.prototype.$socket.send(JSON.stringify({
                "action": "SubAdd",
                "subs": ["0~Coinbase~" + msg + "~USD"]
            }))
        },
        ON_MSG(ctx, msg) {

            console.log('action ON_MSG', msg);
            ctx.commit('ADD_TO_ARRAY', msg)

        },

        // table methods
        async fetchTableData(ctx) {
            const res = await fetch('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,XRP,BCH,LTC,XLM,ADA,MIOTA,NEO,XMR&tsyms=USD')
            let data = await res.json()

            data = Object.entries(data)
            let processedData = new Map();

            for (let i = 0; i < data.length; ++i) {
                let temp = Object.values(data[i])[1]

                processedData.set(
                    Object.values(data[i])[0],
                    Object.values(temp)[0])
            }

            this.tableData = processedData
            ctx.commit('updateTableData', processedData)
        }
    },
    mutations: {
        updateOnChart(state, data) {
            state.data = data
            console.log('mutations chart data');
        },
        UPDATE_TITLE(state, title) {
            state.title = title
            console.log('mutations chart chart');
        },

        // table methods
        SOCKET_ONOPEN(state, event) {
            Vue.prototype.$socket = event.currentTarget
            // state.socket.isConnected = true
        },
        SOCKET_ONCLOSE(state, event) {
            // state.socket.isConnected = false
        },
        SOCKET_ONERROR(state, event) {
            console.error(state, event)
        },
        // default handler called for all methods
        SOCKET_ONMESSAGE(state, data) {
            // нужно добавлять последний обьект (посделнюю цену и время)
            data = JSON.parse(data['data'])
            data = Object.entries(data)

            if (data[0][1] == 0) {

                let price = data[8][1]
                let time = data[6][1]

                data = state.data
                // console.log('SOCKET_ONMESSAGE', price, time)

                data = [price, time]


                this.dispatch('ON_MSG', data);

                // mutations.commit()

                // this.updateOnChart(state, data)

                // state.data = data

                // console.log(state.data)
            }

        },


        ADD_TO_ARRAY(state, data) {
            console.log('ADD_TO_ARRAY', data[0], data[1]);

            let a = new Date(data[1] * 1000);
            let hour = a.getHours();
            let min = a.getMinutes();
            let sec = a.getSeconds();

            if (hour < 10) {
                hour = '0' + hour
            }

            if (min < 10) {
                min = '0' + min
            }

            if (sec < 10) {
                sec = '0' + sec
            }
            let time = hour + ':' + min + ':' + sec;

            state.data.push({ [data[0]]: time })
        },


        // mutations for reconnect methods
        SOCKET_RECONNECT(state, count) {
            console.info(state, count)
        },
        SOCKET_RECONNECT_ERROR(state) {
            state.socket.reconnectError = true;
        },
        updateTableData(state, data) {
            state.tableData = data
            // console.log('mutations table');
        }
    },
    state: {
        title: 'нажмите на нужную валюту',
        data: [],
        tableData: []
    },
    getters: {
        getData(state) {
            return state.data
        },
        GET_TITLE(state) {
            return state.title
        },

        // table data
        getTableData(state) {
            // console.log('getter table');
            return state.tableData
        }
    }
})