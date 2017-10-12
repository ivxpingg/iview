<template>

</template>

<script>
    import Util from '../../../libs/util';
    export default {
        data() {
            return {
                pageNo: '1',                   //当前页数
                pageSize: ''
            }
        },
        methods: {
            getData() {
                Util.ajax({

                    method: 'get',
                    url: '/sys/employee/list',
                    data: {

                    }
                });
            }
        }
    }
</script>
<style lang="scss" type="stylesheet/scss" scoped>

</style>