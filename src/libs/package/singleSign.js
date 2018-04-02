import utils from '../utils';
import Util from '../util';
import MOMENT from 'moment';
export default function (to, from, next) {
    const href = to.fullPath;
    const signInfo = href.split('?singleSign=')[1];

    if (href.indexOf('?redirect=') > 0) {
        next();
        return;
    }

    if (utils.isString(signInfo)) {

        Util.cookie.set('xmgd', decodeURIComponent(signInfo.split('--')[0]) , new Date(new Date().getTime() + 7 * 24 * 60 * 1000));
        Util.cookie.set('xmgdname', decodeURIComponent( signInfo.split('--')[1]), new Date(new Date().getTime() + 7 * 24 * 60 * 1000));
        Util.cookie.set('xmgduserid', signInfo.split('--')[2], new Date(new Date().getTime() + 7 * 24 * 60 * 1000));
        Util.cookie.set('logintime', MOMENT().format('YYYY-MM-DD hh:mm:ss') , new Date(new Date().getTime() + 7 * 24 * 60 * 1000));


        console.log(signInfo.split('--')[3]);
        next({
            name: signInfo.split('--')[3]
        })

        return ;
    }


}