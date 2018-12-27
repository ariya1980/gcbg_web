//var typeEvent = "VIEW" ; var txnId = "5be9386c723e425164528f23";
//var typeEvent = "CREATE";
//var typeEvent = "WORKFLOW";var txnId = "5becdd04d73e121f3cb90a2e";
//var typeEvent = "MODIFY" ; var txnId = "5becdc0cd73e121f3cb90a10";
var typeForm;
var typeEvent; 
var txnId;
var uploadNum = 0;
var statusEvent;
var buttonEventSubmit;
var requestType;
var amountValue = [];
var dataFormIn;
var formType;
var approverLevel = [];
var dataReq;
// var reqtypeChange = false;
$(function(){
	
	// var requestType = $('#requestType').val();
	txnId = jQuery.parseJSON(sessionStorage.getItem('sendData')).reqTxnId;
	typeEvent = jQuery.parseJSON(sessionStorage.getItem('sendData')).type;
	formType = jQuery.parseJSON(sessionStorage.getItem('sendData')).formType;
	$('#man_id').val(usersession.manager.id);
	$('#man_name').val(usersession.manager.name);
	$('#man_email').val(usersession.manager.email);
// console.log(usersession);
// console.log(usersession.userName);
	checkOpenCloseEnd();
	getCurrencyReqForm();
	getYesterday();
	$.when(ajaxTaskCurrencyReqForm).done(function() {
		addAmount(0);
		addConAmount(0);
	});
	
	if(formType == "IN"){
		$('#approverGroup').hide();
		$('#treasuryDueDateGroup').hide();
		$('#poaGroup').hide();
	}else{
		$('#approverGroup').show();
		$('#treasuryDueDateGroup').show();
		$('#issue').prop("checked",true);
		$('#headText').text("Request From Out");
		for(var i=0 ; i<usersession.level.length ; i++){
			if(usersession.userLevel == "60"  || usersession.userLevel == "50"){
				if(usersession.level[i].level == "40" || usersession.level[i].level == "30"){
					approverLevel.push(usersession.level[i]);
				}
			}else if(usersession.userLevel == "40"){
				if(usersession.level[i].level == "30" || usersession.level[i].level == "20"){
					approverLevel.push(usersession.level[i]);
				}
			}else if(usersession.userLevel == "30"){
				if(usersession.level[i].level == "20"){
					approverLevel.push(usersession.level[i]);
				}
			}
		}
		
		$('#poaGroup').show();
		getPoa();
	}
	
	if(typeEvent.toUpperCase() == "CREATE"){
		setBank("bankCode");
		setDocType("docType");
		setCompanyAll("companyCode");
		setRequestTypeFromIn("requestType");
		getSearchName("V");
		getTypeOfGuaratee();
		checkOtherTypeOfGua();
		setApprover(approverLevel);
		$('#requestType').prop("disabled",true);
		$('#buttonModify').show();
		$('#btnRemark').hide();
		$('#returnContactInfo').hide();
		$('#spinner').hide();
	}else if(typeEvent.toUpperCase() == "WORKFLOW"){
	getDataReqFromIn();
	$.when(ajaxTasReqFromIn).done(function() {
		requestType = dataFormIn.requestType;

		statusEvent  = dataFormIn.status;
		getDataReqFromInModify();
	
	});
	
	}else if(typeEvent.toUpperCase() == "VIEW"){
		getDataReqFromInModify();
	}else if(typeEvent.toUpperCase() == "MODIFY"){
		getDataReqFromInModify();
	}
	
	$('#remarkDate').text(getDateNow());
	$('#requestorName').text(usersession.userName);
	
	$('.browseFile').click(function(){
		$('#fileBrows').click();
	})
	
	// Data Tool
	//---//
	$('#effectiveDate').datepicker({
		uiLibrary: 'bootstrap4',
  	  	format: 'dd/mm/yyyy'
    });
	$('#effectiveDate').click(function(){
		$('#formEffectiveDate button').click();
	});
	//---//
	$('#expiredDate').datepicker({
		uiLibrary: 'bootstrap4',
		format: 'dd/mm/yyyy'
	});
	$('#expiredDate').click(function(){
		$('#formExpiredDate button').click();
	});
	//---//
	$('#issueDate').datepicker({
		uiLibrary: 'bootstrap4',
		format: 'dd/mm/yyyy'
	});
	$('#issueDate').click(function(){
		$('#formIssueDate button').click();
	});
	//---//
	$('#expectedDueDate').datepicker({
		uiLibrary: 'bootstrap4',
		format: 'dd/mm/yyyy'
	});
	$('#expectedDueDate').click(function(){
		$('#expectedDueDateGroup button').click();
	});
	//---//
	$('#treasuryDueDate').datepicker({
		uiLibrary: 'bootstrap4',
		format: 'dd/mm/yyyy'
	});
	$('#treasuryDueDate').click(function(){
		$('#treasuryDueDateGroup button').click();
	});
	//---//
	
	
	
	
//	$('#effectiveDate').change(function(){
//		setCalculateDate();
//	});
//	$('#expiredDate').change(function(){
//		setCalculateDate();
//	});
	
	
	$('#requestType').change(function(){
		// reqtypeChange = true;
		if(typeEvent.toUpperCase() == "MODIFY"){
			var requestTypeSession = $('#requestType').val();
			sessionStorage.setItem('requestTypeSession', requestTypeSession);
			location.reload();
			// getDataReqFromInModify();
		}
	});
});


