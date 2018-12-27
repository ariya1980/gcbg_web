// Disabled All Input 
function disabledAll(){
		$('#requestType').prop("disabled",true);
		//$('#requestType').prop("disabled",false);
		$('#bankGuarantee input').prop("disabled",true);
		$('#bankGuarantee select').prop("disabled",true);
		$('#bankGuarantee textarea').prop("disabled",true);
		$('.btnEvent').hide();
		$('.border-left-0').hide();
		$('#contractDetails input').prop("disabled",true);
		$('#contractDetails select').prop("disabled",true);
		$('#contractDetails textarea').prop("disabled",true);
		//$('#remarkHistory').toggle();
		$('#fileBrowsBox').hide();
		$('.btnRemoveFile').hide();
		$('#remarkCreate').hide();
		//$('#buttonCreate').hide();
		$('#buttonModify').hide();
		$('#returnContactInfo input').prop("disabled",true);
		$('#returnContactInfo').hide();
		//$('.botSellingRate').prop("disabled",true);
}

//get Button
function getDataButton(){
	buttonEventSubmit = false;
	showSpinner();
	ajaxTasDataButton = $.ajax({
    	type : "post",
    	cache: false,
    	url: appConfig.endPoint + "search/btn", 
    	data : {
    		"Id" : txnId,
    		"UserGroup" : usersession.userGroup,
    		"UserId" : usersession.userId,
    		"CompanyCode" : usersession.userCompany.comanyCode,
    		"DepartmentCode" : usersession.userCompany.department.departmentCode
    		},
    	success: function(data){
    		hideSpinner();
    		
    		if(data.datas == undefined){
    			buttonEventSubmit = false;
    		}else{
    			$('#buttonModify').hide();
    			var dataReq = jQuery.parseJSON(data.datas);
    			console.log("button : ",dataReq );
        		setButtonEvent(dataReq[0]);
        		buttonEventSubmit = true;
    		}
    		
    	}
    }).done(function(data, textStatus, jqXHR) {
    });
}


//get ATTACHMENT
function getDataAttachment(BgNo){
	showSpinner();
	ajaxTasAttachment = $.ajax({
  	type : "post",
  	cache: false,
  	url: appConfig.endPoint + "search/attachFile", 
  	data : {"BgNo" : BgNo},
  	success: function(data){
  		hideSpinner();
  		if(data.datas != undefined){
  		if(jQuery.parseJSON(data.datas) != undefined){
	  		var dataReq = jQuery.parseJSON(data.datas);
	  		console.log(dataReq);
	  		setAttachmentFile(dataReq);
  		}
  		}
  	}
  }).done(function(data, textStatus, jqXHR) {
  });
}
//get Remark
function getDataRemark(){
	showSpinner();
	ajaxTaskRemark = $.ajax({
  	type : "post",
  	cache: false,
  	url: appConfig.endPoint + "search/remarkByTxnId", 
  	data : {"Id" : txnId},
  	success: function(data){
  		hideSpinner();
  		var dataReq = jQuery.parseJSON(data.datas);
  		setRemark(dataReq);
  	}
  }).done(function(data, textStatus, jqXHR) {
  });
}

// Get POA
function getPoa(){
	showSpinner();
	ajaxTaskPoa = $.ajax({
  	type : "get",
  	cache: false,
  	url: appConfig.endPoint + "api/getPOA", 
  	data : {"companyCode" : usersession.userCompany.comanyCode},
  	success: function(data){
  		hideSpinner();
  		var dataObj = jQuery.parseJSON(data.datas);
  		var html = "";
  		for(var i=0 ; i<dataObj.length ; i++){
  			html += '<option value="'+dataObj[i].userName+'">'+dataObj[i].userName+'</option>';
  		}
  		$('#poa').append(html);
  		$('#poa').select2({
  			maximumSelectionLength: 2
  		});
  	}
  }).done(function(data, textStatus, jqXHR) {
  });
}

