function addEvent(obj,sEv,fn){
	if(obj.addEventListener){
		obj.addEventListener(sEv,fn,false);
	}else{
		obj.attachEvent('on'+sEv,fn,false);
	}
}
function addWheel(obj,fn){
	if(window.navigator.userAgent.indexOf('Firefox')!=-1){
		obj.addEventListener('DOMMouseScroll',wheel,false);
	}else{
		addEvent(obj,'mousewheel',wheel);
	}
	function wheel(ev){
		var oEvent=ev || event;
		//默认向下，向下返回true
		var bSin=oEvent.wheelDelta?oEvent.wheelDelta<0:oEvent.detail>0; 
		fn && fn(bSin);
		//火狐清除默认
		oEvent.preventDefault&&oEvent.preventDefault();
		//清除iE滚动条默认
		return false;
	}
}
	var aDiv = document.querySelectorAll('.container > div');
	var oCantainer = document.querySelector('container');
	var aNav = document.querySelectorAll('.nav > li');
	var currentIndex = 0;
	var bReady = false;
	var aLi = document.querySelectorAll('#skill_list > li');

	for(var i=0;i < aDiv.length;i++){
		aDiv[i].style.transform = `rotateX(-${i*90}deg) translateZ(300px)`;
		aDiv[i].style.opacity = 0;
		aDiv[0].style.opacity = 1;
		aNav[0].style.backgroundColor = 'white';
		addWheel(document,function(bSin){
			if (bReady) return;
			bReady = true;
			if(bSin){
				currentIndex--;
				if(currentIndex == -1){
					currentIndex == 3;
				}
			}else{
				currentIndex++;
				if(currentIndex == 4){
					currentIndex == 0;
				}
			}
			setPosition();
			setNav();	
			part2_move();
			part5_move();
		})
		aDiv[i].addEventListener('transitionend',function(){bReady = false;},false)
	};
	function setPosition(){
		for(var i=0;i<aDiv.length;i++){
			aDiv[i].style.opacity = 0;
			aDiv[i].style.transition = `0.4s`;
			aDiv[i].style.transform = `rotateX(${-i*90 - currentIndex*90}deg) translateZ(300px)`;

		}
		aDiv[Math.abs((currentIndex%aDiv.length-aDiv.length)%aDiv.length)].style.opacity = 1;
	}
	for(var i=0;i<aNav.length;i++){
		aNav[i].index=i;
		aNav[i].onclick=function(){
			if(currentIndex<=0){
				currentIndex=parseInt(currentIndex/aDiv.length)*aDiv.length-this.index;
			}else{
				currentIndex=Math.floor(currentIndex/aDiv.length)*aDiv.length+aDiv.length-this.index;
			}
			setNav();
			setPosition();
			part2_move();
			part5_move();
			part4_move();
		}
	}
	function setNav(){
		for(var i=0;i<aNav.length;i++){
				aNav[i].style.backgroundColor='';
			};
		aNav[Math.abs((currentIndex%aDiv.length-aDiv.length)%aDiv.length)].style.backgroundColor='white';
	}
	function rnd(n,m){
		return parseInt(Math.random()*(m - n) +n);
	}
	function part2_move(){
		if(currentIndex%4 == -1 || currentIndex%4 == 3){
			$('#skill_list li').each(function(i,oLi){
				$(oLi).css({left:100*(i%7),top:-210});
				$(oLi).stop().delay(70*rnd(5,20)).animate({top:70*(parseInt(i/7)+1)},{duration:1000,easing:'bounceBoth'});
			})
		}
	};
	function part5_move(){
		if(currentIndex%4 == 1 || currentIndex%4 == -3){
			$('.weixin').delay(1000).animate({top:150},{duration:500,easing:'bounceBoth',complete:function(){
				$('.weixin').animate({left:220},{duration:400});
			}});
			$('.qq').delay(500).animate({top:150},{duration:500,easing:'bounceBoth',complete:function(){
				$('.qq').animate({left:480},{duration:400});
			}});
			$('.email').delay(1000).animate({top:300},{duration:500,easing:'bounceBoth',complete:function(){
				$('.email').animate({left:220},{duration:400});
			}});
			$('.phone').delay(500).animate({top:300},{duration:500,easing:'bounceBoth',complete:function(){
				$('.phone').animate({left:480},{duration:400});
			}});
		}
	}
