// File Base64
	var limitSize = 10*1024*1024;
	var objUpload = {} ;
	var sizeFile;
	var sizeFileMb;
	function processFile( elmFile ){
		var file = elmFile.files;
		if(file.length > 0){
		var fileType = file[0].type;
// var ValidImageTypes =
// ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
// if ($.inArray(fileType, ValidImageTypes) < 0) {
// // $('#inputFileToLoad').val(null);
// bootbox.alert('<div style="color : red">'
// + "- กรุณาเลือกเฉพาะไฟล์ Excel เท่านั้น" + '</div>');
// }else{
			var fileName = $('#fileBrows').val();
			$('#nameFile').val(fileName);
		if( file.length > 0 ){
			sizeFile = file[0].size;
			sizeFileMb = (sizeFile/1000)/1000;
			if(sizeFile > limitSize){
				bootbox.alert("File maximum 10 MB");
				return false;
			}
			var fileName = file[0].name;
			objUpload.fileName = fileName.split('.')[0];
   			objUpload.type = fileName.split('.')[1];
   			var resultsplited = getBase64(file[0],objUpload);
   		
		}	
		// }
		}
	}
	function getBase64(file,objUpload) {
		   var reader = new FileReader();
		   reader.readAsDataURL(file);
		   reader.onload = function () {
		     resultsplited = String(reader.result).split(",");
		     objUpload.base64 = resultsplited[1] ;
		   };
		   reader.onerror = function (error) {
		     console.log('Error: ', error);
		   };
		}