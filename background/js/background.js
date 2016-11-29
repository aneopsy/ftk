/*
//
//  Created by Paul THEIS.
//
*/
chrome.runtime.onInstalled.addListener(function(object) {
	chrome.storage.local.get('installed', function(a) {
		if (!a.installed) {
			chrome.storage.local.set({
				'installed': true
			}, function() {});
			if (window.Notification) {
				show(backgroundMessages.installed, main_url);
			}
			chrome.storage.local.set({
				'hideSeen': false
			}, function() {});
		}
	});
});

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.action == "restartTool") {
			sendResponse({
				farewell: "Completed"
			});
			var name=request.toolName;
			start(name);
		}
		if (request.action == "startTool") {
			sendResponse({
				farewell: "started"
			});
			var cname=request.cname;
			start(cname);
		}
	}
);
