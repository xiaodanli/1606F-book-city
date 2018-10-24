define(['handlebars'],function(handlebars){
    var render = function(tpl,data,target,isAppend){
        var source = document.querySelector(tpl).innerHTML;
        var targetEl = document.querySelector(target);
        
        var template = handlebars.compile(source);

        handlebars.registerHelper('addIndex',function(index){
            return index+1
        })

        var html = template(data);

        

        if(isAppend){
            targetEl.innerHTML = targetEl.innerHTML + html;
        }else{
            targetEl.innerHTML = html;
        }



    }
    return render
})