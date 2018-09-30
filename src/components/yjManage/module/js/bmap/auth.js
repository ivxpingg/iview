/**
 *  应急管理系统根据角色获取操作权限
 */

import Util from '../../../../../libs/util';
import MOMENT from 'moment';
import { getCurrentFaultRecord } from  './data';
import BusSupport from "./module/busSupport";
class Auth {
    constructor(vueComponent, roleList) {
        this.vm = vueComponent;
        this.roleList = roleList;
    }
    /**
     * 根据角色判断是否有操作权限
     * 说明： 1、轨道公司和运管处可以设置故障信息，谁设置的故障只能谁去取消或者处置完成
     *       2、公交账号不能设置故障， 只能查看信息和调整公交接驳信息
     *       3、执法支队只能查看
     * 角色对应的ID：
     *               轨道公司： "METRO_GUIDAO"
     *               运管处：   "METRO_YUNGUANCHU"
     *               公交公司： "METRO_GONGJIAO"
     *               执法支队： "METRO_ZHIFAZHIDUI"
     * 操作类型：
     *               "0": 设置故障
     *               "1"：结束处置故障
     *               "2"：调整公交接驳
     * @param handle [String] 操作类型
     * @return [Boolean]
     */
    handleAuth(handle) {
        switch (handle) {
            case '0':
                return this.roleList.indexOf('METRO_GUIDAO') > -1 || this.roleList.indexOf('METRO_YUNGUANCHU') > -1;
            case '1':
                return this.roleList.indexOf('METRO_GUIDAO') > -1 || this.roleList.indexOf('METRO_YUNGUANCHU') > -1;
            case '2':
                return this.roleList.indexOf('METRO_GONGJIAO') > -1;
            default:
                return false;
        }
    }

    /**
     * 设置故障
     * @param point
     * @param client
     * @param target
     */
    setFault(point, client, target) {

        Util.ajax({
            method: 'post',
            url: '/xm/emerg/faultRecord/addFaultRecord',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            data: JSON.stringify({
                stationSectionId: target.itemInfo.stationSectionId,
                happenTime: MOMENT().format('YYYY-MM-DD')
            })
        }).then((response) => {
            if (response.status === 1) {
                this.vm.StationAndSection.hide();
                this.vm.stationAndSectionItem = target.itemInfo;
                this.vm.breakLine.setBreakLine(target.itemInfo);
                this.vm.busInfo.setBusInfo(target.itemInfo);

                getCurrentFaultRecord().then(data => {
                    this.vm.currentFaultRecord = Object.assign(this.vm.currentFaultRecord, data);
                });

            }
            else {
                this.vm.$Message.error({
                    content: response.errMsg
                });
            }
        });


    }

    /**
     * 取消故障
     */
    cancelFault() {
        Util.ajax({
            method: 'get',
            url: '/xm/emerg/faultRecord/updateFaultRecord',
            params: {
                faultStatus: 'Cancel'
            }
        }).then((response) => {
            if (response.status === 1) {
                this.vm.breakLine.hide(this.vm.stationAndSectionItem.sectionNo);
                this.vm.busInfo.hideBusLine(this.vm.stationAndSectionItem.sectionNo);
                this.vm.busInfo.hideBusSign(this.vm.stationAndSectionItem.sectionNo);
                this.vm.busInfo.hideBusCompany();
                this.vm.StationAndSection.show();
                this.vm.busSupport.clear();
                this.vm.breakImgShow = false;
                this.vm.currentFaultRecord.faultRecordId = '';
            }
            else {
                this.vm.$Message.error({
                    content: response.errMsg
                });
            }
        });
    }
    /**
     * 故障处置完成
     */
    finishFault() {
        Util.ajax({
            method: 'get',
            url: '/xm/emerg/faultRecord/updateFaultRecord',
            params: {
                faultStatus: 'Complete'
            }
        }).then((response) => {
            if (response.status === 1) {
                this.vm.breakLine.hide(this.vm.stationAndSectionItem.sectionNo);
                this.vm.busInfo.hideBusLine(this.vm.stationAndSectionItem.sectionNo);
                this.vm.busInfo.hideBusSign(this.vm.stationAndSectionItem.sectionNo);
                this.vm.busInfo.hideBusCompany();
                this.vm.StationAndSection.show();
                this.vm.busSupport.clear();
                this.vm.breakImgShow = false;
                this.vm.currentFaultRecord.faultRecordId = '';
            }
            else {
                this.vm.$Message.error({
                    content: response.errMsg
                });
            }
        });
    }


}

export default Auth;