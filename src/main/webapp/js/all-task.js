$(function(){
	if (usersession) {
		console.log(usersession);
		getMyTask("IN");

	} else {
		hideSpinner();

		bootbox.alert('<div style="color : red">'
				+ "- error กรุณาติดต่อ ผู้ดูแลระบบ" + '</div>', function() {
			window.location = "/gcbg-front-main/";
		});
	}
});

var taskIn = false;
var taskOut = false;
function getMyTask(type) {
	
	if(taskIn == false || taskOut == false){
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
		'formType' : type,
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
			console.log("xxx : " ,data);
			var Datas;
			if(JSON.stringify(data) != "{}"){
	        	Datas = JSON.parse(data.datas);
	        }else{
	        	Datas = [];
	        }
				
			var table = $('#dataTask'+type).DataTable({
				dom : 'Bfrtip',
				buttons : [ 'excel', 'pdf' ],
				"scrollY" : 500,
				"scrollX" : true,
				"destroy": true,
				"data" : Datas,
				"destroy": true,
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
					"className" : 'onclickEvent pointer',
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
					"data" : "submittedName",
				}
				]
			});
			
			$('#dataTask'+type+' tbody').addClass("pointer");
			$('#dataTask'+type+' tbody').on('click', 'tr', function () {
	        	var data = table.row($(this).closest('tr')).data();
	        	requestFrom('WORKFLOW',data[Object.keys(data)[0]] , type);
	        } );
			
	}
	});
	}
	if(type == "IN"){
		taskIn = true;
	}else{
		taskOut = true;
	}
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