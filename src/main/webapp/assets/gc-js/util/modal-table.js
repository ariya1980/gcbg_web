function showModalTable(userFullname,userId,company,Id,title){
	
	showSpinner();
	var htmlContext = '<div class="modal fade" id="'+Id+'" tabindex="-1" role="dialog" aria-labelledby="'+Id+'Label" aria-hidden="true">' +
							'<div class="modal-dialog modal-lg" role="document">' +
						    	'<div class="modal-content">' +
						      		'<div class="modal-header">' +
						        		'<h5 class="modal-title"  id="'+Id+'Label">'+title+' : '+userFullname+'</h5>' +
						        		'<button type="button" class="close" data-dismiss="modal" aria-label="Close">' + 
								        	'<span aria-hidden="true">&times;</span>' +
								        '</button>' +
						      		'</div>' +
						      		'<div class="modal-body">' +
						      			'<div class="table-responsive">' +
							       			'<table id="modalTable" class="display" width="100%"></table>' +
						      			'</div>' +
						      		'</div>' +
						    	'</div>' +
						  	'</div>' +
						'</div>';
		
	document.getElementById("drawModal").innerHTML = htmlContext;
	
	console.log(document.getElementById("drawModal"));
	
	searchTableHistory(userId,company,Id);
}


function searchTableHistory(userId,company,Id){
	var adminsession = JSON.parse(base64Decode($('#adminSession').val()));
	
	var tableHead = adminsession.menu_items[7].child[0].child[0].header;
	var headerType = adminsession.menu_items[7].child[0].child[0].headerType;
	
	
	var process = $.ajax({
		type : "get",
		url : $("#urlContext").val()+"/bc-user-report-detail/detail",
		data : data =  {
				'userId' :  userId,
				'companyId' : company,
				'productType':'',
				'fileUploadHis':'',
				'status':''
			},
		success : function(data)
		{
			console.log(">>>>>>>>test : ", data);
			var temp = data;
			for (i=0; i< temp.datatableDatas.length;i++) {
				for (j=0; j< 9 ;j++) {
					
					if (j == 0) {
						data.datatableDatas[i][j] = temp.datatableDatas[i][0];
				
					} else if (j == 1) {
						data.datatableDatas[i][j] = temp.datatableDatas[i][2];
					}else if (j == 2) {
						data.datatableDatas[i][j] = temp.datatableDatas[i][4];
					}else if (j == 3) {
						data.datatableDatas[i][j] = temp.datatableDatas[i][5];
					}else if (j == 4) {
						data.datatableDatas[i][j] = temp.datatableDatas[i][6];
					}else if (j == 5) {
						data.datatableDatas[i][j] = temp.datatableDatas[i][7];
					}else if (j == 6) {
						data.datatableDatas[i][j] = temp.datatableDatas[i][9];
					}else if (j == 7) {
						data.datatableDatas[i][j] = temp.datatableDatas[i][10];
					}else if (j == 8) {
						data.datatableDatas[i][j] = temp.datatableDatas[i][11];
					}
					
				}
				data.datatableDatas[i].length = 9;
			}
			hideSpinner();
			var tableHtml = "<thead>" +
						"<tr>";
			for (var i=0;i < tableHead.length;i++) {
				tableHtml += "<th>"+tableHead[i]+"</th>";
			}
			tableHtml +="</tr>" +
						"</thead>" +
						"<tbody>";
			if ( data.datatableDatas != null && data.datatableDatas != "" ){
			for ( var i = 0 ; i < data.datatableDatas.length ; i++) {
				tableHtml += "<tr>";
					for (var j = 0; j<data.datatableDatas[i].length;j++) {
						tableHtml += "<td>"+data.datatableDatas[i][j]+"</td> ";
					}		
				tableHtml +="</tr> ";
				}
			}
			tableHtml += "</tbody>";
			$("#modalTable").append(tableHtml);
			$('#modalTable').DataTable( {
//			"searching": false,
//			"paging": false,
//			"info":     false,
			"columns": [
			{
			"render": function ( data, type, row ) {
			var date = moment(data, "YYYY-MM-DD HH:mm:ss").toDate();
			return '<span style="display:none;">'+moment(date).format("YYYYMMDDHHmmss")+'</span>'+moment(date).format("DD/MM/YYYY HH:mm:ss");
			},
			className: "dt-center"
			},
			{
			
			},
			{
			
			},
			{
			
			},
			{
			
			},
			{
			
			},
			{
			
			},
			{
			className: "dt-center"
			},
			{
			className: "dt-center"
			}
			]
			});
			
			
			
			hideSpinner();
			
		}
	});
	
	$.when( process ).done(function( ) {
		$('#detailReport').modal('show');
		});
	
}




