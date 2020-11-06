<template>
    <div class="cryptoList">
        <CryptoItem
            v-for="price of tableData"
            :price="price"
            :key="price.id" 
        /> 


    </div>
</template>

<script>
import CryptoItem from '@/components/cryptocurrencyItem'
export default {
    components: {
        CryptoItem
    },
    props: ['tableData'],
}
</script>>

<style>
.cryptoList {
    margin-left: auto;
    margin-right: auto;
    padding: 10px;
    max-width: 70%;
    min-width: 40%;
    /* max-width: 90%; */
    background: #E7E7E7;
    align-content: center;
}
</style>