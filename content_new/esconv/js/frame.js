/*
Copyright(c) 2016-2017 Paul THEIS
*/
var resultTbody='resultTbody';
var resultDiv="resultDiv";
var invisibleComma='<div class="fst789_invisibleComma">,</div>';
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
//clearing DOM for adding new data
function clearOldData(){
    document.getElementById("resultDiv").innerHTML='';
}
//for toggling visibility of export buttons
function visibilityToggle(){
    $('.visibilityToggle').fadeIn();
}
//function to export data to csv
function export_to_csv(data_holder) {
    document.getElementById("fst789_csv_download_form").content.value = document.getElementById(data_holder).innerText;
    document.getElementById("fst789_csv_download_form").submit();
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
    document.getElementById("submitForm").addEventListener("submit",function(e){
        e.preventDefault();
    });
    document.getElementById("submitButton").addEventListener("click",function(e){
		var postData = {};
		postData.name = "extractSendersConv";
		postData.url=document.getElementById("urlInput").value;
		top.postMessage(postData, "*");
        clearOldData();
        visibilityToggle();
    });
    //export to csv event listener
    document.getElementById("exportButton").addEventListener("click",function(e){
        export_to_csv("resultDiv");
    });
    //event listeenrs for events from parent frame
    handleSizingResponse = function(e) {
        console.log('message received from parent frame');
        console.log(e);
        if(e.data.task=='appendData'){
            var html=e.data.html;
            appendData(html);
        }
    }
    window.addEventListener('message', handleSizingResponse, false);
}
//append to tbody
function appendToTbody(html){
	$("#"+resultTbody).append(html);
	visibilityToggle();
}
//function for appending data on frame
function appendData(html){
	if(document.getElementById(resultTbody)){
		appendToTbody(html);
	}else{
		var tableHtml='';
		tableHtml+='<table class="table">';
		tableHtml+='<thead>';
			tableHtml+='<tr>';
				tableHtml+='<th colspan="4">';
				tableHtml+='Senders IDs';
				tableHtml+=invisibleComma;
				tableHtml+='</th>';
			tableHtml+='</tr>';
			tableHtml+='<tr>';
				tableHtml+='<th style="">';
					tableHtml+='#';
					tableHtml+=invisibleComma;
				tableHtml+='</th>';
				tableHtml+='<th>';
					tableHtml+='Name';
					tableHtml+=invisibleComma;
				tableHtml+='</th>';
                tableHtml+='<th>';
                    tableHtml+='Id';
                    tableHtml+=invisibleComma;
                tableHtml+='</th>';
				tableHtml+='<th>';
					tableHtml+='Link';
					tableHtml+=invisibleComma;
				tableHtml+='</th>';
			tableHtml+='</tr>';
		tableHtml+='</thead>';
		tableHtml+='<tbody id="'+resultTbody+'">';
		tableHtml+='</tbody>';
		tableHtml+='</table>';
		document.getElementById(resultDiv).innerHTML=tableHtml;
		appendToTbody(html);
	}
}
function loaded(){
    setEventListener();
}
window.onload=loaded;
