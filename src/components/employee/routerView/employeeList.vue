<template>
    <div class="employeeList-container">
        <vEmployeeList></vEmployeeList>
    </div>
</template>

<script>
    import vEmployeeList from '../list/list.vue';
    export default {
        data() {
            return {}
        },
        components: {vEmployeeList}
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .employeeList-container {
        min-width: 1440px;
        overflow: hidden;
    }
</style>