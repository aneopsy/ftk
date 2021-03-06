/*
 * Copyright(c) 2015-2016 Paul THEIS
 *
 *
 * */
// remove all local storage data for a chrome extension , requires storage permission
function clearStorage(){
	try{
		chrome.storage.local.clear(function(c){
			toastr.info(popupMessages.cleared);
		});
	}catch(e){
		toastr.error(popupMessages.unableToClear);
	}
}
// callback for checking if current tool is premium tool or not
var pr=[
    "gtt",
	"gpt",
	"gpt2",
	"poofp",
	"caga",
	"maff",
	"sstaff",
	"polp",
	"jmugids",
	"sbwish",
	"syfaaf",
	"iyftjyg",
	"egemail",
	"egids",
    "esconv",
	"eulikes",
	"eppnoff",
	"epeoff",
	"rafgao",
	"capfr",
	"iafsao"];
// for checking is cname is part of tools
// that are currently
function isprt(cname){
	var ret = false;
	for(var counter = 0; counter<pr.length; counter++) {
		if(cname == pr[counter]) {
			ret = true;
			break;
		}
	}
	return ret;
}
function startTool(callback) {
	var cname = callback.name;
	var query = {
		active: true,
		currentWindow: true
	};
	function callbackOne(tabs) {
		var currentTab = tabs[0];
		var tabUrl = currentTab.url;
		var hr = document.createElement("a");
		hr.href = tabUrl;
		hname = hr.host;
		var newTab=true;
		if(hname.match(hname_regex)) {
			callback();
		} else {
			backStart(cname,newTab);
		}
		//start(cname,newTab);
		window.close();
	}
	chrome.tabs.query(query, callbackOne);
}
// function for sending message to background.js for creating a new tab
function backStart(cname) {
	var sendProp={};
	sendProp.action="startTool";
	sendProp.cname=cname;
	chrome.runtime.sendMessage(sendProp, function(response) {
		//console.log(response.farewell);
	});
}
function testTabUrl(callback) {
	var cname=callback.name;
	if(isprt(cname)){
		// sending for validation
		//start_ext(callback);
		startTool(callback);
	}else{
		// directly start tool
		startTool(callback);
	}
}
// for closing lgo in box when user clicks on close button
function closePremium(){
	$("#log_in_box_parent").fadeOut();
}
function hiseSeenHandler() {
	var isChecked = document.getElementById("hideSeen").checked;
	chrome.storage.local.set({
		'hideSeen': isChecked
	}, function() {
		//console.log('hide seen status changed to');
		//console.log(isChecked);
	});
}
// for setting one time event listeners
function setOneTimeEventListeners() {
	// event listener for search button
	/*document.getElementById("mainSearch").addEventListener("submit", function(e) {
		e.preventDefault();
		var searchStirng = document.getElementById("searchText").value;
		searchStirng = encodeURIComponent(searchStirng);
		var windowToOpen = links.cse + searchStirng;
		window.open(windowToOpen);
	});*/
	document.getElementById("fbvid").addEventListener("click", function(e) {
		testTabUrl(fbvid);
	});
	// facebook id extractor tool
	document.getElementById("idextractor").addEventListener("click", function(e) {
		testTabUrl(fbidext);
	});
	// invite your friends to like your page
	document.getElementById("iyftlyp").addEventListener("click", function(e) {
		testTabUrl(iyftlyp);
	});
	// invite your friends to your event
	document.getElementById("fbeit").addEventListener("click", function(e) {
		testTabUrl(fbeit);
	});
	// for inviting your friends to join your group
	document.getElementById("iyftjyg").addEventListener("click", function(e) {
		testTabUrl(iyftjyg);
	});
	// for accepting all friend requests
	document.getElementById("aafrao").addEventListener("click", function(e) {
		testTabUrl(aafrao);
	});
	// click all poke + poke back buttons
	document.getElementById("clickpoke").addEventListener("click", function(e) {
		testTabUrl(clickpoke);
	});
	// click all add friend buttons
	document.getElementById("caafb").addEventListener("click", function(e) {
		testTabUrl(caafb);
	});
	// for clicking on like buttons
	document.getElementById("calb").addEventListener("click", function(e) {
		testTabUrl(clicklike);
	});
	// click all join buttons
	document.getElementById("cajb").addEventListener("click", function(e) {
		testTabUrl(cajb);
	});
	// unlike all facebook pages
	document.getElementById("uafpao").addEventListener("click", function(e) {
		testTabUrl(uafpao);
	});
	// for unfriending all facebook friends at once
	document.getElementById("uaffao").addEventListener("click", function(e) {
		testTabUrl(uaffao);
	});
	// for unfollowing all facebook friends
	document.getElementById("uaff").addEventListener("click", function(e) {
		testTabUrl(uaff);
	});
	// Delete all comments
	document.getElementById("dacao").addEventListener("click", function(e) {
		testTabUrl(dacao);
	});
	// unfollow all facebook groups at once
	document.getElementById("uafgao").addEventListener("click", function(e) {
		testTabUrl(uafgao);
	});
	// remove all Facebook groups
	document.getElementById("rafgao").addEventListener("click", function(e) {
		testTabUrl(rafgao);
	});
	// cancel all pending friend requsts
	document.getElementById("capfr").addEventListener("click", function(e) {
		testTabUrl(capfr);
	});
	// ignore all friend suggestions at once
	document.getElementById("iafsao").addEventListener("click", function(e) {
		testTabUrl(iafsao);
	});
	// for group transfer tool
	document.getElementById("gtt").addEventListener("click", function(e) {
		testTabUrl(gtt);
	});
	// for group posting tool 1 (Graph API Explorer)
	document.getElementById("gpt").addEventListener("click", function(e) {
		testTabUrl(gpt);
	});
	// for group posting tool 2
	document.getElementById("gpt2").addEventListener("click", function(e) {
		testTabUrl(gpt2);
	});
	// for posting on own facebook pages
	document.getElementById("poofp").addEventListener("click", function(e) {
		testTabUrl(poofp);
	});
	// claim as group admin
	document.getElementById("caga").addEventListener("click", function(e) {
		testTabUrl(caga);
	});
	//for messaging all facebook friends
	document.getElementById("maff").addEventListener("click", function(e) {
		testTabUrl(maff);
	});
	// for posting on liked pages
	document.getElementById("polp").addEventListener("click", function(e) {
		testTabUrl(polp);
	});
	// joining multiple facebook groups using group ids
	document.getElementById("jmugids").addEventListener("click", function(e) {
		testTabUrl(jmugids);
	});
	// sending birthdya wishes
	document.getElementById("sbwish").addEventListener("click", function(e) {
		testTabUrl(sbwish);
	});
	// suggest your friends to add another friend
	document.getElementById("syfaaf").addEventListener("click", function(e) {
		testTabUrl(syfaaf);
	});
	// extract group emails
	document.getElementById("egemail").addEventListener("click", function(e) {
		testTabUrl(egemail);
	});
	// extrat friend ids
	document.getElementById("efids").addEventListener("click", function(e) {
		testTabUrl(efids);
	});
    // extrat page fan ids
    document.getElementById("efpfids").addEventListener("click", function(e) {
        testTabUrl(efpfids);
    });
	//extract group ids
	document.getElementById("egids").addEventListener("click", function(e) {
		testTabUrl(egids);
	});
    //extract senders of conv
    document.getElementById("esconv").addEventListener("click", function(e) {
        testTabUrl(esconv);
    });
	//extract user likes
	document.getElementById("eulikes").addEventListener("click", function(e) {
		testTabUrl(eulikes);
	});
	// extract public phone numbers of Facebook friends
	document.getElementById("eppnoff").addEventListener("click", function(e) {
		testTabUrl(eppnoff);
	});
	// extract public emails of facebook friends
	document.getElementById("epeoff").addEventListener("click", function(e) {
		testTabUrl(epeoff);
	});
	// send stickers to all facebook friends
	document.getElementById("sstaff").addEventListener("click", function(e) {
		testTabUrl(sstaff);
	});
	// preventing form submission for premium log in box
	document.getElementById("license_log_in_box").addEventListener("submit", function(e) {
		e.preventDefault();
	});
	// opening buy now page
	document.getElementById("buyPremium").addEventListener("click", function(e) {
		window.open(links.BuyPremium);
	});
	// opening password reset page
	document.getElementById("resetPWD").addEventListener("click", function(e) {
		window.open(links.resetPWD);
	});
	// opening license key reset page
	document.getElementById("resetKEY").addEventListener("click", function(e) {
		window.open(links.resetKEY);
	});
	// for closing premium log in box
	document.getElementById("closeBtn").addEventListener("click", function(e) {
		closePremium();
	});
	// for extension download links
	var crx=document.getElementsByClassName('crx');
	for(var counter=0;counter<crx.length;counter++){
		crx[counter].addEventListener("click",function(e){
			var link=e.srcElement.getAttribute('data-href');
			window.open(link);
		});
	}
	// event listener for hideseen checkbox
	document.querySelector('#hideSeen').addEventListener('change', hiseSeenHandler);
}
// update check boxes depending on local storage values
function updateChecked() {
	var hideSeenElem = document.getElementById("hideSeen");
	chrome.storage.local.get('hideSeen', function(a) {
		if (a.hideSeen) {
			hideSeenElem.checked = true;
		} else {
			hideSeenElem.checked = false;
		}
	});
}
// function for adding extra elements
function addElements(){
	document.getElementById("extensionVersion").innerText=manifest.version;
}
// for adding scrollbar on windows operating system
function osScroll(){
	var OSName="Unknown OS";
	if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
	if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
	if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
	if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";
	// console.log('Your OS: '+OSName);
	if(OSName=="Windows"){
		$(".innerContainer").css('padding-right','20px');
	}
}
// function to be executed when page is loaded
function loaded() {
	addElements();
	osScroll();
	setOneTimeEventListeners();
	updateChecked();
}
window.onload = loaded;
