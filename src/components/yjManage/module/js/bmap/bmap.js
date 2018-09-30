import initBMap from './initBMap';
import { getData, getCurrentFaultRecord } from  './data';
import bAuth from './auth';
import metroStationName from './module/metroStationName';
import stationAndSection from './module/stationAndSection';
import BreakLine from './module/breakLine';
import BusInfo from './module/busInfo';
import BusSupport from './module/busSupport';

let vm;              // vueComponents 对象

// 判断是否故障取消
const ifFaultComplete = () => {
    getCurrentFaultRecord().then(data => {

        if (vm.currentFaultRecord.faultRecordId && data === '') {

            vm.$router.go(0);
        }
        else if (!vm.currentFaultRecord.faultRecordId && data!== '') {
            vm.$router.go(0);
        }
        else {
            setTimeout(() => {
                ifFaultComplete();
            }, 20000);
        }
    });
};

const bmap = (v) => {
    vm = v;

    vm.breakLine = new BreakLine(vm);
    vm.busInfo = new BusInfo(vm);

    initBMap('bmap').then(function (m) {
        vm.map = m;
        getData().then(function (data) {
            vm.Auth = new bAuth(vm, data[0]);
            metroStationName(vm.map, data[1]);
            vm.StationAndSection = new stationAndSection(vm, data[1]);
            vm.StationAndSection.setStationAndSection();
            vm.busCompanyInfo = data[2];

            if (data[3] && data[3].faultStatus === 'InFault') {

                vm.currentFaultRecord = Object.assign(vm.currentFaultRecord, data[3]);

                for(let i = 0; i < data[1].length; i++) {
                    if(data[3].stationSectionId === data[1][i].stationSectionId) {
                        vm.StationAndSection.hide();
                        vm.stationAndSectionItem = data[1][i];
                        vm.breakLine.setBreakLine(data[1][i]);
                        vm.busInfo.setBusInfo(data[1][i]);

                        //
                        vm.busSupport = new BusSupport(vm, data[3].faultRecordId);
                        vm.busSupport.setBusSupport();
                        vm.setInterval_busPosition = setInterval(() => {
                            vm.busSupport.setBusSupport();
                        }, 20000);

                    }
                }

                ifFaultComplete();
            }
            else {
                ifFaultComplete();
            }
        }).catch();
    });
}

export default bmap;