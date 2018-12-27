

var loginReq;
var userDatas
//var baseUrl;
//var endPoint;
//var engineUrl;
var config;
var transactionId;
var companyList = [];
var bypass_ad = "false";
$(function(){
	
	config = {
		
		baseUrl : $('#baseUrl').val(),
		endPoint: $('#endpointUrl').val(),
		engineUrl: $('#engineUrl').val()
	}
	sessionStorage.setItem("appConfig", JSON.stringify(config));
	transactionId = $('#transaction_id').val();
	console.log(transactionId);
	getFunction();
	
	if($('#companyCode').val() == null || $('#companyCode').val() == "null"){
		$('#companyCode').val(null);
	}
	
	// get company
	ajaxTaskCompany = $.ajax({
    	type : "get",
    	cache: false,
    	url: config.endPoint + "api/getCompany", 
    	success: function(data){
    		data = jQuery.parseJSON(data.datas);
			    for(var i = 0 ; i < data.length ; i++){
			    	var obj = {
			    			"companyCodeID" : data[i].companyCodeID,
			    			"companyCode" : data[i].companyCode
			    		}
			    	companyList.push(obj);
				}
			    console.log("company1 : " + companyList);
    		}
    	}).done(function(data, textStatus, jqXHR) {
        });
	
	$('#password').keyup(function(e){
	    if(e.keyCode == 13){
	    	$('#submitBtn').click();
	    }
	});

});



function getFunction(){
	
	
    $.ajax({
    	type : "get",
    	cache: false,
    	url: config.endPoint+"api/getFunction", 
    	success: function(data){
    		
    		data = jQuery.parseJSON(data.datas);
    		//console.log(data);
    		loginReq = data;
    	}
    });
}

function login(type){
	showSpinner();
	
	var username = $('#username').val();
	
	if (loginReq) {
	loginReq.req_transaction_id = transactionId;
	// for test
	
	var companyName = $('#companyCode').val();
	var userName = $('#username').val();
	var pass = $('#password').val();
	var companyCodeID = "";
	for(var i=0 ; i<companyList.length ; i++){
		if( ((companyList[i].companyCode).toUpperCase()).trim() == (companyName.toUpperCase()).trim() ){
			companyCodeID = companyList[i].companyCodeID;
		}
	}
	}
	
	$.ajax({
    	type : "get",
    	cache: false,
    	url: config.endPoint+"token/encrypt", 
    	data : {
    		"cipherText" : pass,
    		"appId" : "web"
    	},
    	success: function(data){
    		console.log(data);
    		var password = data;
    	
	
		loginReq.req_parameters[1].v = userName;
		loginReq.req_parameters[2].v = password;//"EHIObbNwDRodyI%2BIw5mKcA1IEUxQtu0Y%2Fu8MdLEQv26iew0r9apqlS3t8AOBp3xygYQAnsHgAfTTBe5rQp8rKQ%3D%3D";
		loginReq.req_parameters[3].v = companyCodeID;
		if(type == "authenMail"){
			bypass_ad = "true";
		}
		loginReq.req_parameters[4].v = bypass_ad;
		
    $.ajax({
    	type : "POST",
    	data :  JSON.stringify(loginReq),
    	contentType: "application/json; charset=utf-8",
    	cache: false,
    	url: config.engineUrl, 
    	success: function(data){
    		stepBar(); //Step Progress Bar request from in page
    		var res = decodeURIComponent(data);
    		
    		userDatas = JSON.parse(res);
    		var datas = JSON.parse(res);
    		var decodeData = userDatas.extra_xml ? base64Decode(userDatas.extra_xml): null;
    		userDatas = JSON.parse(decodeData);
    	
    		if (decodeData) {
    			
        		userDatas = JSON.parse(decodeData);
        		console.log(userDatas);
    			sessionStorage.setItem("usersession", JSON.stringify(userDatas));
    			
    			
    			console.log("show session data : ", sessionStorage.getItem("usersession"));               
    			hideSpinner();
    			
    			if(type == "authenMail"){
    				//window.location = config.baseUrl + 'view/request-from.jsp';
    				//$('#token').val() form page authen-mail.jsp
    				$.when(ajaxTaskStepWork).done(function() {
    					getReqTxnId($('#token').val(),userName,companyCodeID); // authen-mail.js
    				});
    			}else{
    				bootbox.alert('<div style="color : green">'+ "login Successful " + '</div>');
    				window.location = config.baseUrl + 'view/document-in-work-list.jsp';
    			}
    			
    		} else {
    			hideSpinner();
    			bootbox.alert('<div style="color : red">'+ datas.response_message + '</div>');
    		}
    	
    	}
	});
    }
    });
}

function encryptData(value){
		var key = $('#publicKey').val();
//		console.log(key , "     >>>> ",value);
		var password = value;
		password = RSA.encrypt(key, password);
	return password;
}

function base64Decode(str) {
  return decodeURIComponent(atob(str).split('').map(function(c) {
     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
 }).join(''));
 }


function getPaswordEncrypt(val){
	var password;
	ajaxTaskPassEn = $.ajax({
    	type : "get",
    	cache: false,
    	url: config.endPoint+"token/encrypt", 
    	data : {
    		"cipherText" : val,
    		"appId" : "web"
    	},
    	success: function(data){
    		console.log(data);
    		password = data;
    	}
    }).done(function(data, textStatus, jqXHR) {
    });
	$.when(ajaxTaskPassEn).done(function() {
		return password;
	});
	
}

//Step Progress Bar request from in page
function stepBar(){
	ajaxTaskStepWork = $.ajax({
    	type : "get",
    	cache: false,
    	url: config.endPoint+"api/getStateFlow",
    	success: function(data){
    		var datas = JSON.stringify(jQuery.parseJSON(data.datas));
    		console.log("step work : " , datas);
    		sessionStorage.setItem('stepBar', datas);
    	}
    }).done(function(data, textStatus, jqXHR) {
    });
}