// get Request From In
function getDataReqFromIn(){
	showSpinner();
	ajaxTasReqFromIn =  $.ajax({
    	type : "post",
    	cache: false,
    	url: appConfig.endPoint + "search/detailByTXN", 
    	data : {"Id" : txnId},
    	success: function(data){
    		hideSpinner();
    		var dataReq = jQuery.parseJSON(data.datas);
    		console.log("data request : " ,JSON.stringify(dataReq));
    		dataFormIn = dataReq;
    		
    	}
    }).done(function(data, textStatus, jqXHR) {
    });
}




// set Attachment File
function setAttachmentFile(data,id){
	var html = "";
	for(var i=0 ; i<data.length ; i++){
		if(data[i].transactionId == txnId){
			addAttachFile(uploadNum,data[i].fileName,(data[i].fileSize/1000)/1000,data[i].fileSize,setDate(data[i].updated));
		}
			addAttachFileStored(data[i].fileName,(data[i].fileSize/1000)/1000,data[i].fileSize,setDate(data[i].updated));
	}
}


var loadFirst = 0;
function getDataReqFromInModify(){
	$('#headText').text("Document In");
	//$('#requestNoDiv').hide();
	var urlTxt;
	if(statusEvent == "DRAFT" || statusEvent == "WAITING_APPROVE" || statusEvent == "WAITING_ACCEPT" || statusEvent == "COMPLETE" || statusEvent == "REJECT" ){
		urlTxt = appConfig.endPoint + "search/detailByTXN";
	}else{
		if(requestType == "CREATE" || typeEvent == "VIEW"){
			urlTxt = appConfig.endPoint + "search/detailByTXN";
		}else{
			urlTxt = appConfig.endPoint + "search/bDetailById";
		}
		
	}
	showSpinner();
	$.ajax({
    	type : "post",
    	cache: false,
    	url: urlTxt, 
    	data : {"Id" : txnId},
    	success: function(data){
    		
    		hideSpinner();
    		dataReq = jQuery.parseJSON(data.datas);
    		console.log("data request : " ,JSON.stringify(dataReq));
    		
    		userStep(dataReq)// get user step
    		$.when(ajaxTaskUserStep).done(function() {
    			setStepBar(dataReq); // set step bar // step-bar.js
    		});
    		
    		$('#req_id').val(dataReq.requestorId);
    		$('#req_name').val(dataReq.requestorName);
    		$('#req_email').val(dataReq.requestorEmail);
    		$('#reqTxnId').val(dataReq.reqTxnId);
    		getDataAttachment(dataReq.bgNo);
   			getDataRemarkByBgNo(dataReq.bgNo);
   			getTypeOfGuaratee(dataReq.typeOfGuarantee[0]);
   			if(typeEvent.toUpperCase()  == "MODIFY" || typeEvent.toUpperCase()  == "VIEW"){
   				
   			}else{
   				getDataButton();
   			}
   			
   			$.when(ajaxTaskTypeOfGua).done(function() {
   				$('#typeOfGuaranteeOther').val(dataReq.typeOfGuaranteeOther);
   			});
   			setDataReqFromInModify(dataReq);
   			
    		// getDataButton();

    	}
    });
}

