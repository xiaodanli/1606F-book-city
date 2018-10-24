/*
 * @Author: 李晓丹 
 * @Date: 2018-10-17 10:54:27 
 * @Last Modified by: 李晓丹
 * @Last Modified time: 2018-10-17 15:22:54
 */

var querystring = require('querystring');

var url = require('url');

var allApi = require('./api.js');


//拦截前端get请求

function reqParse(req,res,next){
    req.pathname = url.parse(req.url).pathname;   // /api/search?key=18    post  /api/search
    req.query = url.parse(req.url,true).query;
    
    next();
}

//拦截前端的post请求   

function bodyParse(req,res,next){
    if(req.method !== 'POST'){
        next();
        return false;
    }

    var sendData = '';

    req.on('data',function(chunk){
        sendData += chunk;
    })

    req.on('end',function(){
        try{
            sendData = JSON.parse(sendData);
        }catch(error){
            try{
                sendData = querystring.parse(sendData);
            }catch(err){
                throw new Error('不合法')
            }
        }
        req.body = sendData;
        next();
    })
}

function responseData(req,res,next){
    allApi[req.pathname]  ? allApi[req.pathname](req,res,next) : next();
}

module.exports = [reqParse,bodyParse,responseData];