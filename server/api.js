/*
 * @Author: 李晓丹 
 * @Date: 2018-10-17 10:54:14 
 * @Last Modified by: 李晓丹
 * @Last Modified time: 2018-10-23 16:38:18
 */
// 
var allApi = {};

// __dirname : 文件所在的路径

// process.cwd() : 执行命令所在的文件

var  resolve = require('./util');

var fs = require('fs');

function readFile(filepath){
    var data = fs.readFileSync(resolve(filepath),'utf-8');
    return data ? JSON.parse(data) : [];
}

allApi['/api/bookcity'] = function(req,res,next){
    res.end(JSON.stringify({code:1,data:readFile('./mock/bookcity.json')}));
    next();
}

allApi['/api/add'] = function(req,res,next){
    var list = readFile('./mock/list.json');
    console.log(list);
    list.push(req.body);
    fs.writeFileSync(resolve('./mock/list.json'),JSON.stringify(list));
    res.end(JSON.stringify({code:1,data:'添加成功'}));
    next();
}

allApi['/api/loadmore'] = function(req,res,next){
    var params = req.query;
    var data = readFile('./mock/loadmore.json');
    var total = Math.ceil(data.items.length/params.limit);

    var pagenum = params.pagenum;
    var limit = params.limit;

    // splice 能改变原数组  slice 不能改变
    
    var target = data.items.slice((pagenum-1)*limit,pagenum*limit);

    res.end(JSON.stringify({code:1,total:total,data:target}))
}

allApi['/api/detail'] = function(req,res,next){
    var fiction_id = req.query.fiction_id + '.json';

    var data = readFile('./mock/'+fiction_id);
    res.end(JSON.stringify({code:1,data:data}))
}

allApi['/api/search'] = function(req,res,next){
    var keyVal = req.query.key;

    var list = readFile('./mock/search.json');

    var target = list.items.filter(function(item){
        return item.title.match(keyVal)
    })

    res.end(JSON.stringify({code:1,data:target}))
    console.log(keyVal);
}

allApi['/api/hotkey'] = function(req,res,next){
    var data = readFile('./mock/search-hot.json');

    res.end(JSON.stringify({code:1,data:data}))
}

allApi['/api/artical'] = function(req,res,next){
    var fiction_id = req.query.fiction_id;
    var id = req.query.id;

    var filePath = './mock/artical/data'+id+'.json';

    var data = readFile(filePath);

    res.end(JSON.stringify({code:1,data:data}))

}

allApi['/api/chapter'] = function(req,res,next){
    var data = readFile('./mock/chapter-list.json');
    res.end(JSON.stringify({code:1,data:data.item.toc}))
}

module.exports = allApi;