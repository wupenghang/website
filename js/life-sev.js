;(function(){
	// $('.info_name:eq(3)').on('click',function(){
		var oT = document.getElementById('t1');
		var oBtn = document.getElementById('btn');
		var oI1 = document.getElementById('s1');
		var oI2 = document.getElementById('s2');
		var oI3 = document.getElementById('s3');
		var oI4 = document.getElementById('s4');
		var oI5 = document.getElementById('s5');
		var oI6 = document.getElementById('s6');
		jsonp();
		oBtn.onclick = function(){
			jsonp()
		}
		function jsonp(){
			jsonP({
				url:'http://api.asilu.com/weather/',
				data:{
					city:oT.value
				},
				cbName:'callback',
				success:function(json){
					oI1.innerHTML = json.city;
					oI2.innerHTML = json.pm25;
					oI3.innerHTML = json.date;
					oI4.innerHTML = json.weather[0].temp;
					oI5.innerHTML = json.weather[0].weather;
					oI6.innerHTML = json.weather[0].wind;
				},
			});
		}
	// })
	//url data cbname fn
	function jsonP(json){
		json = json || {};
		if(!json.url){
			console.log('url');
			return;
		}
		json.data = json.data || {};
		json.cbName = json.cbName || 'cb';
		fnName = 'jsonp_' + Math.random();
		fnName = fnName.replace('.','');
		window[fnName] = function(jsonD){
			json.success && json.success(jsonD);
			oHead.removeChild(oS);
		};
		json.data[json.cbName] = fnName;
		var arr = [];
		for( var name in json.data){
			arr.push(name + '='+ json.data[name]);
		}
		var oHead = document.querySelector('head');
		var oS = document.createElement('script');
		oS.src = json.url + '?' + arr.join('&');
		oHead.appendChild(oS);

	}
})();

$(function(){
	var timer1 = null;
	var timer2 = null;
	$('.info_name:eq(2)').on('click',function(){
		$('.life').show();
	});
	$('.close').on('click',function(){
		$('.life').hide();
	});
	$('.life-sev').on('click',function(ev){
		ev.stopPropagation();
	});
	$('.life').on('click',function(){
		clearInterval(timer1);
		clearInterval(timer2);
		timer1 = setInterval(function(){
			$('.life').css('background','rgba(100,100,100,0.6)');
		},100);
		timer2 = setInterval(function(){
			$('.life').css('background','rgba(200,200,200,0.6)');
		},140);
		setTimeout(function(){
			clearInterval(timer1);
			clearInterval(timer2);
			$('.life').css('background','rgba(200,200,200,0.6)');
		},1000);
	});
})
