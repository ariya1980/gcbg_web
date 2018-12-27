
// Set Select 
function setSelect(dataArray_id,dataArray_txt,autoID,selectedValue){
	var selected;
	$("#"+autoID).empty();
	$("#"+autoID).append('<option value="">All</option>');
	for ( var i = 0 ; i < dataArray_id.length ; i++ ){
		if(dataArray_id[i] == selectedValue){
			selected = "selected";
		}else{
			selected = "";
		}
		$("#"+autoID).append('<option value="'+dataArray_id[i]+'" '+selected+'>'+dataArray_txt[i]+'</option>');
	}
	$("#"+autoID).select2();
}

function setSelectNotAll(dataArray_id,dataArray_txt,autoID,selectedValue){
	var selected;
	$("#"+autoID).empty();
	$("#"+autoID).append('<option value=""></option>');
	for ( var i = 0 ; i < dataArray_id.length ; i++ ){
		if(dataArray_id[i] == selectedValue){
			selected = "selected";
		}else{
			selected = "";
		}
		$("#"+autoID).append('<option value="'+dataArray_id[i]+'" '+selected+'>'+dataArray_txt[i]+'</option>');
	}
	$("#"+autoID).select2();
}

function setSelected(dataArray_id,dataArray_txt,autoID,selectedValue){
	var selected;
	$("#"+autoID).empty();
	for ( var i = 0 ; i < dataArray_id.length ; i++ ){
		if(dataArray_id[i] == selectedValue){
			selected = "selected";
		}else{
			selected = "";
		}
		$("#"+autoID).append('<option value="'+dataArray_id[i]+'" '+selected+'>'+dataArray_txt[i]+'</option>');
	}
}

function setSelectNotSpace(dataArray_id,dataArray_txt,autoID,selectedValue){
	var selected;
	$("#"+autoID).empty();
	for ( var i = 0 ; i < dataArray_id.length ; i++ ){
		if(dataArray_id[i] == selectedValue){
			selected = "selected";
		}else{
			selected = "";
		}
		$("#"+autoID).append('<option value="'+dataArray_id[i]+'" '+selected+'>'+dataArray_txt[i]+'</option>');
	}
	$("#"+autoID).select2();
}

//Set Company
function setCompany(id,allStatus,datas){
	var arrayData = [];
	var arrayDataId = [];
	var data = datas;
    for(var i = 0 ; i < data.length ; i++){
    	arrayDataId.push(data[i].comanyCode);
    	arrayData.push(data[i].comanyName);
	}
    if(allStatus == true){
    	setSelect(arrayDataId,arrayData, id, "");
    }else{
    	setSelectNotAll(arrayDataId,arrayData, id, "");
    	setDepDepGroup("depGroup", datas.orgDepartment);
    }
}

//Set Company All
function setCompanyAll(id,allStatus,selectedValue){
	var arrayData = [];
	var arrayDataId = [];
	ajaxTasCompanyAll= $.ajax({
    	type : "get",
    	cache: false,
    	url: appConfig.endPoint + "api/getCompany", 
    	success: function(data){
    		data = jQuery.parseJSON(data.datas);
			    for(var i = 0 ; i < data.length ; i++){
			    	arrayDataId.push(data[i].companyCodeID);
			    	arrayData.push(data[i].descriptionEN);
				}
			    if(allStatus == true){
			    	setSelect(arrayDataId,arrayData, id, selectedValue);
			    }else{
			    	setSelectNotAll(arrayDataId,arrayData, id, selectedValue);
			    }
    		}
    	}).done(function(data, textStatus, jqXHR) {
        });
}

// Set Request Type
function setReqType(id){
	var arrayData;
    $.ajax({
    	type : "get",
    	cache: false,
    	url: appConfig.endPoint + "api/getReqStatus", 
    	success: function(data){
    		arrayData = data.datas.split(",");
    		setSelect(arrayData,arrayData, id, "");
    		//setSelect(arrayData,arrayData, "reqType", "");
    	}
    });
}

// Set Document Type 
function setDocType(id,allStatus,selected){
	var arrayData;
	ajaxTaskDocType = $.ajax({
    	type : "get",
    	cache: false,
    	url: appConfig.endPoint + "api/getDocType", 
    	success: function(data){
    		arrayData = data.datas.split(",");
    		if(allStatus == true){
    			setSelect(arrayData,arrayData, id, selected);
    		}else{
    			setSelectNotAll(arrayData,arrayData, id, selected);
    		}
    	}
    }).done(function(data, textStatus, jqXHR) {
    });
}

