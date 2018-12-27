var endPoint;
var companyList = [];
var appConfig;
$(function() {
	appConfig = jQuery.parseJSON(sessionStorage.getItem('appConfig'));
	$('#loginForm').hide();
	endPoint = $('#endpointUrl').val();
	$.when(ajaxTaskCompany).done(function() {
		checkCompany();
	});
});


function checkCompany(){
	var company = $('#companyCode').val();
	var companyCodeID;
	var staus = false;
	for(var i=0 ; i<companyList.length ; i++){
		if( ((companyList[i].companyCode).toUpperCase()).trim() == (company.toUpperCase().trim()) ){
			companyCodeID = companyList[i].companyCodeID;
			//http://localhost:9091/gcbg/token/authen?token=b698f0a3-17ae-43c8-831c-e64caab161ba&userId=26003308&companyCode=10
			staus = true;
			break;
		}
	}
	if(staus == true){
		login("authenMail");
	}else{
		$('#loginForm').show();
	}
}

function getReqTxnId(token,userId,companyCode){
	showSpinner();
	ajaxTaskReqTxnId= $.ajax({
    	type : "get",
    	cache: false,
    	data : {
    		"token" : token,
    		"userId" : userId,
    		"companyCode" : companyCode
    	},
    	url: appConfig.endPoint + "token/authen", 
    	success: function(data){
    		console.log("authen : " , jQuery.parseJSON(data.datas));
    		var datas = jQuery.parseJSON(data.datas);
    		parentRowClick("WORKFLOW",datas.transactionId,datas.formType);
    	}
    	}).done(function(data, textStatus, jqXHR) {
        });
}

function parentRowClick(type, id ,formType) {
	var data = {
		reqTxnId : id,
		type : type,
		formType : formType
	};
	sessionStorage.setItem("sendData", JSON.stringify(data));
	window.location = appConfig.baseUrl + "view/request-from.jsp";
}