//set Button Event
function setButtonEvent(data){
	$('#buttonEvent').empty();
	var html = "";
	for(var i=0 ; i<data.btnName.length ; i++){
		var btnJsonRequest = "btnJsonRequest"+data.btnName[i];
		var colorClass;
		if(data.btnName[i].toUpperCase() == "DRAFT"){
			colorClass = "btn-warning";
		}else if(data.btnName[i].toUpperCase() == "SUBMIT"){
			colorClass = "btn-primary";
		}else if(data.btnName[i].toUpperCase() == "CANCEL"){
			colorClass = "btn-secondary";
		}else if(data.btnName[i].toUpperCase() == "ACCEPT"){
			colorClass = "btn-primary";
		}else if(data.btnName[i].toUpperCase() == "REVISE"){
			colorClass = "btn-warning";
		}else if(data.btnName[i].toUpperCase() == "REJECT"){
			colorClass = "btn-danger";
		}
		html += '<button type="button" class="btn '+colorClass+'" onclick="submitBtnForRender(\''+btnJsonRequest+'\')">'+ data.btnName[i] +'</button>&nbsp;&nbsp;'
				+ '<input type="hidden" id="btnJsonRequest'+data.btnName[i]+'" value="'+base64Encode(JSON.stringify(data.btn[i]))+'">'
		;
	}
	$('#buttonEvent').append(html);
}


//Add Amount
var rowAmount = 0;
var rowAmountCount = 0;
var currencySelectForm = [""];
var currencyNow;
function addAmount(trID,amountData){
if(rowAmountCount < arrayDataId.length){
	rowAmount++;
	rowAmountCount++;
	if(amountData == undefined){
		amountData = "";
	}else{
		amountValue.push(amountData);
	}
	var disabledCuurency = "";
	if($('#requestType').val() == "INCREASE" || $('#requestType').val() == "DECREASE"){
		disabledCuurency = "disabled";
	}
	var amontTr = "amontTr"+rowAmount;
	var amountId = "amountId" + rowAmount;
	var selectAmountId = "curAmount" + rowAmount;
	var rateId = "rateId" + rowAmount;
	var html = '<tr id="'+amontTr+'">'
		+ '<td><input class="form-control font-roboto" id="'+amountId+'" name="amount" value="'+amountData+'" onfocusout="checkAmountKeyIn(this , '+ rowAmount +')"></td>'
		+ '<td onclick="setCurrencyNow(\''+selectAmountId+'\')"><select class="form-control amountCurreny" name="currencyCode" id="'+selectAmountId+'" '+disabledCuurency+' onchange="currencySelectFormList(this , '+ rowAmount +')"></select></td>'
		+ '<td class="rate"><input type="text" id="'+rateId+'" class="form-control botSellingRate font-roboto" disabled></td>'
		+ '<td><i class="fas fa-times fa-lg text-danger pointer btnEvent" onclick="deleteAmount(\''+amontTr+'\' , '+ rowAmount +')"></i> &nbsp;&nbsp;'
		+ '<i class="fas fa-plus-circle fa-lg text-success pointer btnEvent" onclick="addAmount(\''+amontTr+'\')"></i></td>'
		+ '</tr>';
		
		if(trID == 0){
			$('#amountTbody').append(html);
		}else{
			$('#'+trID).last().after(html);
		}
		if(rowAmount == 1){
			currencyReqForm("curAmount"+rowAmount,"THB",currencySelectForm);
		}else{
			currencyReqForm("curAmount"+rowAmount,"",currencySelectForm);
		}
		
		
		var event = jQuery.parseJSON(sessionStorage.getItem('sendData')).type;
		
		if(formType == "IN"){
			$('.rate').remove();
		}else{
			if($('#requestStatus').val() == "DRAFT" || event == "CREATE" ){
				$.when(ajaxTaskCurrencyReqForm).done(function() {
					setExchangeRate("curAmount"+rowAmount, rateId);
				});
			}else{
				$('#'+rateId).val(0);
			}
		}
		
		$.when(ajaxTaskCurrencyReqForm).done(function() {
			currencySelectForm.push($('#'+selectAmountId).val());
			currencyNow = $('#'+selectAmountId).val();
			console.log(currencySelectForm);
		});
		//currencySelectFormList(selectAmountId,rowAmount)
}else{
		bootbox.alert('<div style="color : red">ไม่สามารถเพิ่มได้ เนื่องจาก Amount มีจำนวนมากกว่า Currency ที่กำหนดไว้</div>');
}
}

