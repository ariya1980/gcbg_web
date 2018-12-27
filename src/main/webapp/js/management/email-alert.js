$(function(){
	// editor
	CKEDITOR.replace( 'mail_body', {});
});


// Browse File
function browseFlile(){
	$('#fileBrows').click();
}


function createData(){
	var mail_from = $('#mail_from').val();
	var mail_to = $('#mail_to').val();
	var mail_cc = $('#mail_cc').val();
	var mail_subject = $('#mail_subject').val();
	var mail_body = CKEDITOR.instances.mail_body.getData();
	
	var datas = {
			"mail_from" : mail_from,
			"mail_to" : mail_to,
			"mail_cc" : mail_cc,
			"mail_subject" : mail_subject,
			"mail_body" : mail_body,
	}
	
	$.ajax({
		url: appConfig.endPoint + "xxx" ,
		type: 'post',
		data: datas ,
		success: function (response) {
			
		}
	});
	
}