
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