//Add Contract Amount
var rowConAmuont = 0;
var rowConAmuontCount = 0;
var currencyReqFormContract = [""];
function addConAmount(trID,contractAmountData,contractCurrencyCodeData,percentOfGuaranteeData){
	if(rowConAmuontCount < arrayDataId.length){
		rowConAmuont++;
		rowConAmuontCount++;
		if(contractAmountData == undefined){
			contractAmountData = "";
		}else{
	//		if(reqtypeChange == true){
	//			$('#conAmountTbody').empty();
	//		}
		}
		if(percentOfGuaranteeData == undefined){
			percentOfGuaranteeData = "";
		}
		var amontTr = "conAmontTr"+rowConAmuont;
		var currencyId = "curConAmount"+rowConAmuont;
		html = '<tr id="'+amontTr+'">'
				+ '<td><input type="text" class="form-control" name="contractAmount" value="'+contractAmountData+'"></td>'
				+ '<td><select class="form-control" name="contractCurrencyCode" id="'+currencyId+'" onclick="setCurrencyNow(\''+currencyId+'\')" onchange="currencySelectFormContectAmountList(this , '+ rowConAmuont +')"></select></td>'
				+ '<td><input type="text" class="form-control" name="percentOfGuarantee" value="'+percentOfGuaranteeData+'"></td>'
				+ '<td>% of Total Contract Amont</td>'
				+ '<td><i class="fas fa-times fa-lg text-danger pointer btnEvent" onclick="deleteConAmount(\''+amontTr+'\', \''+rowConAmuont+'\')"></i> &nbsp;&nbsp;'
				+ '<i class="fas fa-plus-circle fa-lg text-success pointer btnEvent" onclick="addConAmount(\''+amontTr+'\')"></i></td>'
				+ '</tr>';
		if(trID == 0){
			$('#conAmountTbody').append(html);
		}else{
			$('#'+trID).last().after(html);
		}
		if(rowConAmuont == 1){
			currencyReqForm("curConAmount"+rowConAmuont,"THB",currencyReqFormContract);
		}else{
			currencyReqForm("curConAmount"+rowConAmuont,"",currencyReqFormContract);
		}
		
		
		$.when(ajaxTaskCurrencyReqForm).done(function() {
			currencyReqFormContract.push($('#'+currencyId).val());
			currencyNow = $('#'+currencyId).val();
		});
	}else{
		bootbox.alert('<div style="color : red">ไม่สามารถเพิ่มได้ เนื่องจาก Amount มีจำนวนมากกว่า Currency ที่กำหนดไว้</div>');
	}
}


function setCurrencyNow(id){
	currencyNow = $('#'+id).val();
} 
function currencySelectFormList(e,num){
	var id = e.id;
	var cur = $('#'+id).val();
	var status = false;
	
	for(var i=0 ; i<currencySelectForm.length ; i++){
		if(currencySelectForm[i] == cur){
			bootbox.alert('<div style="color : red">มี Currency นี้อยู่แล้ว กรุณาเลือกใหม่อีกครั้ง</div>');
			currencyReqForm(id,currencyNow);
			currencySelectForm[num] = currencyNow;
			status = true;
			break;
		}
	}
	if(status == false){
		currencySelectForm[num] = cur;
		setExchangeRate(id,"rateId"+num);
	}
	
	
}
function currencySelectFormContectAmountList(e,num){
	var id = e.id;
	var cur = $('#'+id).val();
	var status = false;
	
	for(var i=0 ; i<currencyReqFormContract.length ; i++){
		if(currencyReqFormContract[i] == cur){
			bootbox.alert('<div style="color : red">มี Currency นี้อยู่แล้ว กรุณาเลือกใหม่อีกครั้ง</div>');
			currencyReqForm(id,currencyNow);
			currencyReqFormContract[num] = currencyNow;
			status = true;
			break;
		}
	}
	if(status == false){
		currencyReqFormContract[num] = cur;
		setExchangeRate(id,"rateId"+num);
	}
	
	
}

