define(function(){
    var url = location.search;

    if(url.indexOf('?') != -1){
        url = url.substr(1);
    }

    var params = {};

    var bigArr = url.split('&');

    bigArr.forEach(function(item){
        var sArr =  item.split('=');
        params[sArr[0]] = sArr[1];

    })

    return params
})