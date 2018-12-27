var formType = "OUT";
$(function() {

	if (usersession) {
		$('#set1 td').click(function() {
			$(this).find('i').toggleClass('fa fa-minus')
		});

		setDocType("docType", true);
		setReqNo("ReqNo");
		setBank("bank", true);
		setReqStatus("reqStatus");
		setRequestType("reqType");
		setBgNo("bgNo");
		setPoConNo("poConNo");
		search();
		if (usersession.shareCompany.length > 0) {
			$("#depGroup").prop('disabled', true);
			setCompany("companyCode", true, usersession.shareCompany);
		} else {
			$("#depGroup").prop('disabled', false);
			setCompany("companyCode", false, usersession.userCompany);
		}

		checkVendor("V");
		$("input[name='venCus']").change(function() {
			var val = $("input[name='venCus']:checked").val();
			checkVendor(val);
		});
		// Expired Date
		$("#expDate").daterangepicker(
				{
					opens : 'bottom',
					autoApply : false,
					autoUpdateInput : false,
				},
				function(start, end, label) {
					$("#expDate").val(
							start.format('DD/MM/YYYY') + ' - '
									+ end.format('DD/MM/YYYY'));
					$("#expDateFrom").val(start.format('DD/MM/YYYY'));
					$("#expDateTo").val(end.format('DD/MM/YYYY'));
				});
		$('#btnExpDate').click(function() {
			$("#expDate").click();
		});
		//	
		// Date of Return
		$("#dateOfReDate").daterangepicker(
				{
					opens : 'bottom',
					autoApply : false,
					autoUpdateInput : false,
				},
				function(start, end, label) {
					$("#dateOfReDate").val(
							start.format('DD/MM/YYYY') + ' - '
									+ end.format('DD/MM/YYYY'));
					$("#dateOfReDateFrom").val(start.format('DD/MM/YYYY'));
					$("#dateOfReDateTo").val(end.format('DD/MM/YYYY'));
				});
		$('#btnDateOfReDate').click(function() {
			$("#dateOfReDate").click();
		});
		//	

		var detailRows = [];

	} else {
		hideSpinner();

		bootbox.alert('<div style="color : red">'
				+ "- error กรุณาติดต่อ ผู้ดูแลระบบ" + '</div>', function() {
			window.location = "/gcbg-front-main/";
		});

	}
	
});

// Check Vendor Customer
var ven = false;
var cus = false;
function checkVendor(val) {
	if (val == "V") {
		setVendor("venCus");
	} else {
		setCustomer("venCus");
	}
}

function format(d) {
	return 'Full name: '
			+ d.first_name
			+ ' '
			+ d.last_name
			+ '<br>'
			+ 'Salary: '
			+ d.salary
			+ '<br>'
			+ 'The child row can contain any data you wish, including links, images, inner tables etc.';
}