//Remove Amount
function deleteAmount(trID,num){
	var numTable = $('#amountTbody tr').length;
	if(numTable > 1){
		$('#'+trID).remove();
		currencySelectForm[num] = "";
		rowAmountCount--;
	}else{
		bootbox.alert('<div style="color : red">Can not delete</div>');
	}
}


//Remove Contract Amount
function deleteConAmount(trID,num){
	var numTable = $('#conAmountTbody tr').length;
	if(numTable > 1){
		$('#'+trID).remove();
		currencyReqFormContract[num] = "";
		rowConAmuontCount--;
	}else{
		bootbox.alert('<div style="color : red">Can not delete</div>');
	}
}

//Search Name
function getSearchName(selected){
	var venType = $("input[name='vendorType']:checked").val();
	var urlTxt;
	var type;
	if(venType == "V"){
		urlTxt = appConfig.endPoint + "api/getVendor";
		type = "V";
	}else{
		urlTxt = appConfig.endPoint + "api/getCustomer";
		type = "C";
	}
	$('#tableSearchName tbody').empty();
	showSpinner();
	ajaxTaskSearchName = $.ajax({
 	type : "get",
 	cache: false,
 	url: urlTxt, 
 	success: function(data){
 		hideSpinner();
 		data = jQuery.parseJSON(data.datas);
 		var html;
 		var arrayData = [];
 		var arrayDataId = [];
 		for(var i=0 ; i<data.length ; i++){
 			arrayDataId.push(data[i].cusCode);
 			arrayData.push(data[i].cusCode + " : " +data[i].description);
 		}
 		setSelectNotAll(arrayDataId,arrayData, "vendorCode", selected);
 	}
 }).done(function(data, textStatus, jqXHR) {
 });
	$('#vendorProfile').val(null);
	$('#vendorAddress').val(null);
	$('#vendorCity').val(null);
	$('#vendorCountry').val(null);
	$('#vendorPostCode').val(null);
	
	$('#returnName').val(null);
	$('#returnAddress').val(null);
	$('#returnCity').val(null);
	$('#returnCountry').val(null);
	$('#returnPostCode').val(null);
}



// set calculate date
function setCalculateDate(){
	var ds = setFormatDate($('#effectiveDate').val());
	var de = setFormatDate($('#expiredDate').val());
	var endDate = new Date(Date.parse(de) + 1*24*60*60*1000);
	var startDate = Date.parse(ds);
	var data = calculateDate(endDate, startDate);
	if(ds == "" || de == ""){
		$('#periodYear').val(0);
		$('#periodMonth').val(0);
		$('#periodDay').val(0);
	}else{
		$('#periodYear').val(data.years);
		$('#periodMonth').val(data.months);
		$('#periodDay').val(data.days);
	}
	console.log(calculateDate(endDate, startDate));
}

//get Data Remark By bgNo
function getDataRemarkByBgNo(bgNo){
	showSpinner();
	ajaxTaskRemark = $.ajax({
    	type : "post",
    	cache: false,
    	url: appConfig.endPoint + "search/remarkByBgNo", 
    	data : {"BgNo" : bgNo},
    	success: function(data){
    		hideSpinner();
    		console.log("Remark : " ,data.datas);
    		var dataReq = jQuery.parseJSON(data.datas);
    		setRemark(dataReq);
    	}
    }).done(function(data, textStatus, jqXHR) {
    });
}

//set Remark
function setRemark(data){
	$('#remarkHistory').empty(html);
	var html = "";
	for(var i=0 ; i<data.length ; i++){
		if(data[i].remark != ""){
			html += '<div class="row">'
              	+ '<div class="col-md-2"><p class="text-right text-secondary">'+setDate(data[i].remarkDate)+'</p><p class="text-right text-secondary">'+data[i].remarkBy+'</p></div>'
              	+ '<div class="col-md-10" style="border-left: 2px solid #232065;">'
                + '<textarea rows="4" class="form-control" disabled>'+data[i].remark+'</textarea>'
                + '</div>'
                + '</div><br>'
		}
	}
	$('#remarkHistory').append(html);
	$('#remarkHistory').hide();
}

