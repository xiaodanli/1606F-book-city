require(['bscroll','jquery','render','dom','getParams'],function(bscroll,$,render,dom,getParams){
    var scroll = new bscroll('.chapter-list',{
        click:true
    });

    var fiction_id = getParams.fiction_id;

    
    var init = {
        load:function(){
            this.renderChapter();
        },
        renderChapter:function(){

            var that = this;
            $.ajax({
                url:'/api/chapter?fiction_id='+fiction_id,
                dataType:'json',
                success:function(res){
                    console.log(res);
                    if(res.code === 1){
                        render('#chapter-tpl',res.data,'.list');
                        scroll.refresh();
                        var lis = Array.from(document.querySelectorAll('li'));
                        var target;
                        if(getParams.chapter_id){
                            target = lis[getParams.chapter_id];
                        }else{
                            target = lis[lis.length - 1];
                        }

                        scroll.scrollToElement(target);

                        that.addEvent();
                    }
                }
            })
        },
        addEvent:function(){
            var list = dom('.list');

            list.onclick = function(e){
                if(e.target.tagName === 'LI'){
                    var chapter_id = e.target.getAttribute('data-id');

                    window.localStorage.setItem(fiction_id,chapter_id);

                    location.href="../../page/artical.html?fiction_id="+fiction_id+"&id="+chapter_id;

                }
            }

            dom('.icon-back').onclick = function(){
                if(getParams.chapter_id){
                    location.href="../../page/artical.html?fiction_id="+fiction_id+"&id="+getParams.chapter_id;
                }else{
                    location.href="../../page/detail.html?fiction_id="+fiction_id;
                }
            }
        }
    }

    init.load();
})