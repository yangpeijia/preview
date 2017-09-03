var devices = [
    {
       name:'iphone4',
       desp:'苹果4',
       width:320,
       height:480,
       orientation:'portrait',
       system:'IOS',
       deviceType:'phone'
      },
    {
        name:'iphone5',
        desp:'苹果5',
        width:320,
        height:568,
        orientation:'portrait',
        system:'IOS',
        deviceType:'phone'
       },
    {
        name:'Nexus 6P',
        desp:'Nexus 6P',
        width:411,
        height:731,
        orientation:'portrait',
        system:'Android',
        deviceType:'phone'
    },
    {
        name:'Nexus 7',
        desp:'Nexus 7',
        width:600,
        height:960,
        orientation:'portrait',
        system:'Android',
        deviceType:'tablet'
    },
],
len = devices.length,
html=[],
$orientation;

//生成不同分辨率的预览视图
for (i=0;i<len;i++) {
    html.push('<div class="wrapper" data-height='+(devices[i].height+60)+' data-width='+devices[i].width+' style="width:'+devices[i].width+'px;height:'+(devices[i].height+60)+'px" data-system="'+devices[i].system+'" data-devicetype="'+devices[i].deviceType+'"><div class="buttons" style="width:'+devices[i].width+'"><button data-role="orientation" >切换横屏</button></div><div class="device" data-height='+devices[i].height+' data-width='+devices[i].width+' style="width: '+ devices[i].width + 'px;height:' + devices[i].height + 'px"><iframe id="previewFrame'+i+'" src="previewhtml/previewFrame.html" title=' + devices[i].name + '; style="width:'+ devices[i].width + 'px;height:' + devices[i].height + 'px;transform-origin:top left 0" ></iframe></div></div>')
}

$('.view').html(html.join(''));


//缩放
$('[data-role="range"]').on('input.preview',function(e){
    var $zoom = e.target.value,   
    $wrappers = $('.wrapper'),    
    $devices = $('.device'),    
    $iframe = $devices.children('iframe'),
    $zoomScale = $zoom * 0.01;

    $wrappers.each(function(index,element){
        var $wrapperHeight = $(element).attr("data-height")*$zoomScale,
        $wrapperWidth = $(element).attr("data-width")*$zoomScale;

        $(element).width($wrapperWidth);
        $(element).height($wrapperHeight);
    })

    $('[data-role="zoom-value"]').text($zoom+'%');


    $iframe.css({
        "transform":"scale("+$zoomScale+")"
    })

    $devices.each(function(index,element){
        var $deviceHeight = $(element).attr("data-height")*$zoomScale,
        $deviceWidth = $(element).attr("data-width")*$zoomScale;

        $(element).width($deviceWidth);
        $(element).height($deviceHeight);
    })
});

//横竖屏转换
$('[data-role="orientation"]').on('click.orientation',function(e){
    
    var $device = $(this).parent().parent().find('.device'),

    $wrapper =  $device.parent(),
    $wrapperHeight = $wrapper.height(),
    $wrapperWidth = $wrapper.width(),

    $deviceWidth = $device.width(),
    $deviceHeight = $device.height(),
    
    $iframe = $device.children('iframe'),
    $iframeWidth=$iframe.width(),
    $iframeHeight=$iframe.height(),

    $scale = $('[data-role="zoom-value"]').text(),

    $dataWidth = parseInt($wrapper.attr("data-width")),
    $dataHeight = parseInt($wrapper.attr("data-height")),

    $dataDeWidth = parseInt($device.attr("data-width")),
    $dataDeHeight = parseInt($device.attr("data-height"));

    if($(this).text() === "切换横屏"){
        $(this).text("切换竖屏");
        $wrapper.attr("data-width", $dataHeight-60);
        $wrapper.attr("data-height",$dataWidth+60);

        $device.attr("data-width", $dataDeHeight);
        $device.attr("data-height",$dataDeWidth);

    } else {
        $(this).text("切换横屏");
        $wrapper.attr("data-height",$dataWidth+60);
        $wrapper.attr("data-width", $dataHeight-60);

        $device.attr("data-width",$dataDeHeight);
        $device.attr("data-height",$dataDeWidth);
    }

    $wrapper.width($wrapperHeight-60*$scale);
    $wrapper.height($wrapperWidth+60*$scale);

    $device.width($deviceHeight);
    $device.height($deviceWidth);

    $iframe.width($iframeHeight);
    $iframe.height($iframeWidth);

    $('[data-role="range"]').trigger('input.preview')
    
});

