<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>Document Out Work List</title>
<%@ include file="/WEB-INF/tag-libraly.jspf"%>
<%@ include file="/WEB-INF/main-menu.jspf"%>
<script src="<%= request.getContextPath() %>/js/select.js" type="text/javascript"></script>
<script src="<%= request.getContextPath() %>/js/document-out-work-list.js" type="text/javascript"></script>
<script type="text/css">

</script>
</head>
<body>
	<div class="container" style="background-color: #fff;">
	<br>
		<div class="card-main">
			<div class="card-body">
			<h1 class="text-head"><i class="fas fa-file-alt"></i> Document Out Work List</h1>
			<div class="line-head"></div>


				<!-- Tab Form In -->
				<div id="tabIn">
					<ul class="nav nav-tabs" id="myTabIn" role="tablist">
						<li class="nav-item"><a class="nav-link active"
							id="myTaskInTask-tab" data-toggle="tab" href="#myTabInTask"
							role="tab" aria-controls="myTabInTask" aria-selected="true">My
								Task</a></li>
						<li class="nav-item"><a class="nav-link" id="myTaskInreq-tab"
							data-toggle="tab" href="#myTaskInreq" role="tab"
							aria-controls="myTaskInreq" aria-selected="false">My Request</a></li>
						
					</ul>
					<div class="tab-content" id="myTabContent">
						<div class="tab-pane fade show active" id="myTaskInreq" role="tabpanel"
							aria-labelledby="myTaskInreq-tab">
							<br>
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
								<tbody>

								</tbody>
							</table>
						</div>
						
						<div class="tab-pane fade" id="myTabInTask"
							role="tabpanel" aria-labelledby="myTaskInTask-tab">
							<br>
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
								<tbody>
								</tbody>
							</table>
						</div>
					</div>
				</div>




			</div>
		</div>
	</div>
	<br>
	<br>
</body>
</html>