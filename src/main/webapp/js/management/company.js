$(function(){
	$('#companyTable').DataTable({
		dom: 'Bfrtip',
        buttons: [
        	'excel', 'pdf'
        ],
        "scrollY": 500,
        "scrollX": true,
        "select": true,
        destroy: true
	});
});


// Browse File
function browseFlile(){
	$('#fileBrows').click();
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
		url: appConfig.endPoint + "xxx" ,
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

function createData(){
	var companyCode = $('#companyCode').val();
	var companyCodeID = $('#companyCodeID').val();
	var descriptionEN = $('#descriptionEN').val();
	var descriptionTH = $('#descriptionTH').val();
	var addressOfficeEN = $('#addressOfficeEN').val();
	var CP_AddressOfficeTH = $('#CP_AddressOfficeTH').val();
	var addressOffice2EN = $('#addressOffice2EN').val();
	var addressOffice2TH = $('#addressOffice2TH').val();
	
	
	var datas = {
			"companyCode" : companyCode,
			"companyCodeID" : companyCodeID,
			"descriptionEN" : descriptionEN,
			"descriptionTH" : descriptionTH,
			"addressOfficeEN" : addressOfficeEN,
			"CP_AddressOfficeTH" : CP_AddressOfficeTH,
			"addressOffice2EN" : addressOffice2EN,
			"addressOffice2TH" : addressOffice2TH
	}
	
	$.ajax({
		url: appConfig.endPoint + "xxx" ,
		type: 'post',
		data: datas ,
		success: function (response) {
			
		}
	});
	
}