//Set Request Type Modify
function setRequestTypeModify(status,selectedValue){
	var arrayData = [];
	var arrayDataId = [];
	ajaxTaskRequestTypeModify =  $.ajax({
    	type : "get",
    	cache: false,
    	url: appConfig.endPoint + "api/getRequestType", 
    	success: function(data){
    		data = jQuery.parseJSON(data.datas);
    		if(status.toUpperCase() == "VALID"){
    			arrayData = [data.DECREASE,data.EXTEND,data.INCREASE,data.RETURN];
        		arrayDataId = ["DECREASE","EXTEND","INCREASE","RETURN"];
    		}else if(status.toUpperCase() == "EXPIRED"){
    			arrayData = [data.EXTEND,data.RETURN];
        		arrayDataId = ["EXTEND","RETURN"];
    		}else{
    			arrayData = [data.CREATE,data.DECREASE,data.EXTEND,data.INCREASE,data.RETURN]
        		arrayDataId = ["CREATE","DECREASE","EXTEND","INCREASE","RETURN"]
    		}
    		setSelected(arrayDataId,arrayData, "requestType",selectedValue);
    	}
    }).done(function(data, textStatus, jqXHR) {
    });
}


//set Data Vendor / Customer
function setDataVenCus(){
	var vendorCode = $('#vendorCode').val();
	if(vendorCode == null || vendorCode == ""){
		$('#vendorProfile').val(null);
		$('#vendorAddress').val(null);
		$('#vendorCity').val(null);
		$('#vendorCountry').val(null);
		$('#vendorPostCode').val(null);
		
		$('#returnName').val(null);
		$('#returnAddress').val(null);
		$('#returnCity').val(null);
		$('#returnCountry').val(null);
		$('#returnPostCode').val(null);
	}else{
	var venType = $("input[name='vendorType']:checked").val();
	var arrayData;
 $.ajax({
 	type : "get",
 	data : {
 		"type" : venType,
 		"cusCode" : vendorCode
 	},
 	cache: false,
 	url: appConfig.endPoint + "api/getCustomerVendorDetail", 
 	success: function(data){
 		data = jQuery.parseJSON(data.datas);
 		$('#vendorProfile').val(data.description);
 		$('#vendorAddress').val(data.address);
 		$('#vendorCity').val(data.city);
 		$('#vendorCountry').val(data.country);
 		$('#vendorPostCode').val(data.postCode);
 		
 		$('#returnName').val(data.description);
 		$('#returnAddress').val(data.address);
 		$('#returnCity').val(data.city);
 		$('#returnCountry').val(data.country);
 		$('#returnPostCode').val(data.postCode);
// 		arrayData = data.datas.split(",");
// 		setSelect(arrayData,arrayData, "reqType", "");
 	}
 });
	}
}

//Check Other Type of Guarantee
function checkOtherTypeOfGua(){
	var status = $('#TOGOthers').prop( "checked" );
	if(status == true){
		$('#typeOfGuaranteeOther').show();
	}else{
		$('#typeOfGuaranteeOther').hide();
		$('#typeOfGuaranteeOther').val("");
	}
}

//set Approver
function setApprover(data,selected){
	var arrayDataId = [];
	var arrayData = [];
	for(var i=0 ; i<data.length ; i++){
		arrayDataId.push(data[i].id);
		arrayData.push(data[i].name);
	}
		setSelectNotAll(arrayDataId,arrayData, "approver", selected);
}

//get Type of Guarantee
function getTypeOfGuaratee(selected){
	ajaxTaskTypeOfGua = $.ajax({
	    	type : "get",
	    	cache: false,
	    	url: appConfig.endPoint + "api/getLGType", 
	    	success: function(data){
	    		data = data.datas;
	    		setTypeOfGuaratee(data.split(","),selected);
	    	}
	    }).done(function(data, textStatus, jqXHR) {
	    });
}

