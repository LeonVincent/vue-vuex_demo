<template>
    <div class="main">
        <div class="content">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="USDT" name="usdt">USDT</el-tab-pane>
                <el-tab-pane label="BTC" name="btc">BTC</el-tab-pane>
                <el-tab-pane label="ETH" name="eth">ETH</el-tab-pane>
                <el-tab-pane label="TRX" name="trx">TRX</el-tab-pane>
            </el-tabs>
            <div>
                <span>icon</span>
                参考价：7.00CNY／USDT
            </div>
        </div>
        <div>
            <div>
                <span>一键购买</span>
            </div>
            <div>
                <span>购买记录</span><span class="pot"></span>
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    name: 'index',
    data() {
        return {
            activeName: 'usdt'
        };
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
}
</script>
<style lang="less" scoped>
.main{
    font-size: .16rem;
    .content{
        position: relative;
        >div:nth-child(2) {
            position: absolute;
            right: 0;
            top: 8px;
        }

    }
    >div:nth-child(2) {
        >div:nth-child(1) {
            background: linear-gradient(95deg, #00d1d8, #355ef9);
            height: 52px;
            line-height: 52px;
            text-align: center;
            color: #fafafa;
            font-size: .16rem;
            border-radius: 4px;
        }
        >div:nth-child(2) {
            margin: 10px 0 0 0;
            color: #00cdd4;
            font-size: .16rem;
            text-align: center;
            text-decoration: underline;
            span:nth-child(2) {
                display: inline-block;
                width: 8px;
                height: 8px;
                background: #f00;
                border-radius: 50%;
                margin-bottom: 8px;
            }
        }
    }
}
</style>


