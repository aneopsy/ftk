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
function appendLog(log,type){
	document.getElementById("logParent").style.display="block";
	var target=document.getElementById('log');
	var appendElement=document.createElement('div');
	var className='';
	className+=' alert';
	if(type=='s')
		className+=' alert-success';
	if(type=='i')
		className+=' alert-info';
	if(type=='e')
		className+=' alert-danger';
	if(type=='w')
		className+=' alert-warning';
	appendElement.setAttribute('class',className);
	var htmlToAdd='';
	htmlToAdd+=log;
	htmlToAdd+='<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>';
	appendElement.innerHTML=htmlToAdd;
	target.appendChild(appendElement);
	target.scrollTop = target.scrollHeight;
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
	//event listeenrs for events from parent frame
	handleSizingResponse = function(e) {
		console.log(e);
		if (e.data.log) {
			var log=e.data.log;
			var logType=e.data.logType;
			appendLog(log,logType);
		}
	}
	window.addEventListener('message', handleSizingResponse, false);
	//prevent form submission
	document.getElementById("submitForm").addEventListener("submit",function(e){
		e.preventDefault();
	});
	document.getElementById("submitButton").addEventListener("click",function(e){
		var postData = {};
		postData.name = "start";
		postData.id=document.getElementById("idInput").value;
		postData.delay=document.getElementById("delayTime").value;
		top.postMessage(postData, "*");
	});
}
function loaded(){
	setEventListener();
}
window.onload=loaded;
