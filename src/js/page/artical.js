require(['jquery','getParams','base64','dom','render'],function($,getParams,base64,dom,render){
    var fiction_id = getParams.fiction_id,
        storage = window.localStorage,
        id = storage.getItem(fiction_id) || getParams.id;
        


    var setStyle = dom('.set-style'),
        setPanel = dom('.set-panel'),
        mask = dom('.mask'),
        setWrap = dom('.set-wrap'),
        content = dom('.content'),
        bgs = dom('.bgs'),
        dayBtn = dom('.day-btn'),
        cur = dom('.cur');
    

    //点击内容

    content.onclick = function(){
        dom('.set-wrap').style.display = 'block';
    }

    //点击蒙层
    mask.onclick = function(){
        setPanel.style.display = 'none';
        setStyle.classList.remove('active');
        setWrap.style.display = 'none';
    }
    //点击设置字体

    setStyle.onclick = function(){
        if(Array.from(this.classList).indexOf('active') != -1){
            setPanel.style.display = 'none';
            this.classList.remove('active');
        }else{
            setPanel.style.display = 'block';
            this.classList.add('active');
        }
       
    }

    var initSize = storage.getItem('fz')*1 || 12;

    content.style.fontSize = initSize/37.5+'rem';

    //点击大

    dom('.big-btn').onclick = function(){
        if(initSize < 30){
            initSize+=2;
            content.style.fontSize = initSize/37.5+'rem';
            storage.setItem('fz',initSize);
        }
    }

    //点击小

    dom('.small-btn').onclick = function(){
        if(initSize > 12){
            initSize-=2;
            content.style.fontSize = initSize/37.5 + 'rem';
            storage.setItem('fz',initSize);
        }
    }

    //修改背景

    //初始的字  夜间    状态 白天  true

    var text = storage.getItem('status') || '夜间';

    var status = text == '夜间' ? true : false;

    var lis = Array.from(bgs.querySelectorAll('li'));

    var initBg = storage.getItem('bg') || '#f7eee5';

    var dd = dom('.day-btn').querySelector('dd');

    content.style.background = initBg;


    changeBg();

    function changeBg(){
        if(status){  //白天状态    字  夜间字
            dd.innerHTML = '夜间';
            dayBtn.classList.remove('light');
            content.style.background = initBg;

            change();

            lis.forEach(function(item){
                if(item.getAttribute('data-bg') === initBg){
                    item.classList.add('active');
                }
            })

        }else{ //夜间的状态  字  白天的字
            dd.innerHTML = '白天';
            dayBtn.classList.add('light');
            content.style.background = '#0f1410';
            change();
            lis[5].classList.add('active');
        }
    }



    function change(){
        lis.forEach(function(item){
            item.classList.remove('active');
        })
    }

    lis.forEach(function(item){
        item.onclick = function(){
            change();
            item.classList.add('active');
            initBg = item.getAttribute('data-bg');
            storage.setItem('bg',initBg);
            if(status){
                content.style.background = initBg;
            }
        }
    })

    //点击day-btn
    dom('.day-btn').onclick = function(){
        status = !status;

        changeBg();

        storage.setItem('status',dd.innerHTML);
    }

    //点击下一章
    dom('.next-btn').onclick = function(){
        if(id < 4){
            id++;
            cur.innerHTML = id;
            init.renderArtical(id);
            storage.setItem(fiction_id,id);
        }else{
            alert("已经到最后一章")
        }
        
    }

    //点击上一章
    dom('.prev-btn').onclick = function(){
        // if(id == 1){
        //     id == 1
        // }else{
        //     id--;
        // }

        if(id > 1){
            id--;
            cur.innerHTML = id;
            init.renderArtical(id);
            storage.setItem(fiction_id,id);
        }else{
            alert("已经到第一章")
        }

        console.log(id);
    }

    //点击目录
    dom('.go-chapter').onclick = function(){
        location.href="../../page/chapter.html?fiction_id="+fiction_id+"&chapter_id="+id;
    }

    //点击返回
    dom(".icon-circal-back").onclick = function(){
        location.href="../../page/detail.html?fiction_id="+fiction_id;
    }

var init = {
        load:function(){
            this.renderArtical(id);
            //请求章节
            this.getChapterList();
            cur.innerHTML = id;
        },
        renderArtical:function(id){
            var that = this;
            $.ajax({
                url:'/api/artical?fiction_id='+fiction_id+'&id='+id,
                dataType:'json',
                success:function(res){
                    if(res.code === 1){
                        that.jsonp(res.data.jsonp);
                    }
                }
            })
        },
        jsonp:function(path){
            var script = document.createElement('script');

            script.src=path;

            window.duokan_fiction_chapter = function(data){
                var data = JSON.parse($.base64.atob(data,true));
                render('#content-tpl',data,'.content');
            }

            document.body.appendChild(script);
        },
        getChapterList:function(){
            $.ajax({
                url:'/api/chapter?fiction_id='+fiction_id,
                dataType:'json',
                success:function(res){
                    console.log(res);
                    if(res.code === 1){
                        dom('.total').innerHTML = res.data.length;
                    }
                }
            })
        }
    }
    

    init.load();


})