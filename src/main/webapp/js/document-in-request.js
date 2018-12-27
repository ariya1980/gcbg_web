var formType = "IN";	
$(function(){
		if ( usersession ){
		
			setDocType("docType", true);
			setReqNo("ReqNo");
			setBank("bank", true);
			setReqStatus("reqStatus");
			setRequestType("reqType");
			setBgNo("bgNo");
			setPoConNo("poConNo");
		
			
			if (usersession.shareCompany != undefined) {
				$("#depGroup").prop('disabled', true);
				setCompany("companyCode", true, usersession.shareCompany);
			} else {
				$("#depGroup").prop('disabled', false);
				var dataCompany = [{
					"comanyCode" : usersession.userCompany.comanyCode,
					"comanyName" : usersession.userCompany.comanyName
				}];
				setCompany("companyCode", true, dataCompany);
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
			
			search();
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
			
			
		$.ajax({
		    method : "POST",
		    data :  data,
		    traditional: true,
		    crossDomain: true,
		    cache: false,
		    url: appConfig.endPoint + 'search/detailTXN', 
		    success: function(data){
		    	//$('#dataTableSearch tbody').empty();
		        console.log("xxx : " ,data);
		        var Datas;
		        if(JSON.stringify(data) != "{}"){
		        	Datas = JSON.parse(data.datas);
		        }else{
		        	Datas = [];
		        }
		        var obj = Datas;
		        var table = $('#example').DataTable({
		        	"data" : obj,
		        	"destroy": true,
					"columns" : [
					{
						"data" : "requestNo"
					},
					{
						"data" : "requestType"
					},
					{
						"data" : "poSoNo"
					},
					{
						"data" : "requestorCompanyName"
					},
					{
						"data" : "requestorDepartmentName"
					},
					{
						"data" : "status"
					},
					{
						"data" : "docType"
					},
					{
						"data" : "bgNo"
					},
					{
						"data" : "bankCode"
					},
					{
						"data" : "amounts",
						"render" : function(data,type, row, meta) {
							return data[0].amount;
						}
					},
					{
						"data" : "vendorProfile",
					},
					{
						"data" : "createdBy",
					},
					{
						"data" : "submittedName",
					}
					],
					"order" : [ [ 1, 'asc' ] ],
					dom : 'Bfrtip',
					buttons : [ 'excel', 'pdf' ],
					"scrollY" : 500,
					"scrollX" : true,
					destroy : true
					});
		        
		        $('#example tbody').addClass("pointer");
		        
		        $('#example tbody').on('click', 'tr', function () {
		        	var data = table.row($(this).closest('tr')).data();
				    rowClick('WORKFLOW',data[Object.keys(data)[0]] , formType);
		        	
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
	
