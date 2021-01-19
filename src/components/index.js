import Vue from 'vue'



import commonHead from './commomHead.vue'




export default {
    async install (Vue, options) {
        Vue.component('commonHead', commonHead);
    }
}