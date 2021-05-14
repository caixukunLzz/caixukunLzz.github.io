$(document).ready(function(){
	$(".tsBox li").hover(function() {
                $(this).addClass("on").siblings().removeClass("on")
            })

	$("body").append("<div id='backtop'></div>")
	$("#backtop").on("click",function(){$("html,body").animate({scrollTop:0},1000);})
	window.onscroll=function(){
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		var pH=document.documentElement.clientHeight;
		var mb=$("#backtop")
		if(scrollTop>=pH){
			mb.show()
		}else{
			mb.hide()
		}
		
	};	
	$("#backtop").bind("click",function(){
	$("html,body").animate({scrollTop:0},500)
		return false; 
	})


	$(".Tab").Tab_()
	$('#news .Tab').Tab({lilab:"li",labselect:".change",Tabname:".Tab_nr",labaction:"click",animatename:"scroll_x",animateTime:300,mode:"none"})

	$.fn.wowanimate_list();

	$.fn.hovers();

	if ($("#playbanner").length>0)
	{
			$("#playbanner").ZHYslider({
					fullscreen	:false,
					arrow		:false,		
					speed: 500, 
					space: 2000,
					auto: true, //自动滚动
					affect:'scrollx',
					ctag: '.Slide_'
			})
		
		
	}

	$('.photoshow').roundabout({
		btnNext: '#ZhiYe .move_rights',
	btnNextCallback:function(){
		var indexs	=	$(this).find(".roundabout-in-focus").index()
		$(".photoshow_select").find("a:eq("+indexs+")").addClass("change").siblings().removeClass("change")
	},
	autoplay: true,
	autoplayDuration: 2500,
	autoplayPauseOnHover: true,
	autoplayCallback: function() {
		var indexs	=	$(this).find(".roundabout-in-focus").index()
		$(".photoshow_select").find("a:eq("+indexs+")").addClass("change").siblings().removeClass("change")
	},
	btnPrev: '#ZhiYe .move_lefts',
	btnPrevCallback:function(){
		var indexs	=	$(this).find(".roundabout-in-focus").index()
		$(".photoshow_select").find("a:eq("+indexs+")").addClass("change").siblings().removeClass("change")
		
	},
	duration:300});




})



$.fn.wowanimate_list=function(){
	
	if (typeof(WOW)=='undefined') {return;}
	if ((/msie [6|7|8|9]/i.test(navigator.userAgent))){return;}
	
	var ShiZhuang	=	$("#ShiZhuang");
	if (ShiZhuang.length>0)
	{
		ShiZhuang.find(".PicList li").each(function(index, element) {
				$(this).css("visibility","hidden").addClass("wow fadeInUp").attr({"data-wow-offset":0,"data-wow-duration":(index+1)*0.2+"s","data-wow-delay":120*(index+1)+"ms"})
        });
		
		
	}

		if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))){
			if (typeof(WOW)!='undefined')
			{new WOW().init();}
		};	
	
}



