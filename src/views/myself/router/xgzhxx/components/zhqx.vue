<template>
    <vcade title="账户权限">
        <div slot="content">
            <div class="fl left">
                <el-form ref="form" :model="form" label-width="160px" label-position="left">
                    <el-checkbox-group v-model="form.type" v-for="item in quanxiandata" :key="item.id" :class="'fl1'">
                        <el-checkbox :label="item.rightCode">{{item.saleName}}</el-checkbox>
                      
                    </el-checkbox-group>
                </el-form>
            </div>
            <div class="fl right">
                <p style="color:#333333; margin-bottom:20px;width:100%;">在你创建员工账户后，当员工登录相应账号时，能使用您授权给他们的权限功能</p>
                <p class="font" style="line-height:30px; width:100%;">
                    如果你选择为员工开通该权限，则表示你确认知晓正丽科技相关治疗系统是需要开具处方的，并且你给予权限的员工具备相关有效资格，可以为相关治疗开具处方，同时也能审阅修改3D设计方案等。
                </p>
            </div>

        </div>
    </vcade>
</template>

<script>
    import vcade from '../../../components/vcadeRouter'
    export default {
        components: {
            vcade,

        },
        props:['rights'],
        data() {
            return {
                quanxiandata: [],
                form: {
                    type: [],
                }
            }
        },
        created(){
            this.jurisdictionList();
            // console.log(this.rights)
            this.er()
        },
        filters: {

        },
        methods: {
            // 权限列表
            jurisdictionList() {
                this.$http({
                    url: "/staff/rightList",
                    method: "get",
                }).then(({
                    data
                }) => {
                    // console.log(data)
                    if (data.code == 200) {
                        this.quanxiandata = JSON.parse(data.data);
                        // console.log(this.quanxiandata)
                    } else {

                    }
                }).catch(err => {
                    console.log(err);
                });
            },
            //选中权限
            er(){
                var that = this;
                this.rights.forEach( (item,idx) => {
                    that.form.type.push(item.rightCode)
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    @media screen and (max-width: 1660px) {
        /deep/.el-checkbox__label {
            white-space: initial;
            // float: left;
        }

        /deep/.el-checkbox__input {
            float: left;
        }
    }
</style>
<style lang="less" scoped>
    .left {
        width: 45%;
        margin-right: 5%;
    }

    .right {
        width: 45%;
    }
    .fl1{
        float: left;
        width: 50%;
    }
    .el-checkbox {
        margin-top: 0;
        margin-bottom: 30px;
    }

    .vcardRouter {
        padding-bottom: 100px !important;
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

    /deep/ .el-checkbox__label {
        font-size: 16px;
        color: #333;
    }

    /deep/ .el-checkbox__input.is-checked+.el-checkbox__label {
        color: #333;
        //    font-weight: bold;
    }

    /deep/ .el-checkbox__inner {
        width: 20px;
        height: 20px;
        border-color: #1a95eb;

    }

    /deep/ .el-checkbox__inner::after {
        width: 7px;
        height: 10px;
        left: 5px;
    }
</style>