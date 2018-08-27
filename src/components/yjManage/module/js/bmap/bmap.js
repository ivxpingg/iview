import initBMap from './initBMap';
import { getData } from  './data';
import bAuth from './auth';
import metroStationName from './module/metroStationName';
import stationAndSection from './module/stationAndSection';
import BreakLine from './module/breakLine';
import BusInfo from './module/busInfo';

let vm;              // vueComponents 对象

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

                for(let i = 0; i < data[1].length; i++) {
                    if(data[3].stationSectionId === data[1][i].stationSectionId) {
                        vm.StationAndSection.hide();
                        vm.stationAndSectionItem = data[1][i];
                        vm.breakLine.setBreakLine(data[1][i]);
                        vm.busInfo.setBusInfo(data[1][i]);
                    }
                }
            }
        }).catch();
    });
}

export default bmap;