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
            <el-tab-pane label="注册医生账号">
                <zcys></zcys>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import zcys from './component/zcys'
    export default {
        data() {
            return {

            }
        },
        components: {
            zcys: zcys,
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
      // 适配
    @media screen and (min-height: 1220px) {
        /deep/.dlbgimg {
            min-height: 100vh !important;
        }
    }
</style>
<style scoped lang="less">
    .ooo::after {
        content: '*';
        font-size: 16px;
        color: #ff0000;
        font-weight: 900;
        position: absolute;
        left: 96px;
        top: 9px;
    }

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
        font-size: 16px !important;
        border: none !important;
    }

    /deep/.el-input {
        height: 50px !important;
        line-height: 50px !important;

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

        .el-input__inner {
            height: 50px !important;
            line-height: 38px !important;
            padding-left: 10px !important;

            &::placeholder {

                color: #999999 !important;
                font-size: 16px !important;
            }

            //  &::-moz-placeholder {
            //     color: #999999 !important;
            //     font-size: 16px !important;
            // }
        }

    }

    .login {
        overflow: hidden;
        width: 100%;
        min-height:100vh;
        position: relative;
        background: #565759;
    }

    /deep/.dlbgimg {
        min-width: 100vw;
        display: block;
        // position: absolute;
        // left:0px;
        // top:80px;
        min-height: 1200px;
        margin-top: -90px;
    }

    /deep/.lgimg {
        display: block;
        padding-top: 26px;
    }

    /deep/.topdhlg {
        width: 100%;
        height: 80px;
        background: #353b43;
        position: relative;
        box-shadow: 0px 5px 20px #353b43;
        z-index: 9;
    }

    /deep/.logo {
        height: 100%;
        // position: absolute;
        // top:50%;
        // left:100px;
        // transform: translateY(-50%);
    }

    /deep/.el-tabs {
        width: 706px;
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
        width: 100%;
    }

    /deep/.el-tabs--card>.el-tabs__header .el-tabs__item {
        border: none;
    }

    /deep/.el-form-item {
        margin-bottom: 35px;
    }

    /deep/.el-tabs__item {
        border-radius: 10px 10px 0 0;
        box-sizing: border-box;
        background: #f9f9f9;
        width: 150px;
        text-align: center;
        height: 50px;
        line-height: 51px;
        margin-bottom: 1px;
    }

    /deep/.el-tabs__item.is-active {
        width: 100%;
        background: #1175d2;
        color: #fff;
        opacity: 1 !important;
        text-align: left;
    }

    /deep/.el-tabs__content {
        background: rgba(255, 255, 255, 0.9);
        // height: 870px;
        // height:488px;
        // padding-top: 100px;
        // box-sizing: border-box;
    }

    /deep/.el-form-item__content {
        width: 470px !important;
        margin-left: 120px;
    }

    /deep/.el-tabs__item {
        width: 170px;
        height: 50px;
        border: none;
        font-size: 16px;
    }
</style>