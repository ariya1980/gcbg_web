var formType = "IN";
$(function() {

	if (usersession) {

		console.log(usersession);
		getMyTask();
		getMyReq();

	} else {
		hideSpinner();

		bootbox.alert('<div style="color : red">'
				+ "- error กรุณาติดต่อ ผู้ดูแลระบบ" + '</div>', function() {
			window.location = "/gcbg-front-main/";
		});
	}
	
	
});

function getMyTask() {

	console.log("################kaew test");
	var arrayData = [];
	var arrayDataId = [];
	var data = usersession.shareCompany;
	if(data == undefined){
		arrayDataId.push(usersession.userCompany.comanyCode);
		arrayData.push(usersession.userCompany.comanyName);
	}else{
		for (var i = 0; i < data.length; i++) {
			arrayDataId.push(data[i].comanyCode);
			arrayData.push(data[i].comanyName);
		}
	}

	var currentdate = new Date();
	var submitted_e = moment().format('YYYY-MM-DD 23:59:59');
	var submitted_s = moment().subtract(3, 'months').format(
			'YYYY-MM-DD 00:00:00');

	var data = {
		'companyCode' : arrayDataId,
		'actionUserGroup' : usersession.userGroup,
		'formType' : formType,
		'actionId' : usersession.userId,
		'submittedDate' : [ submitted_s.toString(), submitted_e.toString() ],
		'departmentCode' : usersession.userCompany.department.departmentCode
	};
	console.log(data);

	$.ajax({
		method : "POST",
		data : data,
		traditional : true,
		crossDomain : true,
		cache : false,
		url : appConfig.endPoint + 'search/myTask',
		success : function(data) {
			var Datas = data;
			if(JSON.stringify(data) != "{}"){
	        	Datas = JSON.parse(data.datas);
	        }else{
	        	Datas = [];
	        }
			
			var table = $('#dataTask').DataTable({
				"destroy": true,
				"data" : Datas,
				"order" : [ [ 1, 'asc' ] ],
				dom : 'Bfrtip',
				buttons : [ 'excel', 'pdf' ],
				"scrollY" : 500,
				"scrollX" : true,
				destroy : true,
				"columns" : [
				{
					"data" : "requestNo",
				},
				{
					"data" : "bgNo",
				},
				{
					"data" : "companyName",
				},
				{
					"data" : "requestorDepartmentName",
				},
				{
					"data" : "poSoNo",
				},
				{
					"data" : "vendorProfile",
				},
				{
					"data" : "bankCode",
				},
				{
					"data" : "amounts",
					"render" : function(data,type, row, meta) {
						return data[0].amount;
					}
				},
				{
					"data" : "requestType",

				},
				{
					"data" : "status",
				}, 
				{
					"data" : "submitted"
				},
				{
					"data" : "submittedName"
				},
				]
				});
			$('#dataTask').addClass("pointer");
			$('#dataTask tbody').on('click', 'tr', function () {
	        	var data = table.row($(this).closest('tr')).data();
	        	requestFrom("WORKFLOW", data[Object.keys(data)[0]] , formType)
	        } );
		}
	});
}

function getMyReq() {

	var currentdate = new Date();
	var submitted_e = moment().format('YYYY-MM-DD 23:59:59');
	var submitted_s = moment().subtract(3, 'months').format(
			'YYYY-MM-DD 00:00:00');

	var data = {
		'requestorId' : usersession.userId,
		'formType' : formType,
		'submittedDate' : [ submitted_s.toString(), submitted_e.toString() ]
	};
	console.log(data);

	$.ajax({
		method : "POST",
		data : data,
		traditional : true,
		crossDomain : true,
		cache : false,
		url : appConfig.endPoint + 'search/myReq',
		success : function(data) {
			var Datas = data;
			if(JSON.stringify(data) != "{}"){
	        	Datas = JSON.parse(data.datas);
	        }else{
	        	Datas = [];
	        }
			
			var table = $('#dataReq').DataTable({
				"destroy": true,
				"data" : Datas,
				"order" : [ [ 1, 'asc' ] ],
				dom : 'Bfrtip',
				buttons : [ 'excel', 'pdf' ],
				"scrollY" : 500,
				"scrollX" : true,
				destroy : true,
				"columns" : [
				{
					"data" : "requestNo",
				},
				{
					"data" : "bgNo",
				},
				{
					"data" : "companyName",
				},
				{
					"data" : "requestorDepartmentName",
				},
				{
					"data" : "poSoNo",
				},
				{
					"data" : "vendorProfile",
				},
				{
					"data" : "bankCode",
				},
				{
					"data" : "amounts",
					"render" : function(data,type, row, meta) {
						return data[0].amount;
					}
				},
				{
					"data" : "requestType",

				},
				{
					"data" : "status",
				}, 
				{
					"data" : "submitted",
					"render" : function(data,type, row, meta) {
						var dateHtml = '<span style="display:none;">'+ moment(data).format("YYYYMMDD")+ '</span>'+ moment(data).format("DD/MM/YYYY");
						return dateHtml;
					}
				},
				{
					"data" : "submittedName"
				},
				]
				});
			$('#dataReq').addClass("pointer");
			$('#dataReq tbody').on('click', 'tr', function () {
	        	var data = table.row($(this).closest('tr')).data();
	        	requestFrom("WORKFLOW", data[Object.keys(data)[0]] , formType)
	        } );
		}
	});
}

function requestFrom(type, id , formType) {
	var data = {
		reqTxnId : id,
		type : type,
		formType : formType
	};
	sessionStorage.setItem("sendData", JSON.stringify(data));
	window.location = appConfig.baseUrl + "view/request-from.jsp";
}

