<template>
    <div class="card">
        <slot name="title">
            <p class="card-head">{{title}}</p>
             <div style="float:right;margin-right:4px;margin-top:-20px;">
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
        name:"vcard",
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
    .card{
        overflow: hidden;
        background: #f4f4f4;
        margin-bottom: 32px;
        padding-bottom: 50px;
    }
    .card-head{
        color:#1175d2;
        font-size: 16px;
        margin-left: 44px;
        margin-top: 48px;
    }
    .card-content{
        margin-left: 43px;
         font-size: 16px;
         margin-top: 25px;
    }
</style>