//系统类型
$('[data-role="system"]').on('click.preview',function(e){
    var $this = $(this);

    $selectedSystem = $this.text();
  
    if(!$this.attr('data-selected')){

        $this.addClass('selected');
        $this.attr('data-selected','true');

        switch($selectedSystem){
            case 'IOS':
                $('[data-system="IOS"]').show();

                if($this.next().attr('data-selected')){
                    $('[data-system="Android"]').show();                                  
                } else{            
                    $('[data-system="Android"]').hide(); 
                }
         
                break;

            case 'Android':
                $('[data-system="Android"]').show(); 

                if($this.prev().attr('data-selected')){                
                    $('[data-system="IOS"]').show();
                } else{
                    $('[data-system="IOS"]').hide();
                }
                
                break;

            default:   
                break;
        }

    } else {

        $this.removeClass('selected');
        $this.removeAttr('data-selected');

        switch($selectedSystem){

            case 'IOS':

                $('[data-system="Android"]').show();

                if($this.next().attr('data-selected')){         
                    $('[data-system="IOS"]').hide();
                } else {
                    $('[data-system="IOS"]').show();
                } 

                break;

            case 'Android':

                $('[data-system="IOS"]').show();

                if($this.prev().attr('data-selected')){
                    $('[data-system="Android"]').hide();
                } else {
                    $('[data-system="Android"]').show();
                }

                break;

            default:
                break;
        }
    }     
})

//设备类型
$('[data-role="deviveType"]').on('click.preview',function(e){
    var $this = $(this);

    $selectedDevice = $this.text();
  
    if(!$this.attr('data-selected')){

        $this.addClass('selected');
        $this.attr('data-selected','true');

        switch($selectedDevice){
            case '手机':
                $('[data-deviceType="phone"]').show();

                if($this.next().attr('data-selected')){
                    $('[data-deviceType="tablet"]').show();                                  
                } else{            
                    $('[data-deviceType="tablet"]').hide(); 
                }
         
                break;

            case '平板':
                $('[data-deviceType="tablet"]').show(); 

                if($this.prev().attr('data-selected')){                
                    $('[data-deviceType="phone"]').show();
                } else{
                    $('[data-deviceType="phone"]').hide();
                }
                
                break;

            default:   
                break;
        }

    } else {

        $this.removeClass('selected');
        $this.removeAttr('data-selected');

        switch($selectedDevice){

            case '手机':

                $('[data-deviceType="tablet"]').show();

                if($this.next().attr('data-selected')){         
                    $('[data-deviceType="phone"]').hide();
                } else {
                    $('[data-deviceType="phone"]').show();
                } 

                break;

            case '平板':

                $('[data-deviceType="phone"]').show();

                if($this.prev().attr('data-selected')){
                    $('[data-deviceType="tablet"]').hide();
                } else {
                    $('[data-deviceType="tablet"]').show();
                }

                break;

            default:
                break;
        }
    }     
})

//自定义视窗
$('[data-role="add"]').on("click.preview",function(e){
    var device1 ={};

    if(($('[data-role="width"]').val()) && ($('[data-role="height"]').val())){
        device1.width=parseInt($('[data-role="width"]').val());
        device1.height=parseInt($('[data-role="height"]').val());
    } else {
        alert("请输入完整的分辨率")
    }


    $('.view').append('<div class="wrapper" data-height='+(device1.height+60)+' data-width='+device1.width+' style="width:'+device1.width+'px;height:'+(device1.height+60)+'px"><div class="buttons" style="width:'+device1.width+'"><button data-role="orientation" >切换横屏</button></div><div class="device" data-height='+device1.height+' data-width='+device1.width+' style="width: '+ device1.width + 'px;height:' + device1.height + 'px"><iframe id="previewFrame'+(devices.length-1)+'" src="previewhtml/previewFrame.html" style="width:'+ device1.width + 'px;height:' + device1.height + 'px;transform-origin:top left 0" ></iframe></div></div>')
    
    $('[data-role="orientation"]').on('click.orientation',function(e){
        
        var $device = $(this).parent().parent().find('.device'),
    
        $wrapper =  $device.parent(),
        $wrapperHeight = $wrapper.height(),
        $wrapperWidth = $wrapper.width(),
    
        $deviceWidth = $device.width(),
        $deviceHeight = $device.height(),
        
        $iframe = $device.children('iframe'),
        $iframeWidth=$iframe.width(),
        $iframeHeight=$iframe.height(),
    
        $scale = $('[data-role="zoom-value"]').text(),
    
        $dataWidth = parseInt($wrapper.attr("data-width")),
        $dataHeight = parseInt($wrapper.attr("data-height")),
    
        $dataDeWidth = parseInt($device.attr("data-width")),
        $dataDeHeight = parseInt($device.attr("data-height"));
    
        if($(this).text() === "切换横屏"){
            $(this).text("切换竖屏");
            $wrapper.attr("data-width", $dataHeight-60);
            $wrapper.attr("data-height",$dataWidth+60);
    
            $device.attr("data-width", $dataDeHeight);
            $device.attr("data-height",$dataDeWidth);
    
        } else {
            $(this).text("切换横屏");
            $wrapper.attr("data-height",$dataWidth+60);
            $wrapper.attr("data-width", $dataHeight-60);
    
            $device.attr("data-width",$dataDeHeight);
            $device.attr("data-height",$dataDeWidth);
        }
    
        $wrapper.width($wrapperHeight-60*$scale);
        $wrapper.height($wrapperWidth+60*$scale);
    
        $device.width($deviceHeight);
        $device.height($deviceWidth);
    
        $iframe.width($iframeHeight);
        $iframe.height($iframeWidth);
    
        $('[data-role="range"]').trigger('input.preview')
        
    });

    device1 = null;
    
})


