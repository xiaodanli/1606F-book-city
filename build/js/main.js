/*
 * @Author: 李晓丹 
 * @Date: 2018-10-17 11:50:10 
 * @Last Modified by: 李晓丹
 * @Last Modified time: 2018-10-23 16:48:50
 */

require.config({
    baseUrl:'/js/',
    paths:{
        //库
        'jquery':'./libs/jquery-2.1.1.min',
        'swiper':'./libs/swiper.min',
        'bscroll':'./libs/bscroll',
        'text':'./libs/text',
        'handlebars':'./libs/handlebars-v4.0.11',
        'base64':'./libs/jquery.base64',

        //page
        'index':'./page/index',
        'detail':'./page/detail',
        'search':'./page/search',
        'artical':'./page/artical',
        'chapter':'./page/chapter',

        //common
        'render':'./common/render',
        'appendFun':'./common/append',
        'getParams':'./common/getParams',
        'dom':'./common/dom',

        //模板
        'bannerTpl':'../page/template/index-tpl.html',
        'tbTpl':'../page/template/list-t-b.html',
        'lrTpl':'../page/template/list-l-r.html'
    },
    shim:{
        'base64':{
            deps:['jquery']
        }
    }
})