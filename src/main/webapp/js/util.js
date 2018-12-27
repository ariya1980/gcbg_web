
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
	
	// base64Decode
	function base64Decode(str) {
		return decodeURIComponent(atob(str).split('').map(function(c) {
	        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	    }).join(''));
	}
	
	// base64Encode
	function base64Encode(str) {
		return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
		        function toSolidBytes(match, p1) {
		            return String.fromCharCode('0x' + p1);
	    }));
	}
	
// replace date to json date
function replaceDate(str){
	return str.replace(/\//g, '-') + " 00:00:00";
}

function setFormatDate(str){
	date = str.split("/");
	return date[2]+"-"+date[1]+"-"+date[0] + " 00:00:00";
}
// Get Date Now
function getDateNow(){
	var d = new Date();
	var curr_date = d.getDate();
	var curr_month = d.getMonth() + 1; // Months are zero based
	var curr_year = d.getFullYear();
	return curr_date + "/" + curr_month + "/" + curr_year;
}

// Set Format Date Mon Dec 31 00:00:00 ICT 2018 --> 31/12/2018
function setFormateDate(){
	var d = new Date("Mon Dec 31 00:00:00 ICT 2018");
	var curr_date = d.getDate();
	var curr_month = d.getMonth() + 1; // Months are zero based
	var curr_year = d.getFullYear();
	console.log("yyy : " + curr_date + "/" + curr_month + "/" + curr_year );
}


// get Yesterday
function getYesterday(){
	 var d = new Date();
	 d.setDate(d.getDate()-1);
	 var date = (d.getDate()).toString();
	 var month = (d.getMonth() + 1 ).toString();
	 var year = (d.getFullYear()).toString();
	 if(month.length == 1){
		 month = "0"+month;
	 }
	 if(date.length == 1){
		 date = "0"+date;
	 }
	 return year + "-" + month + "-" + date;
}

//get Dating back
function getDatingBack(numDate){
	 var d = new Date();
	 d.setDate(d.getDate()-numDate);
	 var date = (d.getDate()).toString();
	 var month = (d.getMonth() + 1 ).toString();
	 var year = (d.getFullYear()).toString();
	 if(month.length == 1){
		 month = "0"+month;
	 }
	 if(date.length == 1){
		 date = "0"+date;
	 }
	 return year + "-" + month + "-" + date;
}

function setDate(dateTxt){
	var date = new Date(dateTxt);
	return ( date.getDate() + '/' + (Number(date.getMonth()) + 1)) + '/' +  date.getFullYear();
}

// toggle
function toggle(id){
	$('#' + id).toggle();
}

// calculate date
function calculateDate(d1, d2) {
	var years;
	var months;
	var days;
	  var m = moment(d1);
	  years = m.diff(d2, 'years');
	  m.add(-years, 'years');
	  months = m.diff(d2, 'months');
	  m.add(-months, 'months');
	  days = m.diff(d2, 'days');
	  
	  if(isNaN(years) == true){
		  years = "";
	  }
	  if(isNaN(months) == true){
		  months = "";
	  }
	  if(isNaN(days) == true){
		  days = "";
	  }
	  return {years: years, months: months, days: days};
	}

//--------- Set Background white ------------//
function setWhiteInput(id) {
	var id = $(id).attr("id");
	$('#' + id).css("background-color", "#fff");
}

//validate null 
function validateNull(id,val,textAlert){
	var validate = "";
	if(val == null || val == "" || val == undefined){
		validate = textAlert + '<br>';
		if(id != null){
			$('#'+id).css("background-color",
			"#ffcccc");
		}
	}
	return validate;
}

// get Exchange Rate
var exRate;
var numBackDate = 1;
function getExchangeRate(id,currency,date){
	showSpinner();
	if(date == undefined){
		date = getYesterday();
	}
	//var yesterDay = "2018-12-03";
	ajaxTaskExchangeRate = $.ajax({
        url: "https://apigw1.bot.or.th/bot/public/Stat-ExchangeRate/v2/DAILY_AVG_EXG_RATE/?start_period="+date+"&end_period="+date+"&currency="+currency,
        type: 'GET',
        dataType: 'json',
        cache: false,
        headers: {
            'x-ibm-client-id': '635ae86f-cdca-4126-931e-c8d36ea97adb'
        },
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
        	hideSpinner();
        	console.log(result);
        	var rate = result.result.data.data_detail[0].selling;
        	if(rate == ""){
        		numBackDate++;
        		getExchangeRate(id,currency,getDatingBack(numBackDate));
        	}else{
        		exRate = rate;
        		numBackDate = 1;
        		$('#'+id).val(exRate);
        	}
        },
        error: function (error) {
            
        }
    }).done(function(data, textStatus, jqXHR) {
    	
    });
}

// Back pang
function goBack() {
    window.history.back();
}