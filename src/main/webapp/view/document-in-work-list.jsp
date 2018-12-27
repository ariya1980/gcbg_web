<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>Work list Document In</title>
<%@ include file="/WEB-INF/tag-libraly.jspf"%>
<%@ include file="/WEB-INF/main-menu.jspf"%>
<script src="<%= request.getContextPath() %>/js/select.js" type="text/javascript"></script>
<script src="<%= request.getContextPath() %>/js/document-in-work-list.js" type="text/javascript"></script>
<script type="text/css">

</script>
</head>
<body>
	<div class="container" style="background-color: #fff;">
	<br>
		<div class="card-main">
			<div class="card-body">
			<h1 class="text-head"><i class="fas fa-file-alt"></i> Document In Work List</h1>
			<div class="line-head"></div>


				<!-- Tab Form In -->
				<nav>
				  <div class="nav nav-tabs" id="nav-tab" role="tablist">
				    <a class="nav-item nav-link active" id="myTask-tab" data-toggle="tab" href="#myTask" role="tab" aria-controls="myTask" aria-selected="true">My Task</a>
				    <a class="nav-item nav-link" id="myReq-tab" data-toggle="tab" href="#myReq" role="tab" aria-controls="myReq" aria-selected="false">My Request</a>
				  </div>
				</nav>
				<div class="tab-content" id="nav-tabContent">
				<br>
				  <div class="tab-pane fade show active" id="myTask" role="tabpanel" aria-labelledby="myTask-tab">
				  		<table class="display" id="dataTask">
							<thead>
								<tr class="bg-primary text-white">
									<th style="width: 100px">Request No.</th>
									<th>BGNo.</th>
									<th style="width: 200px">Company</th>
									<th>Department</th>
									<th style="width: 150px;">po / contract no.</th>
									<th style="width: 200px;">Vendor / Customer</th>
									<th>Bank</th>
									<th>Amount</th>
									<th style="width: 150px;">Request Type</th>
									<th>Status</th>
									<th style="width: 130px">Submitted On</th>
									<th style="width: 130px">Submitted By</th>
								</tr>
							</thead>
						</table>
				  </div>
				  <div class="tab-pane fade" id="myReq" role="tabpanel" aria-labelledby="myReq-tab">
				  	<table class="display" id="dataReq">
						<thead>
							<tr class="bg-primary text-white">
								<th width="100px">Request No.</th>
								<th>BGNo.</th>
								<th width="200px">Company</th>
								<th>Department</th>
								<th width="150px">po / contract no.</th>
								<th width="200px">Vendor / Customer</th>
								<th>Bank</th>
								<th>Amount</th>
								<th width="150px">Request Type</th>
								<th>Status</th>
								<th width="130px">Submitted On</th>
								<th width="130px">Submitted By</th>
							</tr>
						</thead>
					</table>
				  </div>
				</div>
			</div>
		</div>
	</div>
	<br>
	<br>
</body>
</html>