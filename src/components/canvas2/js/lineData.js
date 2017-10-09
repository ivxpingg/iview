/**
 *  轨道一号线地图数据
 *  stationList： canvas坐标信息，目前有3个类型，包含站点信息、站点与站定之间的线路信息、站点与站点之间上行和下行的坐标信息
 *  stationList: [{
 *      isStation: boolean // 表示是否是站点
 *      onTheWay：boolean  // 表示站点与站点之间列车停靠位置。
 *      isCorner：boolean  // 表示站点与站点之间的连接点
 *  }]
 */

export default {
    id: 1,
    name: '1号线',
    stationList: [
        {
            station_ID: 10,
            station_Name: '镇海路',
            rotate: 0,
            isStation: true,
            zPoint: { x: 1171, y: 1394 },    //
            tPoint: { x: 1191, y: 1394 },    // 站点名称位置
            sPoint: { x: 1176, y: 1399 },    // 上行运行点
            xPoint: { x: 1166, y: 1389 },    // 下行运行点

            sServerPoint: { x: 1176 + 10, y: 1399 },  // 上行服务号文本位置
            xServerPoint: { x: 1166 - 60, y: 1389 - 12 }   // 下行服务好文本位置
        },
        {
            station_ID: 10,
            station_Name: '镇海路~中山公园',
            isStation: false,
            onTheWay: true,  // 列车在站1371与站之间展示的位置
            sPoint: { x: 1201.5, y: 1375.5 },
            xPoint: { x: 1190.5, y: 1366.5 },
            sServerPoint: { x: 1201.5 + 10, y: 1375.5 },
            xServerPoint: { x: 1190.5 - 60, y: 1366.5 - 12 },

        },
        {
            station_ID: 20,
            station_Name: '中山公园',
            rotate: 0,
            isStation: true,
            zPoint: { x: 1220, y: 1349 },
            tPoint: { x: 1240, y: 1349 },
            sPoint: { x: 1225, y: 1354 },
            xPoint: { x: 1215, y: 1344 },
            sServerPoint: { x: 1225 + 10, y: 1354 },
            xServerPoint: { x: 1215 - 60, y: 1344 - 12 }
        },
        {
            station_ID: 20,
            station_Name: '中山公园~将军祠',
            rotate: 0,
            isStation: false,
            onTheWay: true,
            sPoint: { x: 1245.5, y: 1334.5 },
            xPoint: { x: 1235, y: 1324 },
            sServerPoint: { x: 1245.5 + 10, y: 1334.5 },
            xServerPoint: { x: 1235 - 60, y: 1324 - 12 }
        },
        {
            station_ID: 30,
            station_Name: '将军祠',
            rotate: 0,
            isStation: true,
            zPoint: { x: 1260, y: 1311 },
            tPoint: { x: 1280, y: 1311 },
            sPoint: { x: 1265, y: 1316 },
            xPoint: { x: 1255, y: 1306 },
            sServerPoint: { x: 1265 + 10, y: 1316 },
            xServerPoint: { x: 1255 - 60, y: 1306 - 12 }
        },
        {
            station_ID: 30,
            station_Name: '将军祠~文灶站',
            rotate: 0,
            isStation: false,
            onTheWay: true,
            sPoint: { x: 1279, y: 1301 },
            xPoint: { x: 1269, y: 1291 },
            sServerPoint: { x: 1279 + 10, y: 1301 },
            xServerPoint: { x: 1269 - 60, y: 1291 - 12 }
        },
        {
            station_ID: 40,
            station_Name: '文灶站',
            rotate: 0,
            isStation: true,
            zPoint: { x: 1290, y: 1281 },
            tPoint: { x: 1310, y: 1281 },
            sPoint: { x: 1295, y: 1286 },
            xPoint: { x: 1285, y: 1276 },
            sServerPoint: { x: 1295 + 10, y: 1286 },
            xServerPoint: { x: 1285 - 60, y: 1276 - 12 }
        },
        {
            station_ID: 40,
            station_Name: '文灶站~湖滨东路站',
            rotate: 0,
            isStation: false,
            onTheWay: true,
            sPoint: { x: 1312, y: 1269 },
            xPoint: { x: 1302, y: 1258 },
            sServerPoint: { x: 1312 + 10, y: 1269 },
            xServerPoint: { x: 1302 - 60, y: 1258 - 12 }
        },
        {
            station_ID: 50,
            station_Name: '湖滨东路站',
            rotate: 0,
            isStation: true,
            zPoint: { x: 1326, y: 1246 },
            tPoint: { x: 1346, y: 1246 },
            sPoint: { x: 1331, y: 1251 },
            xPoint: { x: 1321, y: 1241 },
            sServerPoint: { x: 1331 + 10, y: 1251 },
            xServerPoint: { x: 1321 - 60, y: 1241  - 12}
        },
        {
            station_ID: 50,
            station_Name: '湖滨东路站~莲坂站',
            rotate: 0,
            isStation: false,
            onTheWay: true,
            sPoint: { x: 1349, y: 1233 },
            xPoint: { x: 1339, y: 1223 },
            sServerPoint: { x: 1349 + 10, y: 1233 },
            xServerPoint: { x: 1339 - 60, y: 1223 - 12 }
        },
        {
            station_ID: 60,
            station_Name: '莲坂站',
            rotate: 0,
            isStation: true,
            zPoint: { x: 1364, y: 1210 },
            tPoint: { x: 1384, y: 1210 },
            sPoint: { x: 1369, y: 1215 },
            xPoint: { x: 1359, y: 1205 },
            sServerPoint: { x: 1369 + 10, y: 1215 },
            xServerPoint: { x: 1359 - 60, y: 1205 - 12 }
        },
        {
            station_ID: 60,
            station_Name: '莲坂站~莲花路口站',
            rotate: 0,
            isStation: false,
            onTheWay: true,
            sPoint: { x: 1385, y: 1195 },
            xPoint: { x: 1375, y: 1184 },
            sServerPoint: { x: 1385 + 10, y: 1195 },
            xServerPoint: { x: 1375 - 60, y: 1184 - 12 }
        },
        {
            station_ID: 70,
            station_Name: '莲花路口站',
            rotate: 0,
            isStation: true,
            zPoint: { x: 1398, y: 1170 },
            tPoint: { x: 1418, y: 1170 },
            sPoint: { x: 1403, y: 1175 },
            xPoint: { x: 1393, y: 1165 },
            sServerPoint: { x: 1403 + 10, y: 1175 },
            xServerPoint: { x: 1393 - 60, y: 1165 - 12 }
        },
        {
            station_ID: 70,
            station_Name: '莲花路口站~吕厝站',
            rotate: 0,
            isStation: false,
            onTheWay: true,
            sPoint: { x: 1413, y: 1155 },
            xPoint: { x: 1399, y: 1150 },
            sServerPoint: { x: 1413 + 10, y: 1155 },
            xServerPoint: { x: 1399 - 60, y: 1150 - 12 }
        },
        {
            station_ID: 80,
            station_Name: '吕厝站',
            rotate: 0,
            isStation: true,
            zPoint: { x: 1414, y: 1138 },
            tPoint: { x: 1434, y: 1138 },
            sPoint: { x: 1421, y: 1140 },
            xPoint: { x: 1407, y: 1136 },
            sServerPoint: { x: 1421 + 10, y: 1140 - 7 },
            xServerPoint: { x: 1407 - 60, y: 1136 - 7 }
        },
        {
            station_ID: 80,
            station_Name: '吕厝站~乌石浦站',
            rotate: 0,
            isStation: false,
            onTheWay: true,
            sPoint: { x: 1421, y: 1096 },
            xPoint: { x: 1406, y: 1096 },
            sServerPoint: { x: 1421 + 10, y: 1096 - 7 },
            xServerPoint: { x: 1406 - 60, y: 1096 - 7 }
        },
        {
            station_ID: 90,
            station_Name: '乌石浦站',
            rotate: 0,
            isStation: true,
            zPoint: { x: 1414, y: 1061 },
            tPoint: { x: 1434, y: 1061 },
            sPoint: { x: 1421, y: 1061 },
            xPoint: { x: 1407, y: 1061 },
            sServerPoint: { x: 1421 + 10, y: 1061 - 7 },
            xServerPoint: { x: 1407 - 60, y: 1061 - 7 }
        },
        {
            station_ID: 90,
            station_Name: '乌石浦站~塘边站',
            rotate: 0,
            isStation: false,
            onTheWay: true,
            sPoint: { x: 1421, y: 1027 },
            xPoint: { x: 1406, y: 1027 },
            sServerPoint: { x: 1421 + 10, y: 1027 - 7 },
            xServerPoint: { x: 1406 - 60, y: 1027 - 7 }
        },
        {
            station_ID: 100,
            station_Name: '塘边站',
            rotate: 0,
            isStation: true,
            zPoint: { x: 1414, y: 991 },
            tPoint: { x: 1434, y: 991 },
            sPoint: { x: 1421, y: 991 },
            xPoint: { x: 1407, y: 991 },
            sServerPoint: { x: 1421 + 10, y: 991 - 7 },
            xServerPoint: { x: 1407 - 60, y: 991 - 7 }
        },
        {
            station_ID: 100,
            station_Name: '塘边站~火炬园站',
            rotate: 0,
            isStation: false,
            onTheWay: true,
            sPoint: { x: 1421, y: 950 },
            xPoint: { x: 1406, y: 950 },
            sServerPoint: { x: 1421 + 10, y: 950 - 7 },
            xServerPoint: { x: 1406 - 60, y: 950 - 7 }
        },
        {
            station_ID: 110,
            station_Name: '火炬园站',
            rotate: 0,
            isStation: true,
            zPoint: { x: 1414, y: 910 },
            tPoint: { x: 1434, y: 910 },
            sPoint: { x: 1421, y: 910 },
            xPoint: { x: 1407, y: 910 },
            sServerPoint: { x: 1421 + 10, y: 910 - 7 },
            xServerPoint: { x: 1407 - 60, y: 910 - 7 }
        },
        {
            station_ID: 110,
            station_Name: '火炬园站~殿前站',
            rotate: 0,
            isStation: false,
            onTheWay: true,
            sPoint: { x: 1421, y: 886 },
            xPoint: { x: 1406, y: 886 },
            sServerPoint: { x: 1421 + 10, y: 886 - 7 },
            xServerPoint: { x: 1406 - 60, y: 886 }
        },
        {
            station_ID: 121,
            station_Name: '',
            isStation: false,
            isCorner: true,
            zPoint: { x: 1414, y: 882 },
            tPoint: { x: 1414, y: 882 },
            sPoint: { x: 1421, y: 879 },
            xPoint: { x: 1407, y: 885 },
            sServerPoint: { x: 1421, y: 879 },
            xServerPoint: { x: 1407, y: 885 }
        },
        {
            station_ID: 120,
            station_Name: '殿前站',
            rotate: 0,
            isStation: true,
            zPoint: { x: 1401, y: 866 },
            tPoint: { x: 1421, y: 846 },
            sPoint: { x: 1406, y: 861 },
            xPoint: { x: 1396, y: 871 },
            sServerPoint: { x: 1406 + 10, y: 861 - 7 },
            xServerPoint: { x: 1396 - 60, y: 871 }
        },
        {
            station_ID: 120,
            station_Name: '殿前站~高崎站',
            rotate: 0,
            isStation: false,
            onTheWay: true,
            sPoint: { x: 1386, y: 842 },
            xPoint: { x: 1375, y: 851 },
            sServerPoint: { x: 1386 + 10, y: 842 - 7 },
            xServerPoint: { x: 1375 - 60, y: 851 }
        },
        {
            station_ID: 130,
            station_Name: '高崎站',
            rotate: 0,
            isStation: true,
            zPoint: { x: 1360, y: 827 },
            tPoint: { x: 1380, y: 807 },
            sPoint: { x: 1365, y: 822 },
            xPoint: { x: 1355, y: 832 },
            sServerPoint: { x: 1365 + 10, y: 822 - 7 },
            xServerPoint: { x: 1355 - 60, y: 832 }
        },
        {
            station_ID: 130,
            station_Name: '高崎站~集美学村站',
            rotate: 0,
            isStation: false,
            onTheWay: true,
            sPoint: { x: 1290, y: 758 },
            xPoint: { x: 1279, y: 768 },
            sServerPoint: { x: 1290 + 10, y: 758 - 7 },
            xServerPoint: { x: 1279 - 60, y: 768 }
        },
        {
            station_ID: 140,
            station_Name: '集美学村站',
            rotate: 0,
            isStation: true,
            zPoint: { x: 1212, y: 702 },
            tPoint: { x: 1232, y: 682 },
            sPoint: { x: 1217, y: 697 },
            xPoint: { x: 1207, y: 707 },
            sServerPoint: { x: 1217 + 10, y: 697 - 7 },
            xServerPoint: { x: 1207 - 60, y: 707 }
        },
        {
            station_ID: 140,
            station_Name: '集美学村站~园博苑站',
            rotate: 0,
            isStation: false,
            onTheWay: true,
            sPoint: { x: 1166, y: 652 },
            xPoint: { x: 1159, y: 666 },
            sServerPoint: { x: 1166 + 10, y: 652 - 7 },
            xServerPoint: { x: 1159 - 60, y: 666 }
        },
        {
            station_ID: 141,
            station_Name: '',
            isStation: false,
            isCorner: true,       //  站点与站点之间的拐角
            zPoint: { x: 1155, y: 653 },
            tPoint: { x: 1155, y: 653 },
            sPoint: { x: 1159, y: 646 },
            xPoint: { x: 1151, y: 660 },
            sServerPoint: { x: 1159, y: 646 },
            xServerPoint: { x: 1151, y: 660 }

        },
        {
            station_ID: 150,
            station_Name: '园博苑站',
            rotate: 0,
            isStation: true,

            zPoint: { x: 1115, y: 653 },
            tPoint: { x: 1115, y: 613 },
            sPoint: { x: 1115, y: 646 },
            xPoint: { x: 1115, y: 660 },
            sServerPoint: { x: 1115 - 25, y: 646 - 24 },
            xServerPoint: { x: 1115 - 25, y: 660 + 10 }
        },
        {
            station_ID: 150,
            station_Name: '园博苑站~杏林村站',
            rotate: 0,
            isStation: false,
            onTheWay: true,
            sPoint: { x: 1060, y: 645 },
            xPoint: { x: 1060, y: 660 },
            sServerPoint: { x: 1060 - 25, y: 645 - 24 },
            xServerPoint: { x: 1060 - 25, y: 660 + 10 }
        },
        {
            station_ID: 160,
            station_Name: '杏林村站',
            rotate: 0,
            isStation: true,
            zPoint: { x: 1002, y: 653 },
            tPoint: { x: 1002, y: 613 },
            sPoint: { x: 1002, y: 646 },
            xPoint: { x: 1002, y: 660 },
            sServerPoint: { x: 1002 - 25, y: 646 - 24 },
            xServerPoint: { x: 1002 - 25, y: 660 + 10}
        },
        {
            station_ID: 160,
            station_Name: '杏林村站~杏锦路站',
            rotate: 0,
            isStation: false,
            onTheWay: true,
            sPoint: { x: 925, y: 645 },
            xPoint: { x: 925, y: 660 },
            sServerPoint: { x: 925, y: 645 - 24 },
            xServerPoint: { x: 925 - 25, y: 660 + 10 }
        },
        {
            station_ID: 161,
            station_Name: '',
            isStation: false,
            isCorner: true,       //  站点与站点之间的拐角
            zPoint: { x: 921, y: 653 },
            tPoint: { x: 921, y: 653 },
            sPoint: { x: 924, y: 646 },
            xPoint: { x: 918, y: 660 },
            sServerPoint: { x: 924, y: 646 },
            xServerPoint: { x: 918, y: 660 }
        },
        {
            station_ID: 170,
            station_Name: '杏锦路站',
            rotate: 0,
            isStation: true,
            zPoint: { x: 882, y: 615 },
            tPoint: { x: 902, y: 595 },
            sPoint: { x: 887, y: 610 },
            xPoint: { x: 877, y: 620 },
            sServerPoint: { x: 887 + 10, y: 610 - 12 },
            xServerPoint: { x: 877 - 60, y: 620 }
        },
        {
            station_ID: 170,
            station_Name: '杏锦路站~官任站',
            rotate: 0,
            isStation: false,
            onTheWay: true,
            sPoint: { x: 864, y: 585 },
            xPoint: { x: 853, y: 594 },
            sServerPoint: { x: 864 + 10, y: 585 - 12 },
            xServerPoint: { x: 853 - 60, y: 594 }
        },
        {
            station_ID: 180,
            station_Name: '官任站',
            rotate: 0,
            isStation: true,
            zPoint: { x: 835, y: 563 },
            tPoint: { x: 855, y: 563 },
            sPoint: { x: 842, y: 561 },
            xPoint: { x: 828, y: 566 },
            sServerPoint: { x: 842 + 10, y: 561 - 7 },
            xServerPoint: { x: 828 - 60, y: 566 - 7 }
        },
        {
            station_ID: 180,
            station_Name: '官任站~诚毅广场站',
            rotate: 0,
            isStation: false,
            onTheWay: true,
            sPoint: { x: 842, y: 539 },
            xPoint: { x: 827, y: 539 },
            sServerPoint: { x: 842 + 10, y: 539 - 7 },
            xServerPoint: { x: 827 - 60, y: 539 - 7 }
        },
        {
            station_ID: 190,
            station_Name: '诚毅广场站',
            rotate: 0,
            isStation: true,
            zPoint: { x: 835, y: 519 },
            tPoint: { x: 855, y: 519 },
            sPoint: { x: 842, y: 519 },
            xPoint: { x: 828, y: 519 },
            sServerPoint: { x: 842 + 10, y: 519 - 7 },
            xServerPoint: { x: 828 - 60, y: 519 - 7 }
        },
        {
            station_ID: 190,
            station_Name: '诚毅广场站~集美软件园站',
            rotate: 0,
            isStation: false,
            onTheWay: true,
            sPoint: { x: 842, y: 495 },
            xPoint: { x: 827, y: 495 },
            sServerPoint: { x: 842 + 10, y: 495 - 7 },
            xServerPoint: { x: 827 - 60, y: 495 - 7 }
        },
        {
            station_ID: 200,
            station_Name: '集美软件园站',
            rotate: 0,
            isStation: true,
            zPoint: { x: 835, y: 474 },
            tPoint: { x: 855, y: 474 },
            sPoint: { x: 842, y: 474 },
            xPoint: { x: 828, y: 474 },
            sServerPoint: { x: 842 + 10, y: 474 - 7 },
            xServerPoint: { x: 828 - 60, y: 474 - 7 }
        },
        {
            station_ID: 200,
            station_Name: '集美软件园站~集美大道站',
            rotate: 0,
            isStation: false,
            onTheWay: true,
            sPoint: { x: 842, y: 451 },
            xPoint: { x: 827, y: 451 },
            sServerPoint: { x: 842 + 10, y: 451 - 7 },
            xServerPoint: { x: 827 - 60, y: 451 - 7 }
        },
        {
            station_ID: 210,
            station_Name: '集美大道站',
            rotate: 0,
            isStation: true,
            zPoint: { x: 835, y: 427 },
            tPoint: { x: 855, y: 427 },
            sPoint: { x: 842, y: 427 },
            xPoint: { x: 828, y: 427 },
            sServerPoint: { x: 842 + 10, y: 427 - 7 },
            xServerPoint: { x: 828 - 60, y: 427 - 7 }
        },
        {
            station_ID: 210,
            station_Name: '集美大道站~天水路站',
            rotate: 0,
            isStation: false,
            onTheWay: true,
            sPoint: { x: 842, y: 402 },
            xPoint: { x: 827, y: 402 },
            sServerPoint: { x: 842 + 10, y: 402 - 7 },
            xServerPoint: { x: 827 - 60, y: 402 - 7 }
        },
        {
            station_ID: 220,
            station_Name: '天水路站',
            rotate: 0,
            isStation: true,
            zPoint: { x: 835, y: 377 },
            tPoint: { x: 855, y: 377 },
            sPoint: { x: 842, y: 377 },
            xPoint: { x: 828, y: 377 },
            sServerPoint: { x: 842 + 10, y: 377 - 7 },
            xServerPoint: { x: 828 - 60, y: 377 - 7 }
        },
        {
            station_ID: 220,
            station_Name: '天水路站~厦门北站',
            rotate: 0,
            isStation: false,
            onTheWay: true,
            sPoint: { x: 842, y: 358 },
            xPoint: { x: 827, y: 358 },
            sServerPoint: { x: 842 + 10, y: 358 - 7 },
            xServerPoint: { x: 827 - 60, y: 358 - 7 }
        },
        {
            station_ID: 230,
            station_Name: '厦门北站',
            rotate: 0,
            isStation: true,
            zPoint: { x: 835, y: 338 },
            tPoint: { x: 855, y: 338 },
            sPoint: { x: 842, y: 338 },
            xPoint: { x: 828, y: 338 },
            sServerPoint: { x: 842 + 10, y: 338 - 7 },
            xServerPoint: { x: 828 - 60, y: 338 - 7 }
        },
        {
            station_ID: 230,
            station_Name: '厦门北站~岩内站',
            rotate: 0,
            isStation: false,
            onTheWay: true,
            sPoint: { x: 842, y: 303 },
            xPoint: { x: 827, y: 303},
            sServerPoint: { x: 842 + 10, y: 303 - 7 },
            xServerPoint: { x: 827 - 60, y: 303 - 7 }
        },
        {
            station_ID: 240,
            station_Name: '岩内站',
            rotate: 0,
            isStation: true,
            zPoint: { x: 835, y: 261 },
            tPoint: { x: 855, y: 251 },
            sPoint: { x: 842, y: 261 },
            xPoint: { x: 828, y: 261 },
            sServerPoint: { x: 842 + 10, y: 261 - 7 },
            xServerPoint: { x: 828 - 60, y: 261 - 7 }
        }
    ]
}