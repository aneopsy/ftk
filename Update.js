function Get(yourUrl) {
    var Httpreq = new XMLHttpRequest();
    Httpreq.open("GET", yourUrl, false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}

function Output(total, name, id) {
	console.log(total +' ; ' + name + ' ; ' + id)
}

function Parse2(link) {
	var json_obj = Get(link);
	json_obj = JSON.parse(json_obj)
	for (x = 0; x < 25; x++) {
		Total++
		Output(Total, json_obj['data'][x]['senders']['data'][0]['name'], json_obj['data'][x]['senders']['data'][0]['id'])
	}
	Parse2(json_obj['paging']['next'])
}

function Parse(link) {
	var json_obj = Get(link);
	json_obj = JSON.parse(json_obj)
	for (x = 0; x < 25; x++) {
		Total++
		Output(Total, json_obj['conversations']['data'][x]['senders']['data'][0]['name'], json_obj['conversations']['data'][x]['senders']['data'][0]['id'])
	}
	Parse2(json_obj['conversations']['paging']['next'])
}

var Total = 0

Parse("https://graph.facebook.com/v2.8/me?fields=conversations%7Bsenders%7D&access_token=EAACEdEose0cBAJyMqh3kXOSHGT47xycoWHJEn3EetrWMTOFgrQJ622rpRMfKJcaFfnPpymwqgOGR4XLZAjXZBZAvuHaR6kpsetTEH4Ym20hnjPybkBoTpvV3J0mWfoggGYYVgjW3eWDoJlrVo96OoxxZBp7dFHPdg4IT8h7QVwZDZD")
file.close();
