/*
 * @Author: 李晓丹 
 * @Date: 2018-10-17 10:54:33 
 * @Last Modified by:   李晓丹 
 * @Last Modified time: 2018-10-17 10:54:33 
 */

var path = require('path');

function resolve(filepath){
    return path.join(process.cwd(),filepath);
}

module.exports = resolve