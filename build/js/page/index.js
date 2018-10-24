require(['jquery','swiper','bscroll','text!bannerTpl','text!tbTpl','render','appendFun','text!lrTpl'],function($,swiper,bscroll,bannerTpl,tbTpl,render,appendFun,lrTpl){
    var init = {
        load:function(){
            //添加模板
            appendFun(bannerTpl);

            appendFun(tbTpl);

            appendFun(lrTpl);
            
            //渲染首页数据
            this.renderHome();
            
        },
        renderHome:function(){
            var that = this;
            $.ajax({
                url:'/api/bookcity',
                dataType:'json',
                success:function(res){
                    console.log(res);
                    if(res.code === 1){
                        // 渲染swiper 
                        that.renderSwiper(res.data.items[0].data.data);

                        //渲染本周最火
                        that.renderHot(res.data.items[1].data.data);

                        //渲染重磅推荐
                        that.renderRecommend(res.data.items[2].data.data);
                    }
                    
                }
            })
        },
        renderSwiper:function(data){
            // var html = '';
            // data.forEach(function(item){
                // html += `
                //     <div class="swiper-slide">
                //     <img src="./imgs/classify-bg.jpg" alt="">
                // </div>
                // `;
            // })

            // var html = data.map(function(item){
            //     return   `
            //         <div class="swiper-slide">
            //         <img src="./imgs/classify-bg.jpg" alt="">
            //     </div>
            //     `;
            // }).join('');
            

            // var bannerWrapper = document.querySelector('.banner-wrapper');
            // bannerWrapper.innerHTML = html;

            var swiperData = data.filter(function(item){
                return item.size != 0
            })
            var classifyData = data.filter(function(item){
                return item.size == 0
            })
            
            render('#banner-tpl',swiperData,'.banner-wrapper');

            render('#classify-tpl',classifyData,'.classify');
            new swiper('.banner');
        },
        renderHot:function(data){
            render('#tb-tpl',data,'.hot');
        },
        renderRecommend:function(data){
            arr = format(data,5);
            
            render('#recommend-tpl',arr[0],'.recommend-list');
            var changeBtn = document.querySelector('.change-btn');

            var i = 0;

            changeBtn.onclick = function(){
                if(i < arr.length - 1){
                    i++;
                }else{
                    i=0;
                }
                render('#recommend-tpl',arr[i],'.recommend-list');
            }

        }
    };

    init.load();  //init 页面初始渲染的东西

    //格式化数据
    function format(data,num){
        this.groups = Math.ceil(data.length/num);

        // splice改变原数组  slice 

        var target = [];

        for(var i = 0; i< this.groups ;i++){
            target.push(data.splice(0,num))
        }

        return target

    }

    
    //实例化外层swiper
    new swiper('.swiper-wrap',{
        navigation:{
            prevEl:'.prev-btn',
            nextEl:'.next-btn'
        },
        on: {
            slideChangeTransitionStart: function(){
                var index = this.activeIndex;
                $('.tab-item').eq(index).addClass('active').siblings().removeClass('active');
                index == 0 ? $('.line').removeClass('active') : $('.line').addClass('active');
            }
        }
    })

   

    //实例化bscroll

    var cityScroll = new bscroll('.city-slide',{
        click:true,
        probeType:2
    });


    //监听滚动事件

    var htmlFz = document.querySelector('html').style.fontSize;

    var ruleSize = 44/37.5*parseInt(htmlFz);

    var _cityCon = $('.book-city-con');

    //加载更多

    var pagenum = 1;
    var total = 0;

    function loadmore(pagenum){
        
        $.ajax({
            url:'/api/loadmore',
            data:{
                pagenum:pagenum,
                limit:10
            },
            dataType:'json',
            success:function(res){
                console.log(res);
                if(res.code === 1){
                    total = res.total;

                    render('#lr-tpl',res.data,'.loadmore',true);

                    cityScroll.refresh();

                }
            }
        })
    }

    loadmore(pagenum);

    cityScroll.on('scroll',function(){
        // 44       x

        // -----------------------

        // 37.5     64  
        
        if(this.y < this.maxScrollY - ruleSize){
            if(pagenum < total){
                _cityCon.attr('up','释放加载更多');
            }else{
                _cityCon.attr('up','已经到底');
            }
           
        }else if(this.y < this.maxScrollY - ruleSize/2){
            if(pagenum < total){
                _cityCon.attr('up','上拉加载');
            }else{
                _cityCon.attr('up','已经到底');
            }
        }else if(this.y > ruleSize){
            _cityCon.attr('down','释放刷新');
        }

    })

    //监听touchEnd
    cityScroll.on('touchEnd',function(){
        if(_cityCon.attr('up') === '释放加载更多'){
            if(pagenum < total){
                pagenum++;
                loadmore(pagenum);
                _cityCon.attr('up','上拉加载');
            }else{
                _cityCon.attr('up','已经到底');
            }
        }else if(_cityCon.attr('down') === '释放刷新'){
            location.reload();
        }
    })

    //去搜索页面
    $('.not-search').on('click',function(){
        location.href="../../page/search.html";
    })
})