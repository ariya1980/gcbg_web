	
	function base64Decode(str) {
		return decodeURIComponent(atob(str).split('').map(function(c) {
	        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	    }).join(''));
	}
	
	function base64Encode(str) {
		return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
		        function toSolidBytes(match, p1) {
		            return String.fromCharCode('0x' + p1);
	    }));
	}
	
	function convertPoint(str) {
		return parseInt(str)/10000;
	}
	
	function revertPoint(str) {
		return numeral(numeral(str).value()*10000).format('0');
	}
	
	
	//----------- check key number ---------------//
	function checkKeyInNumber(){
		$(".unit_input").keypress(function (e) {
			//if the letter is not digit then display error and don't type anything
			if (e.which != 8 && e.which != 0  && e.which != 46 && (e.which < 48 || e.which > 57)) {
				return false;
			}
		});
	}

	//----------- check key number ---------------//
	function checkKeyInNumberF(id){
		console.log(id);
		 $('#'+id).keypress(function (e) {
			//if the letter is not digit then display error and don't type anything
			if (e.which != 8 && e.which != 0  && e.which != 46 && (e.which < 48 || e.which > 57)) {
				return false;
			}
		});
	}

	//----------- check key number ---------------//
	function checkKeyInNumberFactorPoint(id){
		$('#'+id).keypress(function (e) {
				//if the letter is not digit then display error and don't type anything
			if (e.which != 8  && e.which != 0  && (e.which < 48 || e.which > 57)) {
				return false;
			}
		});
	}

	
	
		
		//-------Set background input #fff--------- //
	function setWhiteInputFunction(id) {
		var id = $(id).attr("id");
		$('#' + id).css("background-color", "#fff");
	}
		
	
	//------------ get time --------------//
	function getTime(){
		var time = "";
		var d = new Date(); // for now
		time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
		return time;
	}
	