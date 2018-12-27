var urlContext;

$(function(){
	urlContext = $('#urlContext').val();
	console.log(usersession.userId);
	$('#userId').text(usersession.userId);
	$('#userName').text(usersession.userName);
	var menuShow = '';
	
	//var menuText = ["Worklist","Request","Documents","Blockchain Data","Reports","Administrator"];
	
	 $("#menuShow").empty();
		
		if (usersession.userGroup == 'ADMIN') {
			
			menuShow += //'<li class="menu-list"><a class="menu-a" style="text-decoration: none;" href="/gcbg-front-main/view/document-in-work-list.jsp"><font id="textMenu1" onclick="menuOnClick(this)">WORKLIST</font><span class="line-r"></span></a></li>'
						
						'<li class="menu-list">'
						+ '<a class="menu-a" style="text-decoration: none;" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="textMenu1" onclick="menuOnClick(this)"><font>REQUEST/STATUST <i class="fas fa-caret-down"></i></font><span class="line-r"></span></a>'
						+ '<div class="dropdown-menu shadow" aria-labelledby="textMenu1">'
						+ '<a href="'+urlContext+'/view/document-in-request.jsp" style="text-decoration: none;"><button class="dropdown-item pointer" type="button">REQUEST/STATUST (IN) </button></a>'
					    + '<a href="'+urlContext+'/view/document-out-request.jsp" style="text-decoration: none;"><button class="dropdown-item pointer" type="button">REQUEST/STATUST (OUT)</button></a>'
					    + '</div></li>'	
					    
					    +'<li class="menu-list">'
						+ '<a class="menu-a" style="text-decoration: none;" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="textMenu2" onclick="menuOnClick(this)"><font>COMPLETD DOCUMENTS <i class="fas fa-caret-down"></i></font><span class="line-r"></font></a>'
						+ '<div class="dropdown-menu shadow" aria-labelledby="textMenu2">'
						+ '<a href="'+urlContext+'/view/document-in-list.jsp" style="text-decoration: none;"><button class="dropdown-item pointer" type="button">COMPLETD DOCUMENTS (IN) </button></a>'
					    + '<a href="'+urlContext+'/view/document-out-list.jsp" style="text-decoration: none;"><button class="dropdown-item pointer" type="button">COMPLETD DOCUMENTS (OUT)</button></a>'
					    + '</div></li>'		
						
					    + '<li class="menu-list"><a class="menu-a" style="text-decoration: none;" href="#" id="textMenu3" onclick="menuOnClick(this)><font">Reports</font><span class="line-r"></span></a></li>'

					    +'<li class="menu-list">'
						+ '<a class="menu-a" style="text-decoration: none;" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="textMenu4" onclick="menuOnClick(this)"><font>addministrator <i class="fas fa-caret-down"></i></font><span class="line-r"></font></a>'
						+ '<div class="dropdown-menu shadow" aria-labelledby="textMenu4">'
						+ '<div class="list-btn-main">Data Management</div>'
						+ '<div class="">'
						+ '<a href="'+urlContext+'/view/management/bank/bank.jsp" class="list-btn" style="text-decoration: none;"><button class="dropdown-item pointer text-uppercase" type="button">Bank</button></a>'
					    + '<a href="'+urlContext+'/view/management/company/company.jsp" class="list-btn" style="text-decoration: none;"><button class="dropdown-item pointer text-uppercase" type="button">Company</button></a>'
					    + '<a href="'+urlContext+'/view/management/currency/currency.jsp" class="list-btn" style="text-decoration: none;"><button class="dropdown-item pointer text-uppercase" type="button">Currency</button></a>'
					    + '<a href="'+urlContext+'/view/management/customer/customer.jsp" class="list-btn" style="text-decoration: none;"><button class="dropdown-item pointer text-uppercase" type="button">Customer</button></a>'
					    + '<a href="'+urlContext+'/view/management/vendor/vendor.jsp" class="list-btn" style="text-decoration: none;"><button class="dropdown-item pointer text-uppercase" type="button">Vendor</button></a>'
					    + '<a href="'+urlContext+'/view/management/user/user.jsp" class="list-btn" style="text-decoration: none;"><button class="dropdown-item pointer text-uppercase" type="button">User</button></a>'
					    + '</div>'
					    + '<div class="list-btn-main">Configuration</div>'
						+ '<div class="">'
						+ '<a href="'+urlContext+'/view/management/email-alert/email-alert.jsp" class="list-btn" style="text-decoration: none;"><button class="dropdown-item pointer" type="button">Email Alert</button></a>'
					    + '<a href="'+urlContext+'/view/management/owner/owner.jsp" class="list-btn" style="text-decoration: none;"><button class="dropdown-item pointer" type="button">Owner</button></a>'
					    + '</div>'
					    + '</div></li>'		
					    
						+ '<li class="menu-list"><a class="menu-a" style="text-decoration: none;" href="#" id="textMenu5" onclick="menuOnClick(this)"><font>Help</font></a></li>' ;
							
		} else {
			menuShow += '<li class="menu-list">'
				+ '<a class="menu-a" style="text-decoration: none;" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="textMenu1" onclick="menuOnClick(this)"><font>REQUEST/STATUST <i class="fas fa-caret-down"></i></font><span class="line-r"></span></a>'
				+ '<div class="dropdown-menu shadow" aria-labelledby="textMenu1">'
				+ '<a href="'+urlContext+'/view/document-in-request.jsp" style="text-decoration: none;"><button class="dropdown-item pointer" type="button">REQUEST/STATUST (IN) </button></a>'
			    + '<a href="'+urlContext+'/view/document-out-request.jsp" style="text-decoration: none;"><button class="dropdown-item pointer" type="button">REQUEST/STATUST (OUT)</button></a>'
			    + '</div></li>'	
			    
			    +'<li class="menu-list">'
				+ '<a class="menu-a" style="text-decoration: none;" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="textMenu2" onclick="menuOnClick(this)"><font>COMPLETD DOCUMENTS <i class="fas fa-caret-down"></i></font><span class="line-r"></font></a>'
				+ '<div class="dropdown-menu shadow" aria-labelledby="textMenu2">'
				+ '<a href="'+urlContext+'/view/document-in-list.jsp" style="text-decoration: none;"><button class="dropdown-item pointer" type="button">COMPLETD DOCUMENTS (IN) </button></a>'
			    + '<a href="'+urlContext+'/view/document-out-list.jsp" style="text-decoration: none;"><button class="dropdown-item pointer" type="button">COMPLETD DOCUMENTS (OUT)</button></a>'
			    + '</div></li>'		
			    
				+ '<li class="menu-list"><a class="menu-a" style="text-decoration: none;" href="#" id="textMenu5" onclick="menuOnClick(this)"><font>Help</font></a></li>' ;
					;
		}
		
		 $("#menuShow").append( menuShow );
	
		$(".nav-item").click(function() {
			var id = $(this).attr('id');
			sessionStorage.setItem("menu_Id", id);
	    });
	 
		if(sessionStorage.getItem('menuId') == undefined || sessionStorage.getItem('menuId') == "" ){
		}else{
			$('#'+sessionStorage.getItem('menuId') + ' font').addClass("click-munu");
		}
		if(sessionStorage.getItem('menuTopId') == undefined || sessionStorage.getItem('menuTopId') == ""){
		}else{
			$('#'+sessionStorage.getItem('menuTopId')).addClass("click-munu-top");
		}
});

function menuOnClick(e){
	var id = e.id;
	sessionStorage.setItem('menuId', id);
	sessionStorage.setItem('menuTopId', "");
	//$('#'+id).class("click-munu");
}

function menuTopOnClick(e){
	var id = e.id;
	sessionStorage.setItem('menuTopId', id);
	sessionStorage.setItem('menuId', "");
	//$('#'+id).class("click-munu");
}
