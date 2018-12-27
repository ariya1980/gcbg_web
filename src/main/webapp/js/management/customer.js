$(function(){
	$('#customerTable').DataTable({
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
	var cusCode = $('#cusCode').val();
	var description = $('#description').val();
	var address = $('#address').val();
	var city = $('#city').val();
	var country = $('#country').val();
	var postCode = $('#postCode').val();
	var status = $('#status').prop("checked");
	
	if(status == true){
		status = "ACTIVE";
	}else{
		status = "INACTIVE";
	}
	
	var datas = {
			"cusCode" : cusCode,
			"description" : description,
			"address" : address,
			"city" : city,
			"country" : country,
			"postCode" : postCode,
			"status" : status
	}
	
	$.ajax({
		url: appConfig.endPoint + "xxx" ,
		type: 'post',
		data: datas ,
		success: function (response) {
			
		}
	});
}