//选项卡切换
$.fn.Tab=function(config){
	var self=$(this);
	var select_=0;
	var classname=config.labselect.replace(".","")
	if (self.length==0) return false;
	if (self.find(config.lilab).length==0) return false;
	
	self.each(function(index, element) {	
		self=$(this);	
		if (self.find(config.labselect).length==0) 
		{self.find(config.lilab+":eq(0)").addClass(classname);}
		self.find(config.lilab).each(function(index, element) {
			if (!$(this).is(config.labselect))
			{
				self.siblings(config.Tabname+":eq("+index+")").hide();
			}
		});
		
		self.find(config.lilab).bind(config.labaction+".action",function(){
			
			var index=$(this).index();
			if(self.siblings(config.Tabname+":visible").is(":animated")){ 
			return false;
			
			}
			
			if ($(this).is(config.labselect)) return false;
			var index2=$(this).siblings(config.labselect).index()
			$(this).addClass(classname).siblings().removeClass(classname);
			
			config.animate(index,index2,config.animatename)
			return config.labaction=="click"?   false :  true;
		})
		
		config.animate=function(index,index2,active){
			switch (active)
			{
				case "fade":
					self.siblings(config.Tabname+":visible").hide();
					self.siblings(config.Tabname+":eq("+index+")").fadeIn(config.animateTime);
				break;
				case "scroll_x":
					self.parent().css({"position":"relative","overflow":"hidden"});
					var selfs=self.siblings(config.Tabname+":visible")
					var dr="100%",dr2="100%"
					if (index2>index)
					{
						dr="100%";
						dr2="-100%"
					}
					else
					{
						dr="-100%";
						dr2="100%"
					}
					var top=selfs.position().top
					
					
					if (config.mode=="delay")		
					{
					//当前渐隐
					selfs
					.css({"position":"relative","width":"100%"})
					.stop(true,false)
					.animate({"left":dr,"opacity":0},config.animateTime,
						function(){
							 $(this).css({"position":"static","left":"auto","opacity":1,"display":"none"}
						)}
					)
					setTimeout(function(){
						self.siblings(config.Tabname+":eq("+index+")").css({"position":"relative","left":dr2,"display":"block","opacity":0})
						.stop(true,false)
						.animate({"left":0,"opacity":1},config.animateTime
						,function(){
								$(this).css({"top":0,"position":"static"})	
								
						})
					},config.animateTime)		
				
					}
					
					else
					{
						
						selfs
						.css({"position":"absolute","width":"100%","left":selfs.position().left,"top":selfs.position().top})
						.stop(true,false)
						.animate({"left":dr,"opacity":0},config.animateTime,
							function(){
								 $(this).css({"position":"relative","top":"auto","left":"auto","opacity":1,"display":"none"}
							)}
						)
				
				
						self.siblings(config.Tabname+":eq("+index+")").css({"position":"relative","left":dr2,"display":"block","opacity":0})
						.stop(true,false)
						.animate({"left":0,"opacity":1},config.animateTime
						,function(){
								$(this).css({"top":0,"position":"relative"})	
								
						})
					}
				break;
				
				
				case "none":
					self.siblings(config.Tabname+":visible").hide();
					self.siblings(config.Tabname+":eq("+index+")").show();
				break;	
				
			}
			
			
		}
	});

}
//选项卡滑动
$.fn.Tab_=function(){
	var obj=$(this),times=300,delaytime=null
	if (obj.length==0) return false;
	obj.each(function(index, element) {
		var tab_obj=$(this)
		var li=tab_obj.find("li.change");
		if (li.length>0)
		{
			tab_obj.find("li:last-child").after("<span class='lines'></span>")
			obj.css("position","relative");
			var width	=	li.outerWidth();
			var lileft	=	li.position().left+parseInt(li.css("margin-left"))
			var lineobj	=	tab_obj.find(".lines")
			lineobj.css({"width":width,"left":lileft});
			
			tab_obj.find("li").bind("mouseenter",function(){
					clearTimeout(delaytime)
					var width	=	$(this).outerWidth();
					var left=$(this).position().left+parseInt($(this).css("margin-left"))
					lineobj.stop(true,false).animate({"width":width,"left":left},times)
			}).bind("mouseleave",function(){
				var self=$(this)
				delaytime=setTimeout(function(){
					if (!self.is(".change"))
					{
					var changeobj=self.siblings(".change")
					var left=changeobj.css("position","static").position().left+parseInt(changeobj.css("margin-left"));
					var width=changeobj.outerWidth()
					 lineobj.stop(true,false).animate({"width":width,"left":left},times)
					}
					
					
				},200)
			})
		}
	});	
}
 

 $.fn.hover_animate=function(obj){var time_delay=null,runlist=[],runlist_end=[],create_var=[],set_var=[],self=$(this);if(self.length===0||obj.aniobj.length===0){return}if(obj.set_class===""||typeof(obj.set_class)==="undefined"){$.extend(obj,{set_class:"hover"})}if(typeof(obj.delaytime)!=="number"||typeof(obj.delaytime)==="undefined"){$.extend(obj,{delaytime:100})}var fn={csschange:function(val){val=$.trim(val);if(val===""){return""}if(val.indexOf("{")<0||val.indexOf("}")<0){val=$.trim(val);var last_fh=val.lastIndexOf(";");if(last_fh+1===val.length){val=val.substring(0,last_fh);val="{'"+val.replace(/\:/g,"':'").replace(/\;/g,"','")+"'}"}else{val="{'"+val.replace(/\:/g,"':'").replace(/\;/g,"','")+"'}"}}return $.trim(val)}};$.each(obj.aniobj,function(index,val){if(val.length<6){return}var setobj=val[0],setobj_=setobj.replace(/\.|\ |\>/g,""),animate_css=fn.csschange(val[1]),animate_start=fn.csschange(val[2]),animate_end=fn.csschange(val[3]),animate_easing=val[4],animate_easing2=val[5],animate_delay=val[6],animate_delay2=val[7],animate_css_end=val[8],run="",run_end="";if(typeof(animate_delay)==="undefined"){animate_delay=0}if(typeof(animate_delay2)==="undefined"){animate_delay2=0}if(animate_css!==""){animate_css_=".css("+animate_css+")"}else{animate_css_=""}if(setobj===""){return}create_var.push("var _"+setobj_+"");if(setobj==="self"){set_var.push("_"+setobj_+"=[self]")}else{set_var.push("_"+setobj_+'=[self].find("'+setobj+'")')}if(animate_start!==""){run="_"+setobj_+animate_css_+".stop(true,false).delay("+animate_delay+").animate("+animate_start+","+animate_easing+")"}else{run="_"+setobj_+animate_css}if(animate_css_!==""||animate_start!==""){runlist.push(run)}if(animate_end!==""){if(typeof(animate_css)!="undefined"&&animate_css!=""&&animate_css.indexOf("display:block;")){if(animate_easing.indexOf("easing")==-1){run_end="_"+setobj_+".stop(true,false).delay("+animate_delay2+").animate("+animate_end+","+animate_easing2+",function(){$(this).css({'display':'none'});})"}else{run_end="_"+setobj_+".stop(true,false).delay("+animate_delay2+").animate("+animate_end+","+animate_easing2+")"}}else{run_end="_"+setobj_+".stop(true,false).delay("+animate_delay2+").animate("+animate_end+","+animate_easing2+")"}runlist_end.push(run_end)}});var selfobj=null;self.off(".s");$.each(create_var,function(index,val){eval(val)});self.on("mouseenter.s",function(){selfobj=$(this);$.each(set_var,function(index,val){eval(val.replace("[self]","selfobj"))});clearTimeout(time_delay);time_delay=setTimeout(function(){if(!selfobj.is(":animated")){selfobj.addClass(obj.set_class);$.each(runlist,function(index,val){eval(val)})}},obj.delaytime)}).on("mouseleave.s",function(){clearTimeout(time_delay);if(selfobj.is("."+obj.set_class)){$.each(runlist_end,function(index,val){eval(val)});selfobj.removeClass(obj.set_class)}})};