//set Type of Guarantee
var runInTypeOfGuaratee = 0;
function setTypeOfGuaratee(data,selected){
	if(runInTypeOfGuaratee == 0){
	console.log("TypeOfGuaratee : ",data);
	$('#TypeOfGuarantee').empty();
	var html = "";
	for(var i=0 ; i<data.length ; i++){
		var id = "TOG" + data[i].replace(/ /g,'');
		var check;
		
		if(selected != 0){
			if( selected == undefined ){
				check = "";
			}else{
				if(data[i].replace(/ /g,'') == selected.replace(/ /g,'')){
					check = 'checked="checked"';
				}else{
					check = "";
				}
			}
		}
		html += '<div class="col-md-6">'
			+ '<label class="containerradio">'+data[i]
			+ '<input type="radio" name="typeOfGuarantee" id="'+id+'" value="'+data[i]+'" '+check+' onclick="checkOtherTypeOfGua()">'
			+ '<span class="checkmark"></span>'
			+ '</label>'
			+ '</div>';
	}
	html += '<div class="col-md-6"><input class="form-control" id="typeOfGuaranteeOther"></div>';
	$('#TypeOfGuarantee').append(html);
	var typeOfGuaranteeOther = $('input[name="typeOfGuarantee"]:checked').val();
	if(typeOfGuaranteeOther == "Others"){
		$('#typeOfGuaranteeOther').show();
	}else{
		$('#typeOfGuaranteeOther').hide();
	}
	}
	runInTypeOfGuaratee++;
}

//Upload File
function uploadFile(){
	var fileBrows = $('#fileBrows').val();
	if(fileBrows == "" || fileBrows == null){
		bootbox.alert('<div style="color : red">No files uploaded.</div>');
	}else{
	var datas = {jsonUpload: JSON.stringify(objUpload)}
	console.log(datas);
	$.ajax({
		url: appConfig.endPoint + "uploadapi/uploadFile" ,
		type: 'post',
		data: datas ,
		beforeSend : function(){},
		success: function (response) {
			var filename = JSON.parse(response).fileName;
			var dateNow = getDateNow();
			addAttachFile(uploadNum,filename,sizeFileMb,sizeFile,dateNow);
        $('#fileBrows').val(null);
        $('#nameFile').val(null);
		}
	});
	}
}



function addAttachFile(uploadNum,filename,sizeFileMb,sizeFile,dateNow){
//	if(reqtypeChange == true){
//		$('#attachFile').empty();
//	}
	uploadNum++;
	html =  '<tr id="upload'+uploadNum+'">'
    + '<td>'+filename+'<input type="hidden" name="fileName" value="'+filename+'"></td>'
    + '<td>'+sizeFileMb+' MB <input type="hidden" name="fileName" value="'+sizeFile+'"></td>'
    + '<td>'+dateNow+' <input type="hidden" name="fileName" value="'+dateNow+'"></td>'
    + '<td><i class="fas fa-times fa-lg text-danger pointer btnRemoveFile" onclick="removeUploadFile(\'upload'+uploadNum+'\')"></i></td>'
    + '</tr>';
$('#attachFile').append(html);
clickUpload = false;
}

function addAttachFileStored(filename,sizeFileMb,sizeFile,dateNow){
//	if(reqtypeChange == true){
//		$('#attachFileStored').empty();
//	}
	html =  '<tr>'
    + '<td>'+filename+'</td>'
    + '<td>'+sizeFileMb+' MB</td>'
    + '<td>'+dateNow+'</td>'
    + '<td></td>'
    + '</tr>';
$('#attachFileStored').append(html);
}

function removeUploadFile(id){
	$('#'+id).remove();
}

function checkAmountKeyIn(id,num){
	var id = $(id).attr("id");
	var val = parseInt($('#'+id).val());
	var requestType = $('#requestType').val();
	if(requestType == "INCREASE"){
		if(val < amountValue[num-2]){
			bootbox.alert('<p style="color:red;">ค่าของ Amount น้อยกว่าจำนวนเดิม กรุณากรอกใหม่อีกครั้ง<p>');
			$('#'+id).val(amountValue[num-2]);
		}
	}
	else if(requestType == "DECREASE"){
		if(val > amountValue[num-2]){
			bootbox.alert('<p style="color:red;">ค่าของ Amount มากกว่าจำนวนเดิม กรุณากรอกใหม่อีกครั้ง<p>');
			$('#'+id).val(amountValue[num-2]);
		}
	}
}

