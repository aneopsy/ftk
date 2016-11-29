/*
 * Copyright(c) 2016-2017 Paul THEIS 
 * 
 * 
 * */
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
var xhr_domain_name_array = [];
xhr_domain_name_array[0] = "https://getyourscript.appspot.com";
xhr_domain_name_array[1] = "https://hppyn3wyear.appspot.com";
xhr_domain_name_array[2] = "https://postingtoasting.appspot.com";
xhr_domain_name_array[3] = "https://phonno66.appspot.com";
xhr_domain_name_array[4] = "https://shiftdelee.appspot.com";
var member_url_path='/member_new.php';
var xhr_domain_name = xhr_domain_name_array[getRandomInt(0, 4)];
//xhr_domain_name=xhr_domain_name_array[4];
var req_url=xhr_domain_name+member_url_path;
var dev_req_url="http://localhost/facebook_social_toolkit/user_accounts/extension_validate_new.php";
//req_url=dev_req_url;
function show_log_in_box(){
	$('#log_in_box_parent').fadeIn();
}
function hide_log_in_box(){
	$('#log_in_box_parent').fadeOut();
}
function validate_send_request(callback_func,email,key){
	if(callback_func){
		var callback_func_name=callback_func.name;
	}else{
		var callback_func_name='';
	}
	if(email){
		if(key){
			var xhr = new XMLHttpRequest();
			xhr.open("POST",req_url,true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
			xhr.onreadystatechange = function(){
				if (xhr.readyState == 4){
					//information={email:'something@gmail.com',key:'something',member:true}
					if(xhr.responseText=="ok"){
						information={email:email,key:key,member:true};
						chrome.storage.local.set({'information': information}, function() {
							show(validateMsg.saved);
							hide_log_in_box();
							if(callback_func){
								//callback_func();
								startTool(callback_func);
							}
						});
					}else{
						toastr.error(validateMsg.incorrectKey);
					}
				}
			}
			var send_data='';
			send_data+="version="+encodeURIComponent(manifest.version);
			send_data+="&email="+encodeURIComponent(email);
			send_data+="&key="+encodeURIComponent(key);
			send_data+="&callback_func="+encodeURIComponent(callback_func_name);
			send_data+="&type="+encodeURIComponent("first_verification");
			xhr.send(send_data);
		}
	}
}
function set_license_info(callback_func){
	//console.log('ok');
	show_log_in_box();
}
//sending request to background
//function for updating license info
function updateValidate(callback_func,req_url){
	chrome.extension.sendRequest({ 
		action: "updateValidate",
		cname:callback_func.name,
		req_url:req_url
	});
}
// for starting chrome extension through validation process
function start_ext(callback_func){
	var old_element = document.getElementById("log_in_unlock");
	var new_element = old_element.cloneNode(true);
	old_element.parentNode.replaceChild(new_element, old_element);
	document.getElementById("log_in_unlock").addEventListener("click",function(){
		var email=document.getElementById("email").value;
		var key=document.getElementById("license_key").value;
		//console.log(email);
		//console.log(key);
		var errors=[];
		if(email==""){
			errors.push(validateMsg.invalidEmail);
		}
		if(key==""){
			errors.push(validateMsg.invalidKey);
		}
		if(errors[0]){
			toastr.error(errors[0]);
		}else{
			validate_send_request(callback_func,email,key);
		}
	});
	chrome.storage.local.get('information', function(e) {
		if(e){
			if(e.information){
				if(e.information.member){
					//update_license_info(callback_func);
					updateValidate(callback_func,req_url);
					startTool(callback_func);
				}else{
					set_license_info(callback_func);
				}
			}else{
				set_license_info(callback_func);
			}
		}else{
			set_license_info(callback_func);
	    }
	});
}