// set Data Request From In Modify
function setDataReqFromInModify(data){
	
	$('#requestNo').val(data.requestNo);
	$('#requestStatus').val(data.status);
	$('#lastUpdate').val(setDate(data.created));
	if(data.formType == "IN"){
		$('#receipt').prop("checked",true);
		$('#issue').prop("checked",false);
	}else{
		$('#receipt').prop("checked",false);
		$('#issue').prop("checked",true);
	}
	setCompanyAll("companyCode","",data.companyCode);
	setBank("bankCode","",data.bankCode);
			setDocType("docType","",data.docType);
			$('#docTypeName').val(data.docTypeName);
			$('#requestorName').text(data.requestorName);
			$('#bgNo').val(data.bgNo);
			$('#amendNo').text(data.amendNo);
			
			if(data.amendType == "DECREASE" || data.amendType == undefined){
				$('#amendment').prop("checked",true);
			}else{
				$('#amentEdit').prop("checked",true);
			}
			
			$('#amountTbody').empty();
			for(var i=0 ; i<data.amounts.length ; i++){
				addAmount(0,data.amounts[i].amount,data.amounts[i].currencyCode);
				$('#amontTr1').remove();
			}
			
			$('#openEnd').val(data.openEnd);
			if(data.openEnd == "CLOSE"){
				$('#formExpiredDate').show();
			}
			
			$('#effectiveDate').val(setDate(data.effectiveDate));
			if(data.expiredDate == "" || data.expiredDate == undefined){
				$('#expiredDate').val(null);
			}else{
				$('#expiredDate').val(setDate(data.expiredDate));
			}
			$('#periodYear').val(data.periodYear);
			$('#periodMonth').val(data.periodMonth);
			$('#periodDay').val(data.periodDay);
			$('#issueDate').val(setDate(data.issueDate));
			
			if(data.vendorType.toUpperCase() == "VENDOR"){
				$('#vender').prop("checked",true);
			}else{
				$('#customer').prop("checked",true);
			}
			$.when(ajaxTaskDocType).done(function() {
				getSearchName(data.vendorCode);
				$.when(ajaxTaskSearchName).done(function() {
					setDataVenCus();
				});
			});
			$('#ownerId').val(data.ownerId);
			$('#owner').val(data.owner);
			$('#ownerLastName').val(data.ownerLastName);
			$('#ownerContactInfo').val(data.ownerContactInfo);
			
			$('#poSoNo').val(data.poSoNo);
			$('#buyerName').val(data.buyerName);
			$('#buyerEmployeeID').val(data.buyerEmployeeID);
			$('#contractNo').val(data.contractNo);
			
			$('#conAmountTbody').empty();
			for(var i=0 ; i<data.contractAmounts.length ; i++){
				addConAmount(0,data.contractAmounts[i].contractAmount,data.contractAmounts[i].contractCurrencyCode,data.contractAmounts[i].percentOfGuarantee);
				$('#conAmontTr1').remove();
			}
			
			$('#projectJob').val(data.projectJob);
			$('#expectedDueDate').val(setDate(data.expectedDueDate));
			
			
			var reqType = [];
    		if(loadFirst == 0){
    			var selected = sessionStorage.getItem('requestTypeSession');
    			if(selected == "null"){
    				setRequestTypeModify(data.status,data.requestType);
    			}else{
    				setRequestTypeModify(data.status,selected);
    			}
    			loadFirst++;
    		}else{
    			var selected = sessionStorage.getItem('requestTypeSession');
    			setRequestTypeModify(data.status,selected);
    		}
    		sessionStorage.setItem('requestTypeSession', null);
    		$.when(ajaxTaskRequestTypeModify).done(function() {
    			statusEvent = data.status;
    			var readOnly = data.readOnly;
        		if(readOnly == "N" || readOnly == undefined){
        			if(data.status.toUpperCase() == "NEW" || data.status.toUpperCase() == "RETURN"){
        				
    	    				disabledAll();
    	    				$('#requestType').prop("disabled",true);
    						$('#remarkHistory').show();
    						$('#buttonModify').hide();
        				
        			}else if(data.status.toUpperCase() == "DRAFT" && data.requestType.toUpperCase() == "CREATE"){
	        				$('#requestType').prop("disabled",true);
							$('#remarkHistory').hide();
							if(buttonEventSubmit == true){
        						$('#buttonModify').hide();
        					}else{
        						$('#buttonModify').show();
        					}
        			}else if(data.status.toUpperCase() == "REJECT"){
        				disabledAll();
        				$('#remarkHistory').show();
        			}else{
        				var type = $('#requestType').val();
        				if(type == "DECREASE"){
        					disabledAll();
        					if(data.status.toUpperCase() == "VALID"){
        						$('#requestType').prop("disabled",false);
        					}else{
        						$('#requestType').prop("disabled",true);
        					}
        					// $('#remarkHistory').toggle();
        					$('#fileBrowsBox').show();
        					$('.btnRemoveFile').show();
        					$('#remarkCreate').show();
        					$('#buttonCreate').hide();
        					//$('#issueDate').prop("disabled",false);
        					//$('#effectiveDate').prop("disabled",false);
        					//$('#expiredDate').prop("disabled",false);
        					//$('#formEffectiveDate .border-left-0').show();
        					//$('#formExpiredDate .border-left-0').show();
        					//$('#formIssueDate .border-left-0').show();
        					$('#amountTbody .btnEvent').show();
        					$('#amountTbody input').prop("disabled",false);
        					$('#amountTbody select').prop("disabled",false);
        					$('#remarkHistory').hide();
        					$('.amountCurreny').prop("disabled",true);
        					$('.botSellingRate').prop("disabled",true);
        					$('.btnEvent').hide();
        					if(buttonEventSubmit == true){
        						$('#buttonModify').hide();
        					}else{
        						$('#buttonModify').show();
        					}
        					
        				}else if(type == "EXTEND"){
        					disabledAll();
        					if(data.status.toUpperCase() == "VALID"){
        						$('#requestType').prop("disabled",false);
        					}else{
        						$('#requestType').prop("disabled",true);
        					}
        					$('#fileBrowsBox').show();
        					$('.btnRemoveFile').show();
        					$('#remarkCreate').show();
        					// $('#buttonCreate').hide();
        					$('#issueDate').prop("disabled",false);
        					$('#effectiveDate').prop("disabled",false);
        					$('#expiredDate').prop("disabled",false);
        					$('#formEffectiveDate .border-left-0').show();
        					$('#formExpiredDate .border-left-0').show();
        					$('#formIssueDate .border-left-0').show();
        					$('#remarkHistory').hide();
        					if(buttonEventSubmit == true){
        						$('#buttonModify').hide();
        					}else{
        						$('#buttonModify').show();
        					}
        				}else if(type == "INCREASE"){
        					disabledAll();
        					$('#buttonCreate').hide();
        					$('.amountCurreny').prop("disabled",true);
        					$('.btnEvent').hide();
        					$('#amountTbody .btnEvent').hide();
        					$('#amountTbody select').prop("disabled",true);
        					if(data.status.toUpperCase() == "VALID"){
        						$('#requestType').prop("disabled",false);
        					}else{
        						$('#requestType').prop("disabled",true);
        					}
        					$('#remarkHistory').hide();
    						$('#fileBrowsBox').show();
        					$('.btnRemoveFile').show();
        					$('#remarkCreate').show();
        					if(buttonEventSubmit == true){
        						$('#buttonModify').hide();
        						
        					}else{
        						$('#buttonModify').show();
        						$('#formEffectiveDate .border-left-0').show();
            					$('#formExpiredDate .border-left-0').show();
            					$('#formIssueDate .border-left-0').show();
            					$('#issueDate').prop("disabled",false);
            					$('#effectiveDate').prop("disabled",false);
            					$('#expiredDate').prop("disabled",false);
            					$('#amountTbody input').prop("disabled",false);
            					$('.botSellingRate').prop("disabled",true);
            					
        					}
        					
        				}else if(type == "RETURN"){
        					disabledAll();
        					$('#returnContactInfo').show();
        					if(data.status.toUpperCase() == "VALID"){
        						$('#requestType').prop("disabled",false);
        						$('#returnContactInfo input').prop("disabled",false);
        					}else{
        						$('#requestType').prop("disabled",true);
        					}
        					$('#remarkHistory').hide();
        					$('#fileBrowsBox').show();
        					$('.btnRemoveFile').show();
        					$('#remarkCreate').show();
        					if(buttonEventSubmit == true){
        						$('#buttonModify').hide();
        					}else{
        						$('#buttonModify').show();
        					}
        					
        				}else{
        					disabledAll();
        					$('.btnEvent').hide();
    						if(buttonEventSubmit == true){
    							$('#buttonModify').hide();
        						$('#fileBrowsBox').show();
            					$('.btnRemoveFile').show();
            					$('#remarkCreate').show();
        					}else{
        						$('#buttonModify').show();
        						$('#remarkHistory').show();
        					}
        				}
        				
        				if(data.status.toUpperCase() == "COMPLETE"){
        					disabledAll();
        					if(type == "RETURN"){
        						$('#returnContactInfo').show();
        					}
        					$('#remarkHistory').show();
        					$('#buttonModify').hide();
// $('#fileBrowsBox').hide();
// $('.btnRemoveFile').hide();
// $('#remarkCreate').hide();
        					
        				}else if(data.status.toUpperCase() == "WAITING_SUBMIT"){
        					disabledAll();
        					$('#fileBrowsBox').show();
        					$('.btnRemoveFile').show();
        					$('#remarkCreate').show();
        				}
        				
        			}

        		}else{
        			disabledAll();
        			$('#remarkHistory').show();
        		}
    			if (data.status.toUpperCase() == "WAITING_ACCEPT"){
    				disabledAll();
    				$('#fileBrowsBox').show();
					$('.btnRemoveFile').show();
					$('#remarkCreate').show();
    				$('#buttonModify').hide();
    				
    			}
    			
    			$('#spinner').hide();
    		});
    		
}

