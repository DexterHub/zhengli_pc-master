<template>
    <vcade title="账户权限">
        <div slot="content">
            <div class="fl left">
                <ul v-for="item in rights" :key="item.rightCode">
                    <li class="fl1">{{item.saleName}}</li>
                </ul>
            </div>
            <div class="fl right">
                <p class="font" style="line-height:30px; width:98%;">
                    如果你选择为员工开通该权限，则表示你确认知晓正丽科技相关治疗系统是需要开具处方的，并且你给予权限的员工具备相关有效资格，可以为相关治疗开具处方，同时也能审阅修改3D设计方案等。
                </p>
            </div>

        </div>
    </vcade>
</template>

<script>
    import {
        jsEncrypt
    } from '@/util/validate.js'
    import vcade from '../../../components/vcadeRouter'
    export default {
        props: ['rights'],
        components: {
            vcade,
        },
        data() {
            return {

            }
        },
        methods: {

        }
    }
</script>

<style lang="less" scoped>
    .left {
        width: 45%;
        margin-right: 5%;
    }

    .right {
        width: 45%;
    }

    .fl1 {
        float: left;
        width: 50%;
    }

    ul {
        li {
            margin-bottom: 30px;
            color: #333;
            font-size: 16px;

            span {
                margin-right: 15px;
            }
        }
    }

    .vcardRouter {
        padding-bottom: 105px !important;
    }

    .font::before {
        content: '**';
        color: #ff0000;
    }

    p {
        width: 598px;
        font-size: 16px;
        color: #8b8b8b;

    }
</style>