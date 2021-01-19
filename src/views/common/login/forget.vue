<template>
    <div class="login">
        <div class="topdhlg">
            <div class="logo">
                <div class="main">
                    <img class="lgimg" src="../../../assets/1顶部导航/切图_06.png">
                </div>
            </div>
        </div>
        <img class="dlbgimg" src="../../../assets/dlbg.png">
        <el-tabs type="card">
            <el-tab-pane label="忘记密码">
                <wjmm></wjmm>
            </el-tab-pane>
            <el-tab-pane label="忘记账号">
                <wjzh></wjzh>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    import wjmm from './component/wjmm'
    import wjzh from './component/wjzh'
    export default {

        components: {
            wjmm: wjmm,
            wjzh: wjzh,
        },
    }
</script>
<style lang="less" scoped>
    // 适配
    @media screen and (max-width: 1660px) {
        /deep/.el-form-item__content {
            // width: 470px* 0.9 !important;
        }

        /deep/.el-form-item__content {
            // width: 470px* 0.8 !important;
        }
    }
</style>
<style scoped lang="less">
    /deep/.el-button--primary {
        font-size: 16px;
    }

    // eeefef
    input::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #999999 !important;
        font-size: 16px !important;
    }

    input:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: #999999 !important;
        font-size: 16px !important;
    }

    input:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: #999999 !important;
        font-size: 16px !important;
    }

    /deep/.el-button {
        border: none !important;
    }

    /deep/.el-button--primary {
        border: none !important;
    }

    /deep/.el-input {
        height: 50px !important;
        line-height: 50px !important;

        /deep/.el-input__inner {
            height: 50px !important;
            line-height: 50px !important;
            padding-left: 10px !important;

            &::placeholder {
                color: #999999 !important;
                font-size: 16px !important;
            }

            // &::-moz-placeholder{
            //     color: #999999 !important;
            //     font-size: 16px !important;
            // }
        }

    }

    /deep/#tab-0 {
        width: 150px;
        height: 50px;
        border: none;
        font-size: 16px;
        opacity: 0.5;
        margin-bottom:1px;
    }

    /deep/#tab-1 {
        width: 150px;
        height: 50px;
        border: none;
        font-size: 16px;
        opacity: 0.5;
        margin-bottom:1px;
    }

    /deep/.dn {
        display: none;
    }

    .login {
        // width:100%;
        // height:100%;
        // min-width: 1280px;
        height: 100vh;
        overflow: hidden;
        position: relative;
        background: #565759;
    }

    /deep/.dlbgimg {
        height: 100%;
        display: block;
        margin-top: -80px;
    }

    /deep/.topdhlg {
        width: 100%;
        height: 80px;
        background: #353b43;
        position: relative;
        box-shadow: 0px 5px 20px #353b43;
    }

    /deep/.logo {
        height: 100%;
    }

    /deep/.lgimg {
        display: block;
        padding-top: 26px;
    }

    /deep/.el-tabs {
        width: 706px;
        // height:487px;
        position: absolute;
        left: 50%;
        top: 54%;
        transform: translate(-50%, -50%);
    }

    /deep/.el-tabs__header {
        margin-bottom: 0px;
    }

    /deep/.el-tabs--card>.el-tabs__header {
        border: none;
    }

    /deep/.el-tabs--card>.el-tabs__header .el-tabs__nav {
        border: none;
    }

    /deep/.el-tabs--card>.el-tabs__header .el-tabs__item {
        border: none;
    }

    /deep/.el-tabs__item {
        border-radius: 10px 10px 0 0;
        box-sizing: border-box;
        background: #f9f9f9;
        width: 150px;
        text-align: center;
        height: 50px;
        line-height: 51px;
    }

    /deep/.el-tabs__item.is-active {
        background: #1175d2;
        color: #fff;
        opacity: 1 !important;
    }

    /deep/.el-tabs__content {
        background: rgba(255, 255, 255, 0.9);
        height: 480px;
        box-sizing: border-box;
    }

    /deep/.el-form-item__content {
        width: 470px !important;
        margin-left: 120px;
    }
</style>