$.fn.hovers=function(){

	$("#quickFn .item").append("<i class='_guang'></i>")
	$("#quickFn .item").hover_animate(
		{
		  aniobj:
		  [
			 
			   [
				  "._guang",					//应用对象
				  "top:-576px;left:-516px;",//初始CSS
				  "left:100px;top:100px;",		//mouseenter动画CSS
				  "",			//mouseleave动画css
				  "1300",					//mouseenter 时间
				  "300"						//mouseleave 时间
			  ],
			  [
				  "self",					//应用对象
				  "",//初始CSS
				  "margin-top:-15px;",		//mouseenter动画CSS
				  "margin-top:0px;",			//mouseleave动画css
				  "300",					//mouseenter 时间
				  "300"						//mouseleave 时间
			  ]
		  ],
		  set_class:"hover_item"
		}
		
	);

	$(".PicList").find(".photo").append('<span class="border_top"></span><span class="border_right"></span><span class="border_bottom"></span><span class="border_left"></span>')
	$(".PicList li").hover_animate(
		{
		  aniobj:
		  [
			  [
				  ".photo",					//应用对象
				  "",//初始CSS
				  "width:100%;height:100%;margin-left:0;margin-top:0;",		//mouseenter动画CSS
				  "width:100%;height:100%;margin-left:0;margin-top:0;",			//mouseleave动画css
				  "400",					//mouseenter 时间
				  "200"						//mouseleave 时间
			  ]
			  ,[
				  ".photo img",					//应用对象
				  "",//初始CSS
				  "width:100%;height:100%;margin-left:0;margin-top:0;",		//mouseenter动画CSS
				  "width:100%;height:100%;margin-left:0;margin-top:0;",			//mouseleave动画css
				  "400",					//mouseenter 时间
				  "200"						//mouseleave 时间
				  ,200
				  ,300
			  ],
			  [
				  ".border_top",					//应用对象
				  "",//初始CSS
				  "width:100%;left:0;",		//mouseenter动画CSS
				  "width:0px;left:50%;",			//mouseleave动画css
				  "600",					//mouseenter 时间
				  "300"						//mouseleave 时间
			  ],
			  [
				  ".border_bottom",					//应用对象
				  "",//初始CSS
				  "width:100%;left:0;",		//mouseenter动画CSS
				  "width:0px;left:50%;",			//mouseleave动画css
				  "600",					//mouseenter 时间
				  "300"						//mouseleave 时间
			  ],
			  [
				  ".border_left",					//应用对象
				  "",//初始CSS
				  "height:100%;top:0;",		//mouseenter动画CSS
				  "height:0px;top:50%;",			//mouseleave动画css
				  "600",					//mouseenter 时间
				  "300"						//mouseleave 时间
			  ],
			  [
				  ".border_right",					//应用对象
				  "",//初始CSS
				  "height:100%;top:0;",		//mouseenter动画CSS
				  "height:0px;top:50%;",			//mouseleave动画css
				  "600",					//mouseenter 时间
				  "300"						//mouseleave 时间
			  ]
		  ],
		  set_class:"hover_"
		}	
	)
}
