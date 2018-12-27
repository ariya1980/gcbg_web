// Submit Out
function submitFromOut(jsonRequest){
	var dataForm = getDataForm();
	var validate = "";
	validate += validateNull(null,dataForm.companyCode,'- กรุณาเลือก Company');
	validate += validateNull(null,dataForm.bankCode,'- กรุณาเลือก Bank');
	validate += validateNull(null,dataForm.docType,'- กรุณาเลือก Document Type');
	validate += validateNull(null,dataForm.typeOfGuarantee[0],'- กรุณาเลือก Type of Guarantee');
	validate += validateNull('bgNo',dataForm.bgNo,'- กรุณากรอก BG No');

	jsonData = {
			"requestNo" : dataForm.requestNo,
			"requestType" : dataForm.requestType,
			"requestStatus" : dataForm.requestStatus,
			"lastUpdate" : dataForm.lastUpdate,
			"formType" : dataForm.formType,
			"companyCode" : dataForm.companyCode, 
		    "companyName" : dataForm.companyName, 
			"bankCode" : dataForm.bankCode,
			"docType" : dataForm.docType,
			"docTypeName" : dataForm.docTypeName,
			"typeOfGuarantee" : dataForm.typeOfGuarantee,
			"typeOfGuaranteeOther" : dataForm.typeOfGuaranteeOther, 
			"requestorName" : dataForm.requestorName,
			"bgNo" : dataForm.bgNo,
			"amendNo" : dataForm.amendNo,
			"amendType" : dataForm.amendType, 
			"amounts" : dataForm.amounts,
			"openEnd" : dataForm.openEnd,
			"effectiveDate" : dataForm.effectiveDate, 
			"expiredDate" : dataForm.expiredDate, 
			"periodYear" : dataForm.periodYear, 
		    "periodMonth" : dataForm.periodMonth, 
		    "periodDay" : dataForm.periodDay,
			"issueDate" : dataForm.issueDate,
			"vendorType" : dataForm.vendorType, 
			"vendorCode" : dataForm.vendorCode, 
		    "vendorProfile" : dataForm.vendorProfile, 
		    "vendorAddress" : dataForm.vendorAddress, 
		    "vendorCity" : dataForm.vendorCity, 
		    "vendorCountry" : dataForm.vendorCountry, 
		    "vendorPostCode" : dataForm.vendorPostCode, 	
			"ownerId" : dataForm.ownerId, 
		    "owner" : dataForm.owner, 
		    "ownerLastName" : dataForm.ownerLastName, 
		    "ownerContactInfo" : dataForm.ownerContactInfo, 
			"poSoNo" : dataForm.poSoNo, 
		    "contractNo" : dataForm.contractNo, 
		    "buyerEmployeeID" : dataForm.buyerEmployeeID, 
		    "buyerName" : dataForm.buyerName, 
			"contractAmounts" : dataForm.contractAmounts, 
			"projectJob" : dataForm.projectJob, 
		    "expectedDueDate" : dataForm.expectedDueDate,
			"attachments" : dataForm.attachments,
			"remarks" : dataForm.remarks,
			"readOnly" : "N",  
		    "feeRate" : "1.00", 
		    "feeDueDate" : setFormatDate(getDateNow()), 
			"bgType" : "MANUAL",
			"treasuryDueDate" : setFormatDate(getDateNow()),
			"returnDate" : null,
		    "returnName" : dataForm.returnName,
		    "returnAddress" : dataForm.returnAddress,
		    "returnCity" : dataForm.returnCity,
		    "returnCountry" : dataForm.returnCountry,
		    "returnPostCode" : dataForm.returnPostCode,	
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
	
	data = {
			 "jsonRequest" : jsonRequest,
			 "jsonData" : base64Encode(JSON.stringify(jsonData)),
			 "reqTxnId" : $('#reqTxnId').val(),
			 "login_id" : usersession.userId,
			 "login_name" : usersession.userName,
			 "login_email" : usersession.userEmail,
			 "req_id" : $('#req_id').val(),
			 "req_name" : $('#req_name').val(),
			 "req_email" : $('#req_email').val(),
			 "man_id" : $('#man_id').val(), // session login
			 "man_name" : $('#man_name').val(),
			 "man_email" : $('#man_email').val(),
			 "bc_id" : "",// "" ตลอด
			 "bc_name" : "",// "" ตลอด
			 "bc_email" : "",// "" ตลอด
			 "companyCode" : usersession.userCompany.comanyCode,
			 "companyName" : usersession.userCompany.comanyName,
			 "departmentCode" : usersession.userCompany.department.departmentCode,
			 "departmentName" : usersession.userCompany.department.departmentName
		}
	/*	
	if(validate == ""){
		showSpinner();
		$.ajax({
	    	type : "post",
	    	data : data,
	    	url: appConfig.endPoint + "requestAction/action", 
	    	success: function(result){
	    		hideSpinner();
	    		bootbox.alert(result.responseMessage, function(){ window.location = urlContext+"/view/document-in-work-list.jsp"; });
	    		
	    	}
	    });
	}else{
		bootbox.alert('<div style="color:red;">'+validate+'</div>');
		$('#amountTbody input').prop("disabled",false);
		$('#amountTbody select').prop("disabled",false);
		$('.botSellingRate').prop("disabled",true);
	}
	*/
}