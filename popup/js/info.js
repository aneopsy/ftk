/*
Copyright(c) 2016-2017 Paul THEIS
*/
//any script that pulls this file gets access to groups ids
//generaring csrf token and fb_dtsg
var fb_dtsg='';
var user_id='';
if (window.location.pathname.match("/pokes")) {
	fb_dtsg = document.documentElement.innerHTML.match(/,{"token":"(.*?)"/g)[0].replace(',{"token":"', '').replace('"', '');
} else {
	if (document.getElementsByName("fb_dtsg")) {
		if (document.getElementsByName("fb_dtsg")[0]) {
			fb_dtsg = document.getElementsByName("fb_dtsg")[0].value;
		}
	}
}
if (document.cookie.match(/c_user=(\d+)/)) {
	if (document.cookie.match(/c_user=(\d+)/)[1]) {
		user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
	}
};
//remove duplicates from array
var unique_array = function (arr) {
	var i, j, cur, found;
	for (i = arr.length - 1; i >= 0; i--) {
		cur = arr[i];
		found = false;
		for (j = i - 1; !found && j >= 0; j--) {
			if (cur === arr[j]) {
				if (i !== j) {
					arr.splice(i, 1);
				}
				found = true;
			}
		}
	}
	return arr;
};
//set local names
if (user_id) {
	var dates1 = new Date();
	var yur = dates1.getFullYear();
	var dt = dates1.getDate();
	var mon = dates1.getMonth();
	var localname_group_ids = "fst_gid_" + user_id + dt + '_' + mon + '_' + yur;
}
var group_id_extraction_title="Group Extraction Tool"
function group_info_parse(htmlstring){
	var pattern = /<body[^>]*>((.|[\n\r])*)<\/body>/im
	var array_matches = pattern.exec(htmlstring);
	htmlstring=array_matches[0];
	console.log(htmlstring);
	//function to prase html code of facebook gorup table and save to chrome storage
	var html_code = $.parseHTML( htmlstring );
	console.log(html_code);
	var html_parse=$(html_code[0]).find('#root > table > tbody > tr > td > div:nth-child(2)').html();
	var group_ids=html_parse.match(/groups\/\d+/g);
	for(var tempcountervar=0;group_ids[tempcountervar];tempcountervar++)
	{
		//removing /groups from gorup id arrays
		group_ids[tempcountervar]=group_ids[tempcountervar].replace("groups/","");
	}

}
function generate_information_array(silent)
{
	//function to get html code of facebook groups table from facebook
	var http4 = new XMLHttpRequest();
	var url4 = "https://www.facebook.com/parenthesetahiti/messages/";
	http4.open("GET", url4, true);
	http4.onreadystatechange = function (){
		if (http4.readyState == 4 && http4.status == 200){
			var htmlstring = http4.responseText;
            console.log(htmlstring.match("(<ul[^>]+class\\s*=\\s*(\"|')_33vf uiList _4kg\\2[^>]*>)(.*?)(</ul>)",'g'));

			if(htmlstring.match(/\["group\_\d+"\]/igm)){
				var group_id_array=htmlstring.match(/\["group\_\d+"\]/igm);
				group_id_array[0]=parseInt(group_id_array[temp_var].replace("\[\"group\_","").replace("\"\]",""));
				group_id_array=unique_array(group_id_array);
				console.log(group_id_array);
				console.log(JSON.parse('{"'+localname_group_ids+'":'+JSON.stringify(group_id_array)+'}'));
				chrome.storage.local.set(JSON.parse('{"'+localname_group_ids+'":'+JSON.stringify(group_id_array)+'}'), function(){
					//if silent is false then output message
					if(!silent){
						var message='Information extraction completed';
						//alert(message);
						console.log(message);
						toastr.info(message,group_id_extraction_title);
					}else{
						console.log("Information updated");
					}
				});
			}else{
				toastr.info("Unable to find group IDs, make sure you are member of at least one facebook group.",group_id_extraction_title);
				//no group IDs found, blank out group IDs
				var group_id_array=[];
				chrome.storage.local.set(JSON.parse('{"'+localname_group_ids+'":'+JSON.stringify(group_id_array)+'}'), function(){
					//if silent is false then output message
					console.log("no group IDs found, blanked out group IDs");
				});
			}
			http4.close;
		};
	};
	http4.send(null);
}
function start_extract_information(){
	get_item = localname_group_ids;
	generate_information_array(false);
	console.log("Start to extract information");
}
//call this function to start group id extraction
start_extract_information();
