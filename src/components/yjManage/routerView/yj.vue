<template>
    <div class="yj-container">

        <vBMap class="bmap-panel"></vBMap>

        <Button class="btn-address-list" type="success" @click="onShowAddressList">通讯录</Button>

        <Modal title="公交应急接驳通讯联络表"
               class-name="modal-address-list1"
               v-model="showAddressList1"
               :transfer="false"
               width="900">
            <div class="searchPanel">
                <Form class="form" inline>
                    <FormItem label=""  :label-width="0">
                        <Input v-model="inputValue" placeholder="模糊检索单位、部门或者姓名" style="width: 210px"></Input>
                    </FormItem>
                    <FormItem  :label-width="10">
                        <Button type="success" @click="onSearch">查询</Button>
                    </FormItem>
                    <FormItem  :label-width="10">
                        <Button type="success" @click="onShoModal2">第一联络电话速览</Button>
                    </FormItem>
                </Form>
            </div>
            <vAddressList :searchValue="searchVal"></vAddressList>
            <div slot="footer"></div>
        </Modal>

        <Modal title="第一联络电话速览"
               class-name="modal-address-list2"
               v-model="showAddressList2"
               :transfer="false"
               width="600">
            <vAddressList2></vAddressList2>
            <div slot="footer"></div>
        </Modal>

    </div>
</template>
<script>
    import vAddressList from '../module/addressList.vue';
    import vAddressList2 from '../module/addressList2.vue';
    import vBMap from '../module/BMap.vue';
    export default {
        data() {
            return {
                searchVal: '',
                inputValue: '',
                showAddressList1: false,
                showAddressList2: false
            };
        },
        components: {vAddressList, vAddressList2, vBMap},
        methods: {
            onShowAddressList() {
                this.showAddressList1 = !this.showAddressList1;
            },
            onShoModal2() {
                this.showAddressList2 = !this.showAddressList2;
            },
            onSearch() {
                this.searchVal = this.inputValue;
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .yj-container {
        position: relative;
        width: 100%;
        height: 100%;

        .btn-address-list {
            position: absolute;
            top: 20px;
            left: 20px;
            z-index: 1;
        }

        .bmap-panel {
            width: 100%;
            height: 100%;
        }
    }
</style>
