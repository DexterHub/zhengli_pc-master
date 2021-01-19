<template>
    <div class="vcardRouter">
        <slot name="title">
            <p class="card-head">{{title}}</p>
             <div style="float:right;margin-right:4px;margin-top:-34px;">
				<slot name="title-right"></slot>
			</div>
        </slot>
        
        <div class="card-content">
            <p class="content-title" v-if="contentTitle">
                <span>{{contentTitle}}</span>
            </p>
            <slot name="content" >

            </slot>
        </div>

    </div>
</template>
<script>
    export default {
        name:"vcardRouter",
        props: {
            title:{
                require: false,
                type:String
            },
            contentTitle:{
                require: false,
                type:String
            }
        }
    }
</script>
<style lang="less" scoped>
    .vcardRouter{
        overflow: hidden;
        min-height: 288px;
        background: #f9f9f9;
        margin-bottom: 22px;
        padding-left: 20px;
    }
    .card-head{
        color:#1175d2;
        font-size: 16px;
        margin-left: 43px;
        margin-top:50px;
        margin-bottom: 40px;
    }
    .card-content{
          margin-left: 43px;
         font-size: 16px;
         overflow: hidden;
    }
</style>