<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>Request Document In</title>
<%@ include file="/WEB-INF/tag-libraly.jspf"%>
<%@ include file="/WEB-INF/main-menu.jspf"%>
<%@ include file="/WEB-INF/global-constant.jspf"%>
<script src="<%= request.getContextPath() %>/js/select.js" type="text/javascript"></script>
<script src="<%= request.getContextPath() %>/js/all-task.js" type="text/javascript"></script>

</head>
<body>
	<div class="container" style="background-color: #fff;">
	<br>
		<div class="card-main">
			<div class="card-body">
				<h1 class="text-head">
					<i class="fas fa-file-alt"></i> All Task
				</h1>
				<div class="line-head"></div>
				
				<ul class="nav nav-tabs" id="myTab" role="tablist">
				  <li class="nav-item">
				    <a class="nav-link active" id="in-tab" data-toggle="tab" href="#in" role="tab" aria-controls="in" aria-selected="true" onclick="getMyTask('IN')">My Document In
</a>
				  </li>
				  <li class="nav-item">
				    <a class="nav-link" id="out-tab" data-toggle="tab" href="#out" role="tab" aria-controls="out" aria-selected="false" onclick="getMyTask('OUT')">My Document Out
</a>
				  </li>
				</ul>
				<div class="tab-content" id="myTabContent">
				  <div class="tab-pane fade show active" id="in" role="tabpanel" aria-labelledby="in-tab">
				  <br>
				  	<table class="display" id="dataTaskIN">
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
				  <div class="tab-pane fade" id="out" role="tabpanel" aria-labelledby="out-tab">
				  <br>
				  	<table class="display" id="dataTaskOUT">
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
	<br><br>
</body>
</html>