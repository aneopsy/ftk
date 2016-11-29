/*
Copyright(c) 2016-2017 Paul THEIS 


*/
var langMsg={};
langMsg.change="Please change your Facebook language is set to English (US)";
langMsg.make="Make sure that your Facebook language is set to English (US)";
//function for checking if Facebook language is set to english
function languageCheck(){
	var error=[];
	try {
		foot=document.getElementById("pagelet_rhc_footer");
		var condition=foot.childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].data=="English (US)";
		if(!condition){
			error.push(langMsg.change);
		}
	} catch (e) {
		/* handle error */
		error.push(langMsg.make);
	}
	if(error.length){
		toastr.info(error[0]);
	}
}
languageCheck();
