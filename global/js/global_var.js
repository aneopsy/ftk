/*
 * Copyright(c) 2014-2016 Dinesh Rajkumar Bhosale of getmyscript.com
 * See license file for more information
 * Contact developers at mr.dinesh.bhosale@gmail.com
 * */
 // this file is accessible to all scripts that run in background and popup scripts as well
var main_url="http://fst.getmyscript.com";
var extensionName="Toolkit For Facebook";
// global manifest variable for accessing data stored in manifest file
var manifest = chrome.runtime.getManifest();
// regex for checking correct hostname
var hname_regex=/\.facebook\.com/ig;

var backgroundMessages={};
backgroundMessages.installed=extensionName+" "+manifest.version+" is installed.";
backgroundMessages.unableToExec="Unable to execute, please retry.";

var links={};
// link for buying premium version
links.BuyPremium='http://fst.getmyscript.com/buy-premium-version-of-facebook-social-toolkit/';
// link for resetting password
links.resetPWD='http://fst.getmyscript.com/user_accounts/reset_password.php';
// link for resetting license key
links.resetKEY='http://fst.getmyscript.com/user_accounts/log_in.php';
// link for google custome search engine
links.cse='http://cse.google.com/cse?cx=015864192404813234332:jkf4m0tvkuc&q=';

var popupMessages={};
popupMessages.cleared="All chrome local storage data is cleared";
popupMessages.unableToClear="Unable to clear chrome local storage data";

var emojiMessages={};
emojiMessages.copied="Text copied to your clipboard";
emojiMessages.cleared="Text cleared";
emojiMessages.added='Emoticon is added to text area';

var validateMsg={};
validateMsg.invalidEmail="Invalid email";
validateMsg.invalidKey="Invalid key";
validateMsg.incorrectKey ='Incorrect license key (If you don\'t have premium license key , then please visit fst.getmyscript.com)';
validateMsg.saved='Your license information is saved in memory. Thanks for purchasing premium version.';