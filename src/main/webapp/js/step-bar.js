var stepBar;
var userStapData;
$(function(){
	//alert();
});
// set step bar
function setStepBar(data){
	stepBar = jQuery.parseJSON(sessionStorage.getItem('stepBar'));
	var stepBarData = []
	var functionCode = data.functionCode;
	var bgType = data.bgType;
	var status = data.status + "|" + data.action;
	var objStep;
	for(var i=0 ; i<Object.keys(stepBar).length; i++){
		if(Object.keys(stepBar)[i] == functionCode){
			var objFunction = stepBar[Object.keys(stepBar)[i]];
			for(var y=0 ; y<Object.keys(objFunction).length ; y++){
				if(Object.keys(objFunction)[y] == bgType){
					var objBgType = objFunction[Object.keys(objFunction)[y]];
					for(var m=0 ; m<Object.keys(objBgType).length ; m++){
						if(Object.keys(objBgType)[m] == status){
							objStep = objBgType[Object.keys(objBgType)[m]];
							break;
						}
					}
				}
			}
		}
	}
	
	var stepHtml = "";
	var statusReturn = false;
	var statusWork = false;
	if(data.requestType == "RETURN"){
		statusReturn = true;
	}
	if(data.status == "COMPLETE"){
		statusWork = true;
	}

	var todo1 = 0;
	for(var i=0 ; i<objStep.length ; i++){
		var userHtml = "";
		for(var y=0 ; y<userStapData.length ; y++){
			if(objStep[i].by == ("#"+userStapData[y].userGroup+"#")){
				if(userStapData[y].userName == "" || userStapData[y].userName == null){
					userHtml = "";
				}else{
					userHtml = '<span class="tooltiptext">'+userStapData[y].userName+'</span>';
				}
			}
		}
		
		var liHtml = '<li id="li'+i+'">'
					+ '<div class="tooltipstep">'
					+ '<center>'
					+ '<div class="icon-wrap">'
					+ '<div style="margin-top: -6px;">'
					+ '<svg class="icon-state icon-check-mark">'
					+ '<i id="icon'+i+'"></i>'
					+ '</svg>'
					+ '</div>'
					+ '</div>'
					+ '<span id="text'+i+'" class="progress-text"></span>'
					+ '</center>'
					+ userHtml
					+ '</div>'
					+ '</li>';
		$('#stepMain').append(liHtml);
		
		if(statusReturn == true && statusWork == true){
			progressCross(i,objStep[i]);
		}else{
			if(objStep[i].flag == "Y"){
				progressDone(i,objStep[i]);
			}else{
				todo1++;
				if(todo1 == 1){
					progressCurrent(i,objStep[i]);
				}else{
					progressTodo(i,objStep[i]);
				}
			}
		}
	}
	
}

function progressDone(i,objStep){
	$('#li'+i).addClass("progress-done");
	$('#icon'+i).addClass("fas fa-check");
	$('#text'+i).append(objStep.show);
}
function progressCurrent(i,objStep){
	$('#li'+i).addClass("progress-done progress-current");
	$('#icon'+i).addClass("");
	$('#text'+i).append(objStep.show);
}
function progressTodo(i,objStep){
	$('#li'+i).addClass("progress-todo");
	$('#icon'+i).addClass("");
	$('#text'+i).append(objStep.show);
}
function progressCross(i,objStep){
	$('#li'+i).addClass("progress-cross");
	$('#icon'+i).addClass("fas fa-times");
	$('#text'+i).append(objStep.show);
}

// get user step
function userStep(data){
	ajaxTaskUserStep = $.ajax({
    	type : "get",
    	cache: false,
    	data : {"transactionId" : data._id},
    	url: appConfig.endPoint+"api/getUserGroup",
    	success: function(data){
    		console.log(data);
    		userStapData = jQuery.parseJSON(data.datas);
    	}
    }).done(function(data, textStatus, jqXHR) {
    });
}