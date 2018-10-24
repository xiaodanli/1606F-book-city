define(function(){
    var appendFun = function(tpl){
        var div = document.createElement('div');
        div.innerHTML = tpl;
        document.body.appendChild(div);
    }

    return appendFun
})