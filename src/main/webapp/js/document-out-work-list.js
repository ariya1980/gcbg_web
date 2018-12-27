var formType = "OUT";
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
	
	$('input ')
	
});

function getMyTask() {

	console.log("################kaew test");
	var arrayData = [];
	var arrayDataId = [];
	var data = usersession.shareCompany;
	for (var i = 0; i < data.length; i++) {
		arrayDataId.push(data[i].comanyCode);
		arrayData.push(data[i].comanyName);
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
			$("#dataTask").find('tbody').empty();
			var dataTable = '';
			if (JSON.stringify(data) != "{}") {
				var Datas = JSON.parse(data.datas);
				console.log(Datas);
				for (i = 0; i < Datas.length; i++) {
					dataTable += '<tr id="' + Datas[i]._id
							+ '" onclick="requestFrom(\'WORKFLOW\',\''
							+ Datas[i]._id + '\' , \''+formType+'\');" class="pointer">';

					Datas[i].requestNo ? dataTable += '<td>'
							+ Datas[i].requestNo + '</td>'
							: dataTable += '<td>' + '-' + '</td>';
					Datas[i].bgNo ? dataTable += '<td>' + Datas[i].bgNo
							+ '</td>' : dataTable += '<td>' + '-' + '</td>';
					Datas[i].companyName ? dataTable += '<td>'
							+ Datas[i].companyName + '</td>'
							: dataTable += '<td>' + '-' + '</td>';
					Datas[i].requestorDepartmentName ? dataTable += '<td>'
							+ Datas[i].requestorDepartmentName + '</td>'
							: dataTable += '<td>' + '-' + '</td>';
					Datas[i].poSoNo ? dataTable += '<td>'
							+ Datas[i].poSoNo + '</td>'
							: dataTable += '<td>' + '-' + '</td>';
					Datas[i].vendorProfile ? dataTable += '<td>'
							+ Datas[i].vendorProfile + '</td>'
							: dataTable += '<td>' + '-' + '</td>';
					Datas[i].bankCode ? dataTable += '<td>' + Datas[i].bankCode
							+ '</td>' : dataTable += '<td>' + '-' + '</td>';
					Datas[i].amounts[0].amount ? dataTable += '<td>'
							+ parseInt(Datas[i].amounts[0].amount) + '</td>'
							: dataTable += '<td>' + '-' + '</td>';
					Datas[i].requestType ? dataTable += '<td>'
							+ Datas[i].requestType + '</td>'
							: dataTable += '<td>' + '-' + '</td>';
					Datas[i].status ? dataTable += '<td>' + Datas[i].status
							+ '</td>' : dataTable += '<td>' + '-' + '</td>';
					Datas[i].submitted ? dataTable += '<td>'
							+ moment(Datas[i].submitted).format('LL') + '</td>'
							: dataTable += '<td>' + '-' + '</td>';
					Datas[i].submittedName ? dataTable += '<td>'
							+ Datas[i].submittedName + '</td>'
							: dataTable += '<td>' + '-' + '</td>';

					dataTable += '</tr>';
				}
			}
			$("#dataTask").find('tbody').append(dataTable);
			$('#dataTask').DataTable({
				dom : 'Bfrtip',
//				buttons : [ 'copy', 'csv', 'excel', 'pdf', 'print' ],
				buttons : [ 'excel', 'pdf' ],
				"scrollY" : 500,
				"scrollX" : true
			});
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
			$("#dataReq").find('tbody').empty();

			var dataTable = '';
			if (JSON.stringify(data) != "{}") {
				var Datas = JSON.parse(data.datas);
				console.log(Datas);
				for (i = 0; i < Datas.length; i++) {
					dataTable += '<tr id="' + Datas[i]._id
							+ '" onclick="requestFrom(\'WORKFLOW\',\''
							+ Datas[i]._id + '\' , \''+formType+'\');" class="pointer">';

					Datas[i].requestNo ? dataTable += '<td>'
							+ Datas[i].requestNo + '</td>'
							: dataTable += '<td>' + '-' + '</td>';
					Datas[i].bgNo ? dataTable += '<td>' + Datas[i].bgNo
							+ '</td>' : dataTable += '<td>' + '-' + '</td>';
					Datas[i].companyName ? dataTable += '<td>'
							+ Datas[i].companyName + '</td>'
							: dataTable += '<td>' + '-' + '</td>';
					Datas[i].requestorDepartmentName ? dataTable += '<td>'
							+ Datas[i].requestorDepartmentName + '</td>'
							: dataTable += '<td>' + '-' + '</td>';
					Datas[i].poSoNo ? dataTable += '<td>'
							+ Datas[i].poSoNo + '</td>'
							: dataTable += '<td>' + '-' + '</td>';
					Datas[i].vendorProfile ? dataTable += '<td>'
							+ Datas[i].vendorProfile + '</td>'
							: dataTable += '<td>' + '-' + '</td>';
					Datas[i].bankCode ? dataTable += '<td>' + Datas[i].bankCode
							+ '</td>' : dataTable += '<td>' + '-' + '</td>';
					Datas[i].amounts[0].amount ? dataTable += '<td>'
							+ parseInt(Datas[i].amounts[0].amount) + '</td>'
							: dataTable += '<td>' + '-' + '</td>';
					Datas[i].requestType ? dataTable += '<td>'
							+ Datas[i].requestType + '</td>'
							: dataTable += '<td>' + '-' + '</td>';
					Datas[i].status ? dataTable += '<td>' + Datas[i].status
							+ '</td>' : dataTable += '<td>' + '-' + '</td>';
					Datas[i].submitted ? dataTable += '<td>'
							+ moment(Datas[i].submitted).format('LL') + '</td>'
							: dataTable += '<td>' + '-' + '</td>';
					Datas[i].submittedName ? dataTable += '<td>'
							+ Datas[i].submittedName + '</td>'
							: dataTable += '<td>' + '-' + '</td>';

					dataTable += '</tr>';
				}
			}
			$("#dataReq").find('tbody').append(dataTable);
			$('#dataReq').DataTable({
				dom : 'Bfrtip',
				//buttons : [ 'copy', 'csv', 'excel', 'pdf', 'print' ],
				buttons : [ 'excel', 'pdf' ],
				"scrollY" : 500,
				"scrollX" : true,
				destroy : true
			});
		}
	});
}

function requestFrom(type, id) {
	var data = {
		reqTxnId : id,
		type : type,
		formType : formType
	};
	sessionStorage.setItem("sendData", JSON.stringify(data));
	window.location = appConfig.baseUrl + "view/request-from.jsp";
}