function submitBtnForRender(id){
	var jsonRequest = $('#'+id).val();
	submitFrom(jsonRequest);
}


function getDataForm(){
	var requestType = $('#requestType').val();
	var requestNo = $('#requestNo').val();
	var requestStatus = $('#requestStatus').val();
	var lastUpdate = $('#lastUpdate').val();
	var formType = $('input[name="formType"]:checked').val();
	var companyCode = $('#companyCode').val();
	var companyName = $('#companyCode').select2('data')[0].text;
	var bankCode = $('#bankCode').val();
	var bankName = $('#bankCode').text();
	var docType = $('#docType').val();
	var docTypeName = $('#docTypeName').val();
	var typeOfGuarantee = [];
	$.each($('input[name="typeOfGuarantee"]:checked'), function(){            
		typeOfGuarantee.push($(this).val());
    });
	var typeOfGuaranteeOther = $('#typeOfGuaranteeOther').val();
	var requestorName = $('#requestorName').text();
	var bgNo = $('#bgNo').val();
	var amendNo = $('#amendNo').text();
	if(amendNo == "N/A"){
		amendNo = "0";
	}
	var amendType = "DECREASE";
	
	
	$('#tableAmount input').prop("disabled",false);
	$('#tableAmount select').prop("disabled",false);
	var amountsList = $('#tableAmount :input').serializeArray();
	$('#tableAmount input').prop("disabled",true);
	$('#tableAmount select').prop("disabled",true);
	var x = amountsList.length/2;
	var z = 0;
	var amounts = [];
	for(var i=0 ; i<x ; i++){
		var obj = {
				"amount" : amountsList[0+z].value,
				"currencyCode" : amountsList[1+z].value
		}
		amounts.push(obj);
		z += 2;
	}
	var openEnd = $('#openEnd').val();
	var effectiveDate = setFormatDate($('#effectiveDate').val());
	var expiredDate = setFormatDate($('#expiredDate').val());
	var periodYear = $('#periodYear').val();
	var periodMonth = $('#periodMonth').val();
	var periodDay = $('#periodDay').val();
	var issueDate = setFormatDate($('#issueDate').val());
	
	var vendorType = $('input[name="vendorType"]:checked').val();
	if(vendorType == "V"){
		vendorType = "Vendor";
	}else{
		vendorType = "Customer";
	}
	var vendorCode = $('#vendorCode').val();
	var vendorProfile = $('#vendorProfile').val();
	var vendorAddress = $('#vendorAddress').val();
	var vendorCity = $('#vendorCity').val();
	var vendorCountry = $('#vendorCountry').val();
	var vendorPostCode = $('#vendorPostCode').val();
	
	var ownerId = "";
	var owner = $('#owner').val();
	var ownerLastName = $('#ownerLastName').val();
	var ownerContactInfo = $('#ownerContactInfo').val();
	
	
	
	var poSoNo = $('#poSoNo').val();
	var contractNo = $('#contractNo').val();
	var buyerEmployeeID = $('#buyerEmployeeID').val();
	var buyerName = $('#buyerName').val();
	$('#contractAmountTable input').prop("disabled",false);
	$('#contractAmountTable select').prop("disabled",false);
	var contractAmountsList = $('#contractAmountTable :input').serializeArray();
	$('#contractAmountTable input').prop("disabled",true);
	$('#contractAmountTable select').prop("disabled",true);
	var x = contractAmountsList.length/3;
	var z = 0;
	var contractAmounts = [];
	for(var i=0 ; i<x ; i++){
		var obj = {
				"contractCurrencyCode" : contractAmountsList[1+z].value,
				"contractAmount" : contractAmountsList[0+z].value,
				"percentOfGuarantee" : contractAmountsList[2+z].value,
		}
		contractAmounts.push(obj);
		z += 3;
	}
	var projectJob = $('#projectJob').val();
	var expectedDueDate = setFormatDate($('#expectedDueDate').val());
	
	var attachmentsList = $('#attachFile :input').serializeArray();
	var x = attachmentsList.length/3;
	var z = 0;
	var attachments = [];
	for(var i=0 ; i<x ; i++){
		var obj = {
				"fileName" : attachmentsList[0+z].value,
				"size" : attachmentsList[1+z].value,
				"uploadOn" : setFormatDate(attachmentsList[2+z].value)
		}
		attachments.push(obj);
		z += 3;
	}
	var remark = $('textarea#remark').val();
	var remarkDate = $('#remarkDate').text();
	var remarks = [{
		"remark" : remark,
		"remarkDate" : setFormatDate(remarkDate)
		}];
	
	if(requestType == "RETURN"){
		var returnName = $('#returnName').val();
		var returnAddress = $('#returnAddress').val();
		var returnCity = $('#returnCity').val();
		var returnCountry = $('#returnCountry').val();
		var returnPostCode = $('#returnPostCode').val();
	}else{
		var returnName = "";
		var returnAddress = "";
		var returnCity = "";
		var returnCountry = "";
		var returnPostCode = "";
	}
	
	data = {
			"requestNo" : requestNo,
			"requestType" : requestType,
			"requestStatus" : requestStatus,
			"lastUpdate" : lastUpdate,
			"formType" : formType,
			"companyCode" : companyCode, 
		    "companyName" : companyName, 
			"bankCode" : bankCode,
			"docType" : docType,
			"docTypeName" : docTypeName,
			"typeOfGuarantee" : typeOfGuarantee,
			"typeOfGuaranteeOther" : typeOfGuaranteeOther, 
			"requestorName" : requestorName,
			"bgNo" : bgNo,
			"amendNo" : amendNo,
			"amendType" : amendType, 
			"amounts" : amounts,
			"openEnd" : openEnd,
			"effectiveDate" : effectiveDate, 
			"expiredDate" : expiredDate, 
			"periodYear" : periodYear, 
		    "periodMonth" : periodMonth, 
		    "periodDay" : periodDay,
			"issueDate" : issueDate,
			"vendorType" : vendorType, 
			"vendorCode" : vendorCode, 
		    "vendorProfile" : vendorProfile, 
		    "vendorAddress" : vendorAddress, 
		    "vendorCity" : vendorCity, 
		    "vendorCountry" : vendorCountry, 
		    "vendorPostCode" : vendorPostCode, 	
			"ownerId" : ownerId, 
		    "owner" : owner, 
		    "ownerLastName" : ownerLastName, 
		    "ownerContactInfo" : ownerContactInfo, 
			"poSoNo" : poSoNo, 
		    "contractNo" : contractNo, 
		    "buyerEmployeeID" : buyerEmployeeID, 
		    "buyerName" : buyerName, 
			"contractAmounts" : contractAmounts, 
			"projectJob" : projectJob, 
		    "expectedDueDate" : expectedDueDate,
			"attachments" : attachments,
			"remarks" : remarks,
			"readOnly" : "N",  
		    "feeRate" : "1.00", 
		    "feeDueDate" : setFormatDate(getDateNow()), 
			"bgType" : "MANUAL",
			"treasuryDueDate" : setFormatDate(getDateNow()),
			"returnDate" : null,
		    "returnName" : returnName,
		    "returnAddress" : returnAddress,
		    "returnCity" : returnCity,
		    "returnCountry" : returnCountry,
		    "returnPostCode" : returnPostCode,	
		    "submitted" : "",
		    "submittedId" : "",
		    "submittedName" : "",
		    "approved" : "",
		    "approveId" : "",
		    "approveName" : "",
			"bcIssuer" : [],
			"bcBeneficiary" : [],
			"bcDocumentID" : "",
			"bcBroker" : [],
			"bcRequester" : []
		};
	
	return data;
}

