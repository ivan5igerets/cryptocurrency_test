import Vue from 'vue';
import Vuex, { Store } from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({

    actions: {
        async fetchChartData(ctx, name) {
            const res = await fetch('https://min-api.cryptocompare.com/data/v2/histominute?fsym=' + name + '&tsym=USD&limit=60')
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
        SUBSCRIBE(context) {
            for(let coin of this.state.coinsList) {
                Vue.prototype.$socket.send(JSON.stringify({
                    "action": "SubAdd",
                    "subs": ["0~Coinbase~" + coin + "~USD"]
                }))
            }
        },

        // table methods
        async fetchTableData(ctx) {

             let coins = this.state.coinsList
             let opt = ''

             for(let coin of coins) {
                 opt += ',' + coin
             }
             

            const res = await fetch('https://min-api.cryptocompare.com/data/pricemulti?fsyms=' + opt + '&tsyms=USD')
            let data = await res.json()

            data = Object.entries(data)
            let processedData = []

            for (let i = 0; i < data.length; ++i) {
                let temp = Object.values(data[i])[1]

                processedData.push([Object.values(data[i])[0], Object.values(temp)[0], 0])
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
        },
        SOCKET_ONCLOSE(state, event) {
        },
        SOCKET_ONERROR(state, event) {
            console.error(state, event)
        },
        // default handler called for all methods
        SOCKET_ONMESSAGE(state, data) {
            data = JSON.parse(data['data'])
            data = Object.entries(data)

            if (data[0][1] == 0) {

                let fsym = data[2][1]
                let price = data[8][1]
                let time = data[6][1]

                if (state.title == fsym) {
                    console.log('добавление на график');
                
                    let a = new Date(time * 1000);
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
                    time = hour + ':' + min + ':' + sec;

                    state.data.shift()
                    state.data.push({ [price]: time })
                    // return
                }

                data = state.tableData

                for (let i = 0; i < data.length; ++i) { 

                    if (fsym == data[i][0]) {
                        let listItem = [fsym, price, (data[i][1]-price).toFixed(2)]

                        data[i] = listItem

                        Vue.set(state.tableData, data)
                        console.log('добавление в список');
                        return
                    }
                }
               
            }
        },

        // mutations for reconnect methods
        SOCKET_RECONNECT(state, count) {
            console.info(state, count)
            // нужно дописать подписку
            for(let coin of this.state.coinsList) {
                Vue.prototype.$socket.send(JSON.stringify({
                    "action": "SubAdd",
                    "subs": ["0~Coinbase~" + coin + "~USD"]
                }))
            }
        },
        SOCKET_RECONNECT_ERROR(state) {
            state.socket.reconnectError = true;
        },
        updateTableData(state, data) {
            state.tableData = data
        }
    },
    state: {
        title: 'нажмите на нужную валюту',
        data: [],
        tableData: [],
        coinsList: [
                'BTC',
                'ETH',
                'LTC',
                'DASH',
                'XRP',
                'YFI',
                'BCH',
                'UNI',
                'EOS',
                'TRX',
                'USDT',
                'ADA',
                'BSV',
                'BNB',
                'DOT'
            ]

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
            return state.tableData
        }
    }
})