//Set Department Group 
function setDepDepGroup(id,allStatus, datas){
	var arrayData = [];
	var arrayDataId = [];
	var data = datas;
    for(var i = 0 ; i < data.length ; i++){
    	arrayDataId.push(data[i].departmentCode);
    	arrayData.push(data[i].departmentName);
	}
    if(allStatus == true){
    	setSelect(arrayDataId,arrayData, id, "");
    }else{
    	setSelectNotAll(arrayDataId,arrayData, id, "");
    }
}

// Set Vendor
function setVendor(id){
	var arrayData = [];
	var arrayDataId = [];
	showSpinner();
    $.ajax({
    	type : "get",
    	cache: false,
    	url: appConfig.endPoint + "api/getVendor", 
    	success: function(data){
    		hideSpinner();
    		data = jQuery.parseJSON(data.datas);
    		for(var i = 0 ; i < data.length ; i++){
    			arrayDataId.push(data[i].cusCode);
    			arrayData.push(data[i].description);
			}
    		setSelect(arrayDataId,arrayData, id, "");
    		//setSelect(arrayDataId,arrayData, "venCus", "");
    	}
    });
}

//Set Customer
function setCustomer(id){
	var arrayData = [];
	var arrayDataId = [];
	showSpinner();
    $.ajax({
    	type : "get",
    	cache: false,
    	url: appConfig.endPoint + "api/getCustomer", 
    	success: function(data){
    		hideSpinner();
    		console.log("C : " , jQuery.parseJSON(data.datas));
    		data = jQuery.parseJSON(data.datas);
    		for(var i = 0 ; i < data.length ; i++){
    			arrayDataId.push(data[i].cusCode);
    			arrayData.push(data[i].description);
			}
    		setSelect(arrayDataId,arrayData, id, "");
    		//setSelect(arrayDataId,arrayData, "venCus", "");
    	}
    });
}

//Set Bank
function setBank(id,allStatus,selected){
	var arrayData = [];
	var arrayDataId = [];
	ajaxTaskBank = $.ajax({
    	type : "get",
    	cache: false,
    	url: appConfig.endPoint + "api/getBank", 
    	success: function(data){
    		data = jQuery.parseJSON(data.datas);
    		for(var i = 0 ; i < data.length ; i++){
    			arrayDataId.push(data[i].bankCode);
    			arrayData.push(data[i].description);
			}
    		if(allStatus == true){
    			setSelect(arrayDataId,arrayData, id, selected);
    		}else{
    			setSelectNotAll(arrayDataId,arrayData, id, selected);
    		}
    	}
    }).done(function(data, textStatus, jqXHR) {
    });
}

//Set Request Status
function setReqStatus(id,allStatus,selected){
	var arrayData = [];
	var arrayDataId = [];
    $.ajax({
    	type : "get",
    	cache: false,
    	url: appConfig.endPoint + "api/getReqStatus", 
    	success: function(data){
    		
    		data = jQuery.parseJSON(data.datas);
    		console.log(data);
    		arrayData = [data.DRAFT,data.COMPLETE,data.WAITING_ACCEPT,data.WAITING_AD_AC,data.WAITING_BC_AP,data.WAITING_MAN_AC,data.WAITING_APPROVE,data.WAITING_SUBMIT,data.WAITING_VERIFY]
    		arrayDataId = ["DRAFT","COMPLETE","WAITING_ACCEPT","WAITING_AD_AC","WAITING_BC_AP","WAITING_MAN_AC","WAITING_APPROVE","WAITING_SUBMIT","WAITING_VERIFY"]
    		setSelect(arrayData,arrayData, id, "");
    	}
    });
}

//Set BG No
function setBgNo(id){
	var datas = {
		"formType" : "IN",
		"companyCode" : usersession.userCompany.comanyCode,
		"departmentCode" : usersession.userCompany.department.departmentCode
	};
	var arrayData = [];
    $.ajax({
    	type : "get",
    	data : datas,
    	cache: false,
    	url: appConfig.endPoint + "api/getBGNo", 
    	success: function(data){
    		data = jQuery.parseJSON(data.datas);
    		for(var i = 0 ; i < data.length ; i++){
    			arrayData.push(data[i].bgNo);
			}
    		setSelect(arrayData,arrayData, id, "");
    		//setSelect(arrayData,arrayData, "bgNo", "");
    	}
    });
}

function setBgType(id){
	var arrayData;
    $.ajax({
    	type : "get",
    	cache: false,
    	url: appConfig.endPoint + "api/getBGType", 
    	success: function(data){
    		arrayData = data.datas.split(",");
    		setSelect(arrayData,arrayData, id, "");
    		//setSelect(arrayData,arrayData, "reqType", "");
    	}
    });
}