function search() {
	
	$("#dataTableDetail tbody").empty();

	var currentdate = new Date();
	var expriedDates_e = $("#expDateTo").val() ? moment($("#expDateTo").val())
			.format('YYYY-MM-DD 23:59:59') : "";
	var expriedDates_s = $("#expDateFrom").val() ? moment(
			$("#expDateFrom").val()).format('YYYY-MM-DD 00:00:00') : "";
	var expriedDates = [ '' ];
	var returnDates_e = $("#dateOfReDateTo").val() ? moment(
			$("#dateOfReDateTo").val()).format('YYYY-MM-DD 23:59:59') : "";
	var returnDates_s = $("#dateOfReDateFrom").val() ? moment(
			$("#dateOfReDateFrom").val()).format('YYYY-MM-DD 00:00:00') : "";
	var returnDates = [ '' ];

	if (expriedDates_e != "" && expriedDates_s != "") {
		expriedDates.push(expriedDates_s.toString());
		expriedDates.push(expriedDates_e.toString());
	} else {
		expriedDates.lenght = 0;
	}

	if (returnDates_e != "" && returnDates_s != "") {
		returnDates.push(returnDates.toString());
		returnDates.push(returnDates.toString());
	} else {
		returnDates.lenght = 0;
	}

	var data = {
		"formType" : formType,
		"companyCode" : $("#companyCode").val(),
		"departmentCode" : $("#depGroup").val(),
		"bgNo" : $("#bgNo").val(),
		"bankCode" : $("#bank").val(),
		"vendorCode" : $("#venCus").val(),
		"poSoNo" : $("#poConNo").val(),
		"expriedDates" : expriedDates,
		"returnDates" : returnDates,
		"docType" : $("#docType").val(),
		"status" : $("#status").val(),
		"bgType" : $("#bgType").val(),
		"createdBy" : $("#createdBy").val()
	}
	console.log(data);

	$
			.ajax({
				method : "POST",
				data : data,
				traditional : true,
				crossDomain : true,
				cache : false,
				url : appConfig.endPoint + 'search/bDetail',
				success : function(data) {
					console.log(data);
					if(JSON.stringify(data) != "{}"){
						var Datas = JSON.parse(data.datas);
					}else{
						Datas = [];
					}
					console.log(Datas);
					var obj = Datas;
					var table = $('#example').DataTable({
						"data" : obj,
						"columns" : [
						{
							"className" : 'details-control',
							"orderable" : false,
							"data" : null,
							"defaultContent" : ''
						},
						{
							"data" : "status",
							"className" : 'onclickEvent pointer'
						},
						{
							"data" : "companyName",
							"className" : 'onclickEvent pointer'
						},
						{
							"data" : "vendorProfile",
							"className" : 'onclickEvent pointer'
						},
						{
							"data" : "docType",
							"className" : 'onclickEvent pointer'
						},
						{
							"data" : "bgNo",
							"className" : 'onclickEvent pointer'
						},
						{
							"data" : "bankCode",
							"className" : 'onclickEvent pointer'
						},
						{
							"data" : "amounts",
							"className" : 'onclickEvent pointer',
							"render" : function(data,type, row, meta) {
								return data[0].amount;
							}
						},
						{"data" : "expiredDate",
							"render" : function(data,type, row, meta) {
								var dateHtml = '<span style="display:none;">'+ moment(data).format("YYYYMMDD")+ '</span>'+ moment(data).format("DD/MM/YYYY");
								return dateHtml;
							}
						},
						{"data" : "returnDate",
							"render" : function(data,type, row, meta) {
								var dateHtml = '<span style="display:none;">'+ moment(data).format("YYYYMMDD")+ '</span>'+ moment(data).format("DD/MM/YYYY");
								return dateHtml;
							}
						},
						{"data" : "feeDueDate",
							"render" : function(data,type, row, meta) {
								var dateHtml = '<span style="display:none;">'+ moment(data).format("YYYYMMDD")+ '</span>'+ moment(data).format("DD/MM/YYYY");
								return dateHtml;
							}
						}, {"data" : "createdBy"} 
						],
						"order" : [ [ 1, 'asc' ] ],
						dom : 'Bfrtip',
						buttons : [ 'excel', 'pdf' ],
						"scrollY" : 500,
						"scrollX" : true,
						destroy : true
						});

					// Add event listener for opening and closing details
					$('#example tbody').on('click', 'td.details-control',function() {
						var tr = $(this).closest('tr');
						var row = table.row(tr);

						if (row.child.isShown()) {
							// This row is already open - close it
							row.child.hide();
							tr.removeClass('shown');
						} else {
							// Open this row
							row.child(format(row.data())).show();
							tr.addClass('shown');
						}
					});
					
					$('#example tbody').on('click', 'td.onclickEvent',function() {
						 //alert( 'Clicked on cell in visible column: '+table.cell( this ).index().columnVisible  );
						var data = table.row($(this).closest('tr')).data();
					    parentRowClick('MODIFY', data[Object.keys(data)[0]] , formType);
					});
					
				}
			});
}

/* Formatting function for row details - modify as you need */
function format(d) {
	// `d` is the original data object for the row
	var html = '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'
			+ '<tr class="bg-info text-white">'
			+ '<th>Request Number</th>'
			+ '<th>Doc Type</th>'
			+ '<th>BG No.</th>'
			+ '<th>Amend No.</th>'
			+ '<th>Request Type</th>'
			+ '<th>Amount</th>'
			+ '<th>Effective Date</th>'
			+ '<th>Expired Date</th>'
			+ '<th>Fee Due Date</th>'
			+ '<th>Dafault Date</th>'
			+ '<th>Bank Ack Date</th>' + '</tr>';

	var tran = d.transactions;
	for (var i = 0; i < tran.length; i++) {
		html += '<tr class="pointer" style="background-color:#ddd;" onclick="childRowClick(\'VIEW\',\'' + tran[i]._id + '\' , \''+formType+'\')">'
			+ '<td>' + tran[i].requestNo + '</td>' 
			+ '<td>' + tran[i].docType	+ '</td>' 
			+ '<td>' + tran[i].bgNo + '</td>' 
			+ '<td>' + tran[i].amendNo + '</td>' 
			+ '<td>' + tran[i].requestType+ '</td>' 
			+ '<td>' + tran[i].amounts[0].amount + '</td>'
			+ '<td>' + tran[i].effectiveDate + '</td>' 
			+ '<td>' + tran[i].expiredDate + '</td>' 
			+ '<td>' + tran[i].feeDueDate + '</td>' 
			+ '<td>' + tran[i].defualtBankActDate + '</td>'
			+ '<td></td>' 
			+ '</tr>'
	}
	html += '</table>';
	return html;
}

function parentRowClick(type, id) {
	var data = {
		reqTxnId : id,
		type : type,
		formType : formType
	};
	sessionStorage.setItem("sendData", JSON.stringify(data));
	window.location = appConfig.baseUrl + "view/request-from.jsp";
}

function childRowClick(type, id) {
	var data = {
		reqTxnId : id,
		type : type,
		formType : formType
	};
	sessionStorage.setItem("sendData", JSON.stringify(data));
	window.location = appConfig.baseUrl + "view/request-from.jsp";
}

