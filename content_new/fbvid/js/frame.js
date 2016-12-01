/*
 * Copyright(c) 2016-2017 Paul THEIS
 * */
 function toggleResizeButtons() {
 	var Resize = document.getElementById("resize-button");
 	var Maximize = document.getElementById("maximize-button");
     /*
     if (Resize.style["display"] == "block") {
         Resize.style["display"] = "none";
         Maximize.style["display"] = "block";
     } else {
         Resize.style["display"] = "block";
         Maximize.style["display"] = "none";
     }
     */
 }
function setEventListener(){
	//event listner for close button
	targetButton1 = "close-button";
	$('#' + targetButton1).click(function(e){
		var postData = {};
		postData.name = targetButton1;
		top.postMessage(postData, "*");
	});
	//to decrease height of iframe
	targetButton3 = "resize-button";
	$('#' + targetButton3).click(function() {
		var postData = {};
		postData.name = targetButton3;
		top.postMessage(postData, "*");
		toggleResizeButtons();
	});
	//to increase height of iframe
	targetButton4 = "maximize-button";
	$('#' + targetButton4).click(function() {
		var postData = {};
		postData.name = targetButton4;
		top.postMessage(postData, "*");
		toggleResizeButtons();
	});
	//scroll to top
	targetButton8 = 'scroll-to-top';
	$('#' + targetButton8).click(function() {
		var postData = {};
		postData.name = targetButton8;
		top.postMessage(postData, "*");
	});
	//scroll to bottom
	targetButton9 = 'scroll-to-bottom';
	$('#' + targetButton9).click(function() {
		var postData = {};
		postData.name = targetButton9;
		top.postMessage(postData, "*");
	});
	// for restarting tool
	document.getElementById("restartTool").addEventListener("click",function(e){
		var postData = {};
		postData.name = "restartTool";
		top.postMessage(postData, "*");
	});
	//prevent form submission
	document.getElementById("downloadVideo").addEventListener("submit",function(e){
		e.preventDefault();
	});
	//downloading Facebook videos
	document.getElementById("downloadVideoButton").addEventListener("click",function(e){
		var postData = {};
		postData.name = "downloadFacebookVideos";
		postData.url=document.getElementById("urlForDownloadingVideos").value;
		top.postMessage(postData, "*");
	});
}
function loaded(){
	setEventListener();
}
window.onload=loaded;
