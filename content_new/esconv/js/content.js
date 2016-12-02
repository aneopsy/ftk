/*
Copyright(c) 2016-2017 Paul THEIS


*/
check();
var Total = 0
function start(){
	buildToolbox();
}
function resizeFrame() {
	var newClassName = document.getElementById(targetDivId).getAttribute("class");
	newClassName = newClassName.replace(" fst_container_resized", "");
	newClassName = newClassName.replace(" fst_container_maximized", "");
	newClassName += " fst_container_resized";
	document.getElementById(targetDivId).setAttribute("class", newClassName);
}
//for maximizing frame
function maximizeFrame() {
	var newClassName = document.getElementById(targetDivId).getAttribute("class");
	newClassName = newClassName.replace(" fst_container_resized", "");
	newClassName = newClassName.replace(" fst_container_maximized", "");
	newClassName += " fst_container_maximized";
	document.getElementById(targetDivId).setAttribute("class", newClassName);
}
//function to close frame and reload page
function closeAll() {
	document.getElementsByClassName("fst_container")[0].remove();
	window.location.reload();
}
//function for setting event listners
function setEventListener() {
	addEventListener("message", function(event) {
		if (event.origin + "/" == chrome.extension.getURL("")) {
			var eventToolName = event.data.name;
			console.log('event tool name is ' + eventToolName);
			if (event.data.data) {
				var eventData = event.data.data;
				console.log(eventData);
			}
			//for close button
			if (eventToolName == "close-button") {
				closeAll();
			}
			//scroll to top
			if (eventToolName == "scroll-to-top") {
				$("html, body").animate({
					scrollTop: 0
				}, "slow");
			}
			//scroll to bottom
			if (eventToolName == "scroll-to-bottom") {
				$("html, body").animate({
					scrollTop: $(document).height()
				}, "slow");
			}
			//to decrease size of frame
			if (eventToolName == "resize-button") {
				resizeFrame();
			}
			//to increase size of frame
			if (eventToolName == "maximize-button") {
				maximizeFrame();
			}
			//for restarting tool
			if(eventToolName=="restartTool"){
				restartTool(false);
			}
            //for extracting Senders IDs
            if (eventToolName == "extractSendersConv") {
                toastr.info(messages.wait);
                Parse("https://graph.facebook.com/v2.8/me?fields=conversations%7Bsenders%7D&access_token=" + event.data.url);
                toastr.success(messages.extracted);
            }
		}
	}, false);
}
//for adding UI components to DOM
function buildToolbox() {
	//adding stylesheet for to dom
	var cssURL = chrome.extension.getURL('/content_new/'+dirName+'/css/content.css');
	var styleElem = document.createElement('link');
	styleElem.setAttribute('href', cssURL);
	styleElem.setAttribute('rel', 'stylesheet');
	styleElem.setAttribute('type', 'text/css');
	document.body.appendChild(styleElem);
	//adding iframe to dom
	var frameURL = chrome.extension.getURL('/content_new/'+dirName+'/html/frame.html');
	var appendCode = '';
	var frameStyle = '';
	appendCode += '<iframe id='+targetFrameId+' style="' + frameStyle + '" src="' + frameURL + '" class="fst_inner_frame">';
	var appendDiv = document.createElement('div');
	appendDiv.innerHTML = appendCode;
	appendDiv.setAttribute('class', 'fst_fbvid_container fst_container');
	appendDiv.setAttribute('id', targetDivId);
	document.body.appendChild(appendDiv);
	setEventListener();
}
function append_html_code(html){
	var iframe = document.getElementById(targetFrameId);
	var data = {
		task: 'appendData',
		html:html
	}
	iframe.contentWindow.postMessage(data, '*');
}
function appendSenders(counter, name, gid){
	var id=gid;
	var appendString='';
	appendString+='<tr>';
	appendString+='<td>';
	appendString+=(counter);
	appendString+=invisibleComma;
	appendString+='</td>';

	appendString+='<td>';
	appendString+=name;
	appendString+='</a>';
	appendString+=invisibleComma;
	appendString+='</td>';

	appendString+='<td>';
	appendString+="<a target=\"_blank\" href=\"https://www.facebook.com\/";
	appendString+=id;
	appendString+="\"\>"+id;
	appendString+="\<\/a\>";
	appendString+=invisibleComma;
	appendString+='</td>';

	appendString+='<td>';
	appendString+="<a target=\"_blank\" href=\"https://www.facebook.com\/";
	appendString+=id;
	appendString+="\"\>https://www.facebook.com/"+id;
	appendString+="\<\/a\>";
	appendString+=invisibleComma;
	appendString+='</td>';

	appendString+='</tr>';
	append_html_code(appendString);
}

function Get(yourUrl) {
    var Httpreq = new XMLHttpRequest();
    Httpreq.open("GET", yourUrl, false);
    Httpreq.send(null);
    if (Httpreq.readyState == 4 && Httpreq.status == 200) {
        return Httpreq.responseText;
    } else {
        toastr.error(messages.unable_to_find);
    }
}

function Parse2(link) {
	var json_obj = Get(link);
	json_obj = JSON.parse(json_obj)
	for (x = 0; x < 25; x++) {
		Total++
		appendSenders(Total, json_obj['data'][x]['senders']['data'][0]['name'], json_obj['data'][x]['senders']['data'][0]['id'])
	}
	Parse2(json_obj['paging']['next'])
}

function Parse(link) {
	var json_obj = Get(link);
	json_obj = JSON.parse(json_obj)
	for (x = 0; x < 25; x++) {
		Total++
		appendSenders(Total, json_obj['conversations']['data'][x]['senders']['data'][0]['name'], json_obj['conversations']['data'][x]['senders']['data'][0]['id'])
	}
	Parse2(json_obj['conversations']['paging']['next'])
}
