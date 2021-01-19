<template>

    <div class="xgmm main">
        <ygxx :name="name" @changeUrl="changeUrl" :account="account" :password="password" :staffId="staffId"></ygxx>
        <zhqx :rights="rights"></zhqx>
    </div>

</template>
<script>
    import ygxx from './components/ygxx'
    import zhqx from './components/zhqx'
    export default {
        data() {
            return {
                staffId: '',
                name: '',
                account: '',
                password: '',
                rights: '',
            };
        },
        components: {
            ygxx,
            zhqx
        },
        created() {
            this.staffId = this.$store.state.staffId;
            this.staffDEtail();
        },
        methods: {
            staffDEtail() {
                this.$http({
                    url: "/staff/findStaff",
                    method: "get",
                    params: {
                        staffId: Number(this.staffId),
                    }
                }).then(({
                    data
                }) => {
                    // console.log(JSON.parse(data.data))
                    // console.log(555)
                    if (data.code == 200) {
                        const koko = JSON.parse(data.data)
                        // console.log(koko)
                        this.name = koko.name;
                        this.account = koko.accountNumber;
                        this.password = koko.password;
                        this.rights = koko.rights
                    } else {

                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            changeUrl() {
                this.$router.push({
                    name: '修改账户信息',
                    params: {
                        name:this.name,
                        account:this.account,
                        password:this.password,
                        rights:this.rights
                    }
                });
            }
        },

    };
</script>
<style scoped lang="less">

</style>