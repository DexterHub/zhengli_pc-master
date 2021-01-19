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
            <el-tab-pane class="topbut" label="医生账号">
                <div class="loginmethod">
                    <a href="javascript:;" :class="{active:flag == 'yis'}" @click="flag = 'yis'">密码登录</a>
                    <a href="javascript:;" :class="{active:flag != 'yis'}" @click="flag = 'yanzhengma'">验证码登录</a>
                </div>
                <div :is="flag"></div>
            </el-tab-pane>
            <el-tab-pane :lazy="true" class="topbut" label="员工账号">
                <yg></yg>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    export default {
        components: {
            yis: () => import('./component/yis'),
            yg: () => import('./component/yg'),
            yanzhengma: () => import('./component/yanzhengma'),
        },
        data() {
            return {
                flag: 'yis',
            }
        },
        mounted() {
            // this.$refs.yzm.init();
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

    @media screen and (max-width: 1360px) {
        /deep/.el-checkbox__inner {
            border-radius: 5px;
            border: 1px solid #1175d2;
            width: 20px;
            height: 20px;
        }

    }
</style>
<style scoped lang="less">
    .loginmethod {
        margin-left: 120px;
        margin-bottom: 40px;

        a {
            text-decoration: none;
            color: #666;
            font-size: 16px;
            text-align: center;
            margin-right: 48px;
            padding: 0 2px 8px;
        }

        a:hover {
            color: #1a95eb;
        }

        .active {
            color: #1175d2;
            border-bottom: 2px solid #1175d2;
        }
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
        border: none !important;
    }

    /deep/.el-button--primary {
        border: none !important;
    }

    /deep/.el-tabs__content {
        padding-top: 80px !important;
    }

    /deep/.el-input {
        width: 470px !important;
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

        /deep/.el-input__inner {
            height: 50px !important;
            line-height: 50px !important;
            padding-left: 10px !important;

            &::placeholder {

                color: #999999 !important;
                font-size: 16px !important;
            }

            // &::-moz-placeholder {

            //     color: #999999 !important;
            //     font-size: 16px !important;
            // }
        }

    }

    /deep/.el-input__inner {
        height: 50px !important;
        line-height: 50px !important;
    }

    /deep/.el-button {
        padding: 10px 20px !important;
    }

    /deep/.el-button {
        font-size: 16px !important;
    }

    /deep/.el-checkbox-group {
        margin-left: 11px !important
    }

    /deep/.el-input__inner {
        padding-left: 10px !important;
    }

    /deep/.el-input__inner::placeholder {
        font-size: 16px !important;
    }

    /deep/.dn {
        display: none;
    }

    .login {
        // width: 100%;
        // min-width: 1280px;
        height: 100vh;
        overflow: hidden;
        position: relative;
        background: #565759;
    }

    /deep/#tab-0 {
        width: 150px;
        height: 50px;
        border: none;
        font-size: 16px;
        opacity: 0.5;
    }

    /deep/#tab-1 {
        width: 150px;
        height: 50px;
        border: none;
        font-size: 16px;
        opacity: 0.5;
    }

    /deep/.dlbgimg {
        height: 100%;
        display: block;
        margin-top: -80px;
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
        // height:487px;
        position: absolute;
        left: 50%;
        top: 54%;
        transform: translate(-50%, -50%);
    }

    /deep/.el-tabs__header {
        margin-bottom: 1px;
    }

    /deep/.el-tabs--card>.el-tabs__header {
        border: none;
    }

    /deep/.el-tabs--card>.el-tabs__header .el-tabs__nav {
        border: none;
    }

    /deep/.el-tabs__item {
        border: none;
        color: #666666;
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
        height: 480px;
        padding-top: 90px;
        box-sizing: border-box;
        background: rgba(255, 255, 255, 0.9);
    }

    /deep/.el-checkbox__input.is-checked .el-checkbox__inner,
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        color: #1175d2;
        background: #1175d2;
    }
</style>