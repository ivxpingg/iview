import Util from '../../../../../libs/util';

/**
 * 获取角色列表
 * @returns {Promise}
 */
const getRolesList = () => {
    return new Promise((resolve, reject) => {
        Util.ajax({
            method: 'get',
            url: '/xm/sys/auth/getRoles?t=' + Math.random()
        }).then(function (response) {
            if (response.status === 1) {
                resolve(response.result.roleList);
            }
            else {
                reject(response);
            }
        });
    });
};

/**
 * 获取站点区段信息列表
 * @returns {Promise}
 */
const getStationSectionList = () => {
    return new Promise((resolve, reject) => {
        Util.ajax({
            method: 'get',
            url: '/xm/emerg/emergBaseData/getStationSectionList?t=' + Math.random()
        }).then(function (response) {
            if (response.status === 1) {
                resolve(response.result);
            }
            else {
                reject(response);
            }
        });
    });
};


/**
 * 获取承运公交信息
 * @returns {Promise}
 */
const getBusCompanyInfo = () => {
    return new Promise((resolve, reject) => {
        Util.ajax({
            method: 'get',
            url: '/xm/emerg/emergBaseData/getBusCompanyList'
        }).then(function (response) {
            if (response.status === 1) {
                resolve(response.result);
            }
            else {
                reject(response);
            }
        });
    });
};

/**
 * 获取当前设置的故障记录
 * @returns {Promise}
 */
export const getCurrentFaultRecord = () => {
    return new Promise((resolve, reject) => {
        Util.ajax({
            method: 'get',
            url: '/xm/emerg/faultRecord/getCurrentFaultRecord?t=' + Math.random()
        }).then(function (response) {
            if (response.status === 1) {
                resolve(response.result);
            }
            else {
                reject(response);
            }
        });
    });
};


/**
 * 根据影响的站点获取中断信息
 * @param sectionNo [String]  PS: 1-2,2-3
 * @returns {Promise}
 */
export const getInterruptSectionList = (sectionNo) => {
    return new Promise((resolve, reject) => {
        Util.ajax({
            method: 'get',
            url: '/xm/emerg/emergBaseData/getInterruptSectionList?t=' + Math.random(),
            params: {
                sectionNo: sectionNo
            }
        }).then(function (response) {
            if (response.status === 1) {
                resolve(response.result);
            }
            else {
                reject(response);
            }
        });
    });
}

/**
 * 根据影响的站点获取中断信息
 * @param sectionNo [String]  PS: 1-2,2-1,2-3,3-2
 * @returns {Promise}
 */
export const getBusSupportLineList = (sectionNo) => {
    return new Promise((resolve, reject) => {
        Util.ajax({
            method: 'get',
            url: '/xm/emerg/emergBaseData/getBusSupportLineList',
            params: {
                sectionNo: sectionNo
            }
        }).then(function (response) {
            if (response.status === 1) {
                resolve(response.result);
            }
            else {
                reject(response);
            }
        });
    });
}

/**
 * 根据影响的站点获取公交站牌
 * @param sectionNo [String]  PS: 1,2,3,4
 * @returns {Promise}
 */
export const getBusStopPositionList = (sectionNo) => {
    return new Promise((resolve, reject) => {
        Util.ajax({
            method: 'get',
            url: '/xm/emerg/emergBaseData/getBusStopPositionList?t=' + Math.random(),
            params: {
                sectionNo: sectionNo
            }
        }).then(function (response) {
            if (response.status === 1) {
                resolve(response.result);
            }
            else {
                reject(response);
            }
        });
    });
}
/**
 * 获取公交位置信息
 * @param faultRecordId  // 故障ID
 * @returns {Promise}
 */
export const getBusPosition = (faultRecordId) => {
    return new Promise((resolve, reject) => {
        Util.ajax({
            method: 'get',
            url: '/xm/emerg/busSupport/getBusPosition?t=' + Math.random(),
            params: {
                faultRecordId: faultRecordId
            }
        }).then(function (response) {
            if (response.status === 1) {
                resolve(response.result);
            }
            else {
                reject(response);
            }
        });
    });
}

/**
 * 获取接驳公交列表
 * @param faultRecordId  // 故障ID
 * @returns {Promise}
 */
export const getSupportBusList = (faultRecordId) => {
    return new Promise((resolve, reject) => {
        Util.ajax({
            method: 'get',
            url: '/xm/emerg/busSupport/supportBusList?t=' + Math.random(),
            params: {
                faultRecordId: faultRecordId
            }
        }).then(function (response) {
            if (response.status === 1) {
                resolve(response.result);
            }
            else {
                reject(response);
            }
        });
    });
}

/**
 * 获取必要的基础数据
 * @returns {Promise<[any]>}
 */
export const getData = () => {
    return Promise.all([
        getRolesList(),
        getStationSectionList(),
        getBusCompanyInfo(),
        getCurrentFaultRecord()
    ]);
};