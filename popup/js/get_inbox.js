function archiveAll(isTest) {
    var click = function(elem){
        (window.dispatchEvent) ? elem.dispatchEvent(new MouseEvent('click')) : elem.fireEvent("onclick");
    }

    var messages = document.querySelectorAll("li._k- span.accessible_elem");
    console.log("Found %s messages to archive in your inbox.", messages.length);

    archived = 0;

    for(var i = 300, numMessages = messages.length; i < numMessages; ++i){
        var message = messages[i];
        var archiveButton = message.parentNode.parentNode.parentNode.parentNode.firstChild.childNodes[1];

        console.log("message", i);
        console.log("message", message.firstChild);
        console.log("message", (!isTest) ? "archive" : "test archive");
        if (!isTest) click(archiveButton);

        archived++;
    }

    console.log("message", "total archived");
    console.log("message", archived);

    // if (!isTest) { location.reload(); }
}

function loadOlderMsgs() {
    var click = function(elem){
        (window.dispatchEvent) ? elem.dispatchEvent(new MouseEvent('click')) : elem.fireEvent("onclick");
    }

    var loadOlder = document.getElementsByClassName("uiMorePagerPrimary")[0];
    var loadOlderStr = loadOlder.innerHTML;
    if( -1 < loadOlderStr.indexOf("Load Older Threads") ){ click(loadOlder); }

    var messages = document.querySelectorAll("li._k- span.accessible_elem");
    numMessages = messages.length;

    console.log("message", "total displayed");
    console.log("message", numMessages);
}

loadOlderMsgs();
archiveAll();
