;(function($, w){
    //是否是第一次输入框获得焦点
    var isShow = false;
    //城市省份信息
    var address;
    //输入框对象
    var $input;
    //从数据中获取的数据
    var addrText = '';
    //获取城市信息数据
    var getDatas = function(){
        return data;
    };
    //循环遍历地址数据
    var getAddr = function(text){
        if(address){
            var data;
            var loop = function(address){
                var len = address.length;
                for(var i = 0; i < len; i++){
                    var item = address[i];
                    if(text == item.name){
                        // return item;
                        data = item;
                        break;
                    }
                    if(item.child){
                        loop(item.child);
                    }
                }
            };
            loop(address);
            return data;
        }
    };
    //li的点击事件
    var clickHandler = function(event){
        event.stopPropagation();
        var text = event.target.innerText;
        if(addrText == ''){
            addrText += text;
        }else{
            addrText += '/' + text;
        }
        $input.val(addrText);
        var item = getAddr(text);
        if(item.child){
            updateDom(item.child);
        }else{
            $('#city_select').remove();
            $('#city_select_close').remove();
            addrText = '';
            isShow = false;
        }
    };
    //创建视图
    var createDom = function(context, arr){
        var dom =   '<div class="close" id="city_select_close"><span>X</span></div><div class="city-select-box" id="city_select"><ul>';
        for(var i = 0; i < arr.length; i++){
            dom += '<li>'+arr[i].name+'</li>';
        }
        dom += '</ul></div>';
        context.parent().append(dom);
        //给每个li绑定点击事件
        $('#city_select').find('li').on('click', clickHandler);
        //关闭按钮
        $('#city_select_close').on('click', function(e){
            e.stopPropagation();
            $('#city_select').remove();
            $(this).remove();
            addrText = '';
            isShow = false;
        });
    };
    //更新视图
    var updateDom = function(arr){
        var dom = '<ul>';
        var len = arr.length;
        for(var i = 0; i < len; i++){
            dom += '<li>'+arr[i].name+'</li>';
        }
        dom += '</ul>';
        $('#city_select').html(dom);
        //给每个li绑定点击事件
        $('#city_select').find('li').on('click', clickHandler);
    };
    //给视图添加基本样式
    var addBasicCss = function(context){
        var container = context.parent();
        container.css({'position':'relative'});
    };
    $.fn.citySelect = function(opt){
        var self = this;
        $input = this;
        //获取城市信息数据
        address = getDatas();
        addBasicCss(self);

        //当输入框获取焦点的时候，创建视图
        this.on('focus', function(){
            if(!isShow){
                isShow = true;
                addrText = '';
                createDom(self, address);
            }
        });
    };
})(jQuery, window);