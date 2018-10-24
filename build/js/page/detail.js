require(['jquery','getParams','render','text!tbTpl','appendFun'],function($,getParams,render,tbTpl,appendFun){

    var fiction_id = getParams.fiction_id;

    var init = {
        load:function(){
            appendFun(tbTpl);
            this.render();
        },
        render:function(){
            $.ajax({
                url:'/api/detail?fiction_id='+fiction_id,
                dataType:'json',
                success:function(res){
                    if(res.code === 1){
                        render('#detail-tpl',res.data.item,'.inner-content');
                        render('#tb-tpl',res.data.related,'.other');

                        $('.go-artical-btn').on('click',function(){
                            location.href="../../page/artical.html?fiction_id="+fiction_id+"&id=1"
                        })
                    }
                    
                }
            })
        }
    }

    init.load();

    $('.icon-back').on('click',function(){
        location.href="/";
    })

})