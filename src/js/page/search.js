require(['jquery','render'],function($,render){
    //点击搜索
    var searchBtn = document.querySelector('.search-btn');
    var key = document.querySelector('#key');

    var searchResult = document.querySelector('.search-result');

    var keys = document.querySelector('.keys');

    //点击搜索按钮
    searchBtn.onclick = function(){
        var keyVal = key.value.trim();
        if(!keyVal){
            alert('输入内容为空');
        }else{
            search(keyVal);
        }
    }

    var storage = window.localStorage;

    var historyArr = JSON.parse(storage.getItem('history')) || [];

    if(historyArr){
        render('#type-tpl',historyArr,'.history');
    }

   

    function search(key){

        $.ajax({
            url:'/api/search?key='+key,
            dataType:'json',
            success:function(res){
                console.log(res);
                if(res.code === 1){

                    var isHas = historyArr.some(function(item){
                        return item.ad_name == key
                    })
                    if(!isHas){
                        historyArr.push({ad_name:key});

                        storage.setItem('history',JSON.stringify(historyArr));
                        render('#type-tpl',historyArr,'.history');
                    }
                    

                    keys.style.display = 'none';
                    searchResult.style.display = 'block';
                    if(!res.data.length){
                        searchResult.innerHTML = '<p>没有匹配的内容</p>';
                    }else{
                        render('#search-tpl',res.data,'.search-result');
                    }
                }
            }
        })
    }

    //监听input事件

    key.oninput = function(){
        var val = this.value;
        if(!val){
            keys.style.display = 'block';
            searchResult.style.display = 'none';
            searchResult.innerHTML = '';
        }
    } 

    //请求热门关键词
    $.ajax({
        url:'/api/hotkey',
        dataType:'json',
        success:function(res){
            console.log(res);
            if(res.code == 1){
                render('#type-tpl',res.data.ads,'.hot');

                var lis = document.querySelectorAll('li');
                console.log(lis);
                lis.forEach(function(item){
                    item.onclick = function(){
                        var keyVal = this.innerHTML;
                        key.value = keyVal;
                        search(keyVal);
                    }
                })
            }
        }
    })

    //点击返回

    var iconBack = document.querySelector('.icon-back');
    iconBack.onclick = function(){
        location.href="/";
    }
    

    

})