//json submit modify
function jsonSubmitModify(eventButton){
	var jsonData;
	var type = $('#requestType').val();
	if(formType == "IN"){
		if(eventButton == "DRAFT"){
			if(type == "CREATE"){
				jsonData = {"function_id":"F10001001","app_user":"web","app_password":"J81XnF0XBS","req_transaction_id":"#req_transaction_id#","state_name":"","parent_trx_id":"","parent_act_id":"","req_parameters":[{"k":"channel","v":"WEB"},{"k":"userGroup","v":"REQUESTOR"},{"k":"userId","v":"#login_id#"},{"k":"userName","v":"#login_name#"},{"k":"userEmail","v":"#login_email#"},{"k":"companyCode","v":"#companyCode#"},{"k":"companyName","v":"#companyName#"},{"k":"departmentCode","v":"#departmentCode#"},{"k":"departmentName","v":"#departmentName#"},{"k":"action","v":"DRAFT"},{"k":"nextStatus","v":"DRAFT"},{"k":"actionId","v":"#login_id#"},{"k":"actionName","v":"#login_name#"},{"k":"actionEmail","v":"#login_email#"},{"k":"nextActionUserGroup","v":"REQUESTOR"},{"k":"dataDetail","v":"#dataDetail#"}]};
			}else if(type == "DECREASE"){
				jsonData = {"function_id":"F10001004","app_user":"web","app_password":"J81XnF0XBS","req_transaction_id":"#req_transaction_id#","state_name":"","parent_trx_id":"","parent_act_id":"","req_parameters":[{"k":"channel","v":"WEB"},{"k":"userGroup","v":"REQUESTOR"},{"k":"userId","v":"#login_id#"},{"k":"userName","v":"#login_name#"},{"k":"userEmail","v":"#login_email#"},{"k":"companyCode","v":"#companyCode#"},{"k":"companyName","v":"#companyName#"},{"k":"departmentCode","v":"#departmentCode#"},{"k":"departmentName","v":"#departmentName#"},{"k":"action","v":"DRAFT"},{"k":"nextStatus","v":"DRAFT"},{"k":"actionId","v":"#login_id#"},{"k":"actionName","v":"#login_name#"},{"k":"actionEmail","v":"#login_email#"},{"k":"nextActionUserGroup","v":"REQUESTOR"},{"k":"dataDetail","v":"#dataDetail#"}]};
			}else if(type == "EXTEND"){
				jsonData = {"function_id":"F10001002","app_user":"web","app_password":"J81XnF0XBS","req_transaction_id":"#req_transaction_id#","state_name":"","parent_trx_id":"","parent_act_id":"","req_parameters":[{"k":"channel","v":"WEB"},{"k":"userGroup","v":"REQUESTOR"},{"k":"userId","v":"#login_id#"},{"k":"userName","v":"#login_name#"},{"k":"userEmail","v":"#login_email#"},{"k":"companyCode","v":"#companyCode#"},{"k":"companyName","v":"#companyName#"},{"k":"departmentCode","v":"#departmentCode#"},{"k":"departmentName","v":"#departmentName#"},{"k":"action","v":"DRAFT"},{"k":"nextStatus","v":"DRAFT"},{"k":"actionId","v":"#login_id#"},{"k":"actionName","v":"#login_name#"},{"k":"actionEmail","v":"#login_email#"},{"k":"nextActionUserGroup","v":"REQUESTOR"},{"k":"dataDetail","v":"#dataDetail#"}]};
			}else if(type == "INCREASE"){
				jsonData = {"function_id":"F10001003","app_user":"web","app_password":"J81XnF0XBS","req_transaction_id":"#req_transaction_id#","state_name":"","parent_trx_id":"","parent_act_id":"","req_parameters":[{"k":"channel","v":"WEB"},{"k":"userGroup","v":"REQUESTOR"},{"k":"userId","v":"#login_id#"},{"k":"userName","v":"#login_name#"},{"k":"userEmail","v":"#login_email#"},{"k":"companyCode","v":"#companyCode#"},{"k":"companyName","v":"#companyName#"},{"k":"departmentCode","v":"#departmentCode#"},{"k":"departmentName","v":"#departmentName#"},{"k":"action","v":"DRAFT"},{"k":"nextStatus","v":"DRAFT"},{"k":"actionId","v":"#login_id#"},{"k":"actionName","v":"#login_name#"},{"k":"actionEmail","v":"#login_email#"},{"k":"nextActionUserGroup","v":"REQUESTOR"},{"k":"dataDetail","v":"#dataDetail#"}]};
			}else if(type == "RETURN"){
				jsonData = {"function_id":"F10001005","app_user":"web","app_password":"J81XnF0XBS","req_transaction_id":"#req_transaction_id#","state_name":"","parent_trx_id":"","parent_act_id":"","req_parameters":[{"k":"channel","v":"WEB"},{"k":"userGroup","v":"REQUESTOR"},{"k":"userId","v":"#login_id#"},{"k":"userName","v":"#login_name#"},{"k":"userEmail","v":"#login_email#"},{"k":"companyCode","v":"#companyCode#"},{"k":"companyName","v":"#companyName#"},{"k":"departmentCode","v":"#departmentCode#"},{"k":"departmentName","v":"#departmentName#"},{"k":"action","v":"DRAFT"},{"k":"nextStatus","v":"DRAFT"},{"k":"actionId","v":"#login_id#"},{"k":"actionName","v":"#login_name#"},{"k":"actionEmail","v":"#login_email#"},{"k":"nextActionUserGroup","v":"REQUESTOR"},{"k":"dataDetail","v":"#dataDetail#"}]};
			}
		}else if(eventButton == "SUBMIT"){
			if(type == "CREATE"){
			    jsonData = {"function_id":"F10001001","app_user":"web","app_password":"J81XnF0XBS","req_transaction_id":"#req_transaction_id#","state_name":"","parent_trx_id":"","parent_act_id":"","req_parameters":[{"k":"channel","v":"WEB"},{"k":"userGroup","v":"REQUESTOR"},{"k":"userId","v":"#login_id#"},{"k":"userName","v":"#login_name#"},{"k":"userEmail","v":"#login_email#"},{"k":"companyCode","v":"#companyCode#"},{"k":"companyName","v":"#companyName#"},{"k":"departmentCode","v":"#departmentCode#"},{"k":"departmentName","v":"#departmentName#"},{"k":"action","v":"SUBMIT"},{"k":"nextStatus","v":"WAITING_ACCEPT"},{"k":"actionId","v":""},{"k":"actionName","v":""},{"k":"actionEmail","v":""},{"k":"nextActionUserGroup","v":"ADMIN"},{"k":"dataDetail","v":"#dataDetail#"}]};
			}else if(type == "DECREASE"){
			    jsonData = {"function_id":"F10001004","app_user":"web","app_password":"J81XnF0XBS","req_transaction_id":"#req_transaction_id#","state_name":"","parent_trx_id":"","parent_act_id":"","req_parameters":[{"k":"channel","v":"WEB"},{"k":"userGroup","v":"REQUESTOR"},{"k":"userId","v":"#login_id#"},{"k":"userName","v":"#login_name#"},{"k":"userEmail","v":"#login_email#"},{"k":"companyCode","v":"#companyCode#"},{"k":"companyName","v":"#companyName#"},{"k":"departmentCode","v":"#departmentCode#"},{"k":"departmentName","v":"#departmentName#"},{"k":"action","v":"SUBMIT"},{"k":"nextStatus","v":"WAITING_ACCEPT"},{"k":"actionId","v":""},{"k":"actionName","v":""},{"k":"actionEmail","v":""},{"k":"nextActionUserGroup","v":"ADMIN"},{"k":"dataDetail","v":"#dataDetail#"}]};
			}else if(type == "EXTEND"){
			    jsonData = {"function_id":"F10001002","app_user":"web","app_password":"J81XnF0XBS","req_transaction_id":"#req_transaction_id#","state_name":"","parent_trx_id":"","parent_act_id":"","req_parameters":[{"k":"channel","v":"WEB"},{"k":"userGroup","v":"REQUESTOR"},{"k":"userId","v":"#login_id#"},{"k":"userName","v":"#login_name#"},{"k":"userEmail","v":"#login_email#"},{"k":"companyCode","v":"#companyCode#"},{"k":"companyName","v":"#companyName#"},{"k":"departmentCode","v":"#departmentCode#"},{"k":"departmentName","v":"#departmentName#"},{"k":"action","v":"SUBMIT"},{"k":"nextStatus","v":"WAITING_ACCEPT"},{"k":"actionId","v":""},{"k":"actionName","v":""},{"k":"actionEmail","v":""},{"k":"nextActionUserGroup","v":"ADMIN"},{"k":"dataDetail","v":"#dataDetail#"}]};
			}else if(type == "INCREASE"){
			    jsonData = {"function_id":"F10001003","app_user":"web","app_password":"J81XnF0XBS","req_transaction_id":"#req_transaction_id#","state_name":"","parent_trx_id":"","parent_act_id":"","req_parameters":[{"k":"channel","v":"WEB"},{"k":"userGroup","v":"REQUESTOR"},{"k":"userId","v":"#login_id#"},{"k":"userName","v":"#login_name#"},{"k":"userEmail","v":"#login_email#"},{"k":"companyCode","v":"#companyCode#"},{"k":"companyName","v":"#companyName#"},{"k":"departmentCode","v":"#departmentCode#"},{"k":"departmentName","v":"#departmentName#"},{"k":"action","v":"SUBMIT"},{"k":"nextStatus","v":"WAITING_ACCEPT"},{"k":"actionId","v":""},{"k":"actionName","v":""},{"k":"actionEmail","v":""},{"k":"nextActionUserGroup","v":"ADMIN"},{"k":"dataDetail","v":"#dataDetail#"}]};
			}else if(type == "RETURN"){
			    jsonData = {"function_id":"F10001005","app_user":"web","app_password":"J81XnF0XBS","req_transaction_id":"#req_transaction_id#","state_name":"","parent_trx_id":"","parent_act_id":"","req_parameters":[{"k":"channel","v":"WEB"},{"k":"userGroup","v":"REQUESTOR"},{"k":"userId","v":"#login_id#"},{"k":"userName","v":"#login_name#"},{"k":"userEmail","v":"#login_email#"},{"k":"companyCode","v":"#companyCode#"},{"k":"companyName","v":"#companyName#"},{"k":"departmentCode","v":"#departmentCode#"},{"k":"departmentName","v":"#departmentName#"},{"k":"action","v":"SUBMIT"},{"k":"nextStatus","v":"WAITING_ACCEPT"},{"k":"actionId","v":""},{"k":"actionName","v":""},{"k":"actionEmail","v":""},{"k":"nextActionUserGroup","v":"ADMIN"},{"k":"dataDetail","v":"#dataDetail#"}]};
			}
		}
	}else{
		if(eventButton == "DRAFT"){
			if(type == "CREATE"){
				jsonData = "";
			}else if(type == "DECREASE"){
				jsonData = "";
				jsonData = "";
			}else if(type == "INCREASE"){
				jsonData = "";
			}else if(type == "RETURN"){
				jsonData = "";
			}
		}else if(eventButton == "SUBMIT"){
			if(type == "CREATE"){
				jsonData = "";
			}else if(type == "DECREASE"){
				jsonData = "";
			}else if(type == "EXTEND"){
				jsonData = "";
			}else if(type == "INCREASE"){
				jsonData = "";
			}else if(type == "RETURN"){
				jsonData = "";
			}
		}
	}
	
	if(formType == "IN"){
		submitFrom(base64Encode(JSON.stringify(jsonData)));
	}else{
		submitFromOut(base64Encode(JSON.stringify(jsonData)));
	}
}