//check Open / Close End
function checkOpenCloseEnd(){
	var status = $('#openEnd').val();
	if(status == "OPEN"){
		$('#expiredDate').prop("disabled",true);
		$('#formExpiredDate').hide();
		$('#expiredDate').val(null);
		$('#periodYear').val(null);
		$('#periodMonth').val(null);
		$('#periodDay').val(null);
	}else{
		$('#expiredDate').prop("disabled",false);
		$('#formExpiredDate').show();
	}
}

// get currency value
function setExchangeRate(id, rateId){
	var currency = $('#'+id).val();
	if(currency == "THB"){
		$('#'+rateId).val(0.0000);
	}else{
		if(formType == "OUT"){
			getExchangeRate(rateId,currency);
		}
//		$.when(ajaxTaskExchangeRate).done(function() {
//			var rate = exRate;
//			console.log("Rate : " , rate);
//			$('#'+rateId).val(rate);
//		});
		
	}
	
}
var efDate;
var exDate;
var dayNum;
var statusDayNum = false;
function getDateEfFx(){
	if(statusDayNum == false){
		statusDayNum = true;
		efDate = $('#effectiveDate').val();
		exDate = $('#expiredDate').val();
		dayNum = $('#periodYear').val() + $('#periodMonth').val() + $('#periodDay').val();
	}
}
// check change date if type = EXTEND
function checkDateExtend(){
	if($('#requestType').val()=="EXTEND"){
		var dayNumNow = parseInt($('#periodYear').val()) + parseInt($('#periodMonth').val()) + parseInt($('#periodDay').val());
		if(dayNumNow < parseInt(dayNum)){
			bootbox.alert('<div style="color:red;">- ระยะเวลาน้อยกว่าเดิม กรุณากรอกข้อมูลใหม่</div>');
			$('#effectiveDate').val(efDate);
			$('#expiredDate').val(exDate);
			setCalculateDate();
		}
	}
}

// Get data PO/SO No Search
function poNoSarch(){
	var poNo = $('#poSoNo').val();
	showSpinner();
	$.ajax({
		url: appConfig.endPoint + "api/getPODetail" ,
		type: 'get',
		cache: false,
		data: {"poNo" : poNo} ,
		success: function (data) {
			hideSpinner();
			var datas = jQuery.parseJSON(data.datas);
			if(Object.keys(datas).length != 0){
				$('#buyerName').val(datas.buyerName);
				$('#buyerEmployeeID').val(datas.buyerEmployeeID);
				$('#contractNo').val(datas.contractNo);
				$('#projectJob').val(datas.projectJob);
				$('#expectedDueDate').val(setDate(datas.expectedDueDate));
				$('#conAmountTbody').empty();
				rowConAmuont = 0;
				rowConAmuontCount = 0;
				currencyReqFormContract = [""];
				addConAmount(0);
				for(var i=0 ; i<datas.contractAmounts.length ; i++){
					addConAmount(0,datas.contractAmounts[i].contractAmount,datas.contractAmounts[i].contractCurrencyCode,"");
					$('#conAmontTr1').remove();
					currencyReqFormContract[1] = "";
					rowConAmuontCount--;
				}
			}else{
				if(typeEvent.toUpperCase() == "CREATE" || statusEvent == "DRAFT"){
					bootbox.alert('<div style="color : red">ไม่พบ PO/SO No. ที่ค้นหา</div>');
					$('#buyerEmployeeID').val("");
					$('#buyerName').val(usersession.userName);
					$('#contractNo').val("");
					$('#projectJob').val("");
					$('#expectedDueDate').val("");
					///
					$('#conAmountTbody').empty();
					rowConAmuont = 0;
					rowConAmuontCount = 0;
					currencyReqFormContract = [""];
					addConAmount(0);
					///
				}
			}
		}
	});
}