//Set Req No
function setReqNo(id){
	var datas = {
			"formType" : "IN",
			"companyCode" : usersession.userCompany.comanyCode,
			"departmentCode" : usersession.userCompany.department.departmentCode
		};
	var arrayData = [];
    $.ajax({
    	type : "get",
    	data : datas,
    	cache: false,
    	url: appConfig.endPoint + "api/getReqNo", 
    	success: function(data){
    		data = jQuery.parseJSON(data.datas);
    		for(var i = 0 ; i < data.length ; i++){
    			arrayData.push(data[i].requestNo);
			}
    		setSelect(arrayData,arrayData, id, "");
    		//setSelect(arrayData,arrayData, "bgNo", "");
    	}
    });
}

//Set Po/Contrac No.
function setPoConNo(id){
	var datas = {
		"formType" : "IN",
		"companyCode" : "PTTGC",
		"departmentCode" : "test"
	};
	var arrayData = [];
    $.ajax({
    	type : "get",
    	data : datas,
    	cache: false,
    	url: appConfig.endPoint + "api/getPoContractNo", 
    	success: function(data){
    		data = jQuery.parseJSON(data.datas);
    		for(var i = 0 ; i < data.length ; i++){
    			arrayData.push(data[i].poSoNo);
			}
    		//setSelect(arrayData,arrayData, "poConNo", "");
    		setSelect(arrayData,arrayData, id, "");
    	}
    });
}

//Set Status
function setStatus(id){
	var arrayData;
    $.ajax({
    	type : "get",
    	cache: false,
    	url: appConfig.endPoint + "api/getStatus", 
    	success: function(data){
    		arrayData = data.datas.split(",");
    		setSelect(arrayData,arrayData, id, "");
    		//setSelect(arrayData,arrayData, "status", "");
    	}
    });
}

//Set currency
function currency(id,allStatus,selected){
	var arrayData = [];
	var arrayDataId = [];
    $.ajax({
    	type : "get",
    	cache: false,
    	url: appConfig.endPoint + "api/getCurrency", 
    	success: function(data){
    		data = jQuery.parseJSON(data.datas);
    		for(var i = 0 ; i < data.length ; i++){
    		arrayDataId.push(data[i].currencyCode);
			arrayData.push(data[i].descriptionEN);
    		}
    		if(allStatus == true){
    			setSelect(arrayDataId,arrayData, id, selected);
    		}else{
    			setSelectNotSpace(arrayDataId,arrayData, id, selected);
    		}
    	}
    });
	
} 


//Get currency request form
var arrayData = [];
var arrayDataId = [];
function getCurrencyReqForm(){
	ajaxTaskCurrencyReqForm = $.ajax({
    	type : "get",
    	cache: false,
    	url: appConfig.endPoint + "api/getCurrency", 
    	success: function(data){
    		data = jQuery.parseJSON(data.datas);
    		for(var i = 0 ; i < data.length ; i++){
	    		arrayDataId.push(data[i].currencyCode);
				arrayData.push(data[i].descriptionEN);
    		}
    	}
    }).done(function(data, textStatus, jqXHR) {
    });
}

//Set currency request form
function currencyReqForm(id,selected,currencySelectForm){
var status = false;
   	if(selected == ""){
   	if(currencySelectForm != undefined){
   	for(var x=0 ; x<arrayDataId.length ; x++){
   		for(var i=0 ; i<currencySelectForm.length ; i++){
   			if(arrayDataId[x] == currencySelectForm[i]){
   				status = true;
   			}
   		}
   		if(status == false){
   			selected = arrayDataId[x];
   			setSelectNotSpace(arrayDataId,arrayData, id, selected);
   			break;
   		}
   		status = false;
   	}
   	}
   	}else{
   		setSelectNotSpace(arrayDataId,arrayData, id, selected);
   	}
} 


//Set Request Type
function setRequestType(id,allStatus,selected){
	var arrayData = [];
	var arrayDataId = [];
    $.ajax({
    	type : "get",
    	cache: false,
    	url: appConfig.endPoint + "api/getRequestType", 
    	success: function(data){
    		data = jQuery.parseJSON(data.datas);
    		arrayData = [data.CREATE,data.DECREASE,data.EXTEND,data.INCREASE,data.RETURN]
    		arrayDataId = ["CREATE","DECREASE","EXTEND","INCREASE","RETURN"]
    		setSelect(arrayData,arrayData, id, "");
    		
    	}
    });
}

//Set Request Type From In
function setRequestTypeFromIn(id,allStatus,selected){
	var arrayData = [];
	var arrayDataId = [];
  $.ajax({
  	type : "get",
  	cache: false,
  	url: appConfig.endPoint + "api/getRequestType", 
  	success: function(data){
  		data = jQuery.parseJSON(data.datas);
  		arrayData = [data.CREATE,data.DECREASE,data.EXTEND,data.INCREASE,data.RETURN]
  		arrayDataId = ["CREATE","DECREASE","EXTEND","INCREASE","RETURN"]
        setSelected(arrayDataId,arrayData, id, selected);
  	}
  });
}