/*
 * Copyright(c) 2016-2017 Paul THEIS
 *
 *
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
//setting event listeners on current frame
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
	document.getElementById("submitForm").addEventListener("submit",function(e){
		e.preventDefault();
	});
	document.getElementById("submitButton").addEventListener("click",function(e){
		var postData = {};
		postData.name = "post";
		var sticker=document.getElementById('sticker').value;
		if(sticker){
		postData.delay=document.getElementById('delay').value;
		postData.start=document.getElementById('start').value;
		postData.end=document.getElementById('end').value;
		postData.sticker=sticker;
		top.postMessage(postData, "*");
		}else{
			var message='Invalid Sticker ID';
			toastr.error(message);
		}
	});
}
function loaded(){
	//setting event listener
	setEventListener();
	//image picker
	$("select").imagepicker();
}
window.onload=loaded;
