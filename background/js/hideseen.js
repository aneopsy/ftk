/*
    Paul THEIS (AneoPsy)
*/
chrome.storage.local.get('hideSeen', function(a) {
	if (a.hideSeen) {
		function Interceptor(nativeOpenWrapper, nativeSendWrapper) {
			XMLHttpRequest.prototype.open = function() {
				this.allow =!(arguments[1]=="/ajax/mercury/change_read_status.php?dpr=1");
				return nativeOpenWrapper.apply(this, arguments);
			}
			XMLHttpRequest.prototype.send = function() {
				if (this.allow) return nativeSendWrapper.apply(this, arguments);
			}
		}
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.textContent = "(" + Interceptor + ")(XMLHttpRequest.prototype.open, XMLHttpRequest.prototype.send);";
		document.documentElement.appendChild(script);
		document.documentElement.removeChild(script);
		//console.log('hide seen is activated');
	} else {
		//console.log('hide seen is inactive');
	}
});
