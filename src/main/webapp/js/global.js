var usersession;
usersession = jQuery.parseJSON(sessionStorage.getItem("usersession"));

var appConfig;
appConfig = jQuery.parseJSON(sessionStorage.getItem("appConfig"));

//$(function(){
//	
//		   var menuId = sessionStorage.getItem("menu_Id");
//		
//	       if (usersession.userGroup == 'ADMIN' && menuId) {
//	       
//	        $(".nav-item#menu1").removeClass('active');
//	        $(".nav-item#menu2").removeClass('active');
//	        $(".nav-item#menu3").removeClass('active');
//	        $(".nav-item#menu4").removeClass('active');
//	        $(".nav-item#menu5").removeClass('active');
//	        $(".nav-item#menu6").removeClass('active');
//	    	$(".nav-item#"+menuId).addClass('active');
//	       } else if (usersession.userGroup != 'ADMIN' && menuId){
//	    	   $(".nav-item#menu1").removeClass('active');
//		        $(".nav-item#menu2").removeClass('active');
//		        $(".nav-item#menu3").removeClass('active');
//		    	$(".nav-item#"+menuId).addClass('active');
//	       } else {
//	    	   $(".nav-item#menu1").addClass('active');
//	       }
//});
