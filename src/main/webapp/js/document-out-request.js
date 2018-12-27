var formType = "OUT";
$(function(){
		if ( usersession ){
		
			setDocType("docType", true);
			setReqNo("ReqNo");
			setBank("bank", true);
			setReqStatus("reqStatus");
			setRequestType("reqType");
			setBgNo("bgNo");
			setPoConNo("poConNo");
		
			if (usersession.shareCompany.length > 0) {
				$("#depGroup").prop('disabled', true);
				setCompany("companyCode", true, usersession.shareCompany);
			} else {
				$("#depGroup").prop('disabled', false);
				setCompany("companyCode", false, usersession.userCompany);
			}
			console.log(usersession);
			checkVendor("V");
			$("input[name='venCus']").change(function(){
				var val = $("input[name='venCus']:checked").val();
				checkVendor(val);
			});
			
			// Input Date	
			$("#submitDate").daterangepicker({
				opens: 'bottom',
				autoApply: false,
				autoUpdateInput:false,
			}, function(start, end, label) {
				$("#submitDate").val(start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'));
				$("#submitDateFrom").val(start.format('DD/MM/YYYY'));
				$("#submitDateTo").val(end.format('DD/MM/YYYY'));
			});
			$('#btnSubmitDate').click(function(){
				$("#submitDate").click();
			});
		//	
		
	//		$('#dataTableSearch tbody').on( 'click', 'tr', function () {
	//	        if ( $(this).hasClass('selected') ) {
	//	            $(this).removeClass('selected');
	//	        }
	//	        else {
	//	        	 var id = $(this).attr('id');
	//	        	 var data = {
	//	        		reqTxnId : id,
	//	        		type : "MODIFY"
	//	        	 };
	//	        	 
	//	        	 sessionStorage.setItem("sendData", JSON.stringify(data));
	//	             window.location = appConfig.baseUrl+"view/request-from.jsp";
	//	            table.$('tr.selected').removeClass('selected');
	//	            $(this).addClass('selected');
	//	        }
	//	    } );
		} else {
			hideSpinner();
			
			bootbox.alert('<div style="color : red">'+ "- error กรุณาติดต่อ ผู้ดูแลระบบ" + '</div>', function() {
				window.location = "/gcbg-front-main/";
			});
		}
		
	});
	
	// Check Vendor Customer
	var ven = false;
	var cus = false;
	function checkVendor(val){
		if(val == "V"){
			setVendor("venCus");
		}else{
			setCustomer("venCus");
		}
	}
	
	
	function search(){
		
		var currentdate = new Date();
		var submitted_e =  $("#submitDateTo").val() ? moment($("#submitDateTo").val()).format('YYYY-MM-DD 23:59:59') : "";
		var submitted_s = $("#submitDateFrom").val() ? moment($("#submitDateFrom").val()).format('YYYY-MM-DD 00:00:00') : "";
		var submitted = [''];
		
		if (submitted_e != "" && submitted_s != "") {
			submitted.push(submitted_s.toString());
			submitted.push(submitted_e.toString());
		} else {
			 submitted.lenght = 0;
		}
			var data = {
					"formType" : formType,
		    		"requestNo":$("#ReqNo").val(), 
		    		"requestType": $("#reqType").val(), 
		    		"bgNo": $("#bgNo").val(),
		    		"bankCode" : $("#bank").val(), 
		    		"companyCode" :$("#companyCode").val(), 
		    		"departmentCode" : $("#depGroup").val(), 
		    		"status" : $("#reqStatus").val(), 
		    		"poSoNo" : $("#poConNo").val(), 
		    		"docType" : $("#docType").val(),
		    		"vendorCode" : $("#venCus").val(), 
		    		"createdBy" : $("#createdBy").val(), 
		    		"submitted": submitted
			};
			
			console.log(data);
			
			
		$("#doncumentTable").show();
		$.ajax({
		    method : "POST",
		    data :  data,
		    traditional: true,
		    crossDomain: true,
		    cache: false,
		    url: appConfig.endPoint + 'search/detailTXN', 
		    success: function(data){
		    	if(JSON.stringify(data) != "{}"){
		    	$("#dataTableSearch").find('tbody').empty();
		        console.log(data);
		        var Datas = JSON.parse(data.datas);
		        var dataTable = '';
		        for (i=0;i<Datas.length;i++) {
		        	dataTable += '<tr class="pointer" onclick="rowClick(\'WORKFLOW\',\''+Datas[i]._id+'\' , \''+formType+'\')">';
		        	
		        	Datas[i].requestNo ? dataTable += '<td>' +Datas[i].requestNo + '</td>' : dataTable += '<td>' + '-' + '</td>';
		        	Datas[i].requestType ? dataTable += '<td>' + Datas[i].requestType + '</td>' : dataTable += '<td>' + '-' + '</td>';
		        	Datas[i].poSoNo ? dataTable += '<td>' + Datas[i].poSoNo + '</td>' : dataTable += '<td>' + '-' + '</td>';
		        	Datas[i].companyName ? dataTable += '<td>' + Datas[i].companyName + '</td>' : dataTable += '<td>' + '-' + '</td>';
		        	Datas[i].departmentName ? dataTable += '<td>' + Datas[i].departmentName + '</td>' : dataTable += '<td>' + '-' + '</td>';
		        	Datas[i].status ? dataTable += '<td>' + Datas[i].status + '</td>' : dataTable += '<td>' + '-' + '</td>';
		        	Datas[i].docType ? dataTable += '<td>' + Datas[i].docType + '</td>' : dataTable += '<td>' + '-' + '</td>';
		        	Datas[i].bgNo ? dataTable += '<td>' + Datas[i].bgNo + '</td>' : dataTable += '<td>' + '-' + '</td>';
		        	Datas[i].bankCode ? dataTable += '<td>' + Datas[i].bankCode + '</td>' : dataTable += '<td>' + '-' + '</td>';
		        	Datas[i].amounts[0].amount ? dataTable += '<td>' + parseInt(Datas[i].amounts[0].amount) + '</td>' : dataTable += '<td>' + '-' + '</td>';
		        	Datas[i].vendorProfile ? dataTable += '<td>' + Datas[i].vendorProfile + '</td>' : dataTable += '<td>' + '-' + '</td>';
		        	Datas[i].createdBy ? dataTable += '<td>' + Datas[i].createdBy + '</td>' : dataTable += '<td>' + '-' + '</td>';
		        	Datas[i].submitted ? dataTable += '<td>' + moment(Datas[i].submitted).format('LL') + '</td>' : dataTable += '<td>' + '-' + '</td>';
		        	dataTable += '</tr>';
		        }
		    	}
		        $("#dataTableSearch").find('tbody').append( dataTable );
		        $('#dataTableSearch').DataTable({
		        	dom: 'Bfrtip',
		            buttons: [
//		                'copy', 'csv', 'excel', 'pdf', 'print'
		            	'excel', 'pdf'
		            ],
		            "scrollY": 500,
		            "scrollX": true,
		            "select": true,
		            destroy: true
		        } );
		    }
		});
		
	}
	
	function create(){

		var data = {
				reqTxnId : "",
				type : "CREATE",
				formType : formType
			};
		sessionStorage.setItem("sendData", JSON.stringify(data));
		window.location = appConfig.baseUrl +"view/request-from.jsp";
	}
	
	function rowClick(type, id){
		var data = {
				reqTxnId : id,
				type : type,
				formType : formType
		};
		sessionStorage.setItem("sendData", JSON.stringify(data));
		window.location = appConfig.baseUrl +"view/request-from.jsp";
	}
	
