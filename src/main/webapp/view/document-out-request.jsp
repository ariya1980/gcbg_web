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
<script src="<%= request.getContextPath() %>/js/document-out-request.js" type="text/javascript"></script>

</head>
<body>
	<div class="container" style="background-color: #fff;">
	<br>
		<div class="card-main">
			<div class="card-body">
				<div class="row">
				<div class="col-10">
					<h1 class="text-head">
						<i class="fas fa-file-alt"></i> Request Document Out
					</h1>
				</div>
				<div class="col-2" style="text-align: right;">
					<button type="button" class="btn btn-primary" onclick="create();">Create</button>
				</div>
			</div>
			<div class="line-head" style="margin-top: 7px;"></div>

				
				<div class="row">
					<div class="col-md-3">
						<div class="form-group">
							<label class="text-primary">Company</label> <select
								class="form-control" id="companyCode">
							</select>
						</div>
					</div>
					<div class="col-md-3">
						<div class="form-group">
							<label class="text-primary">Request No.</label> <select
								class="form-control" id="ReqNo">
							</select>
						</div>
					</div>
					<div class="col-md-3">
						<div class="form-group">
							<label class="text-primary">Doc Type</label> <select
								class="form-control" id="docType">
							</select>
						</div>
					</div>
					<div class="col-md-3">
						<div class="form-group">
							<label class="text-primary">Department</label> <select
								class="form-control" id="depGroup">
							</select>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-3">
						<div class="form-group">
							<label class="text-primary">Request Type</label> <select
								class="form-control" id="reqType">
							</select>
						</div>
					</div>
					<div class="col-md-3">
						<div class="form-group">
							<label class="text-primary" id="venCusGroup">
								<div class="form-check form-check-inline">
									<label class="containerradio-s">Vendor<input
										type="radio" checked="checked" name="venCus" value="V">
										<span class="checkmark-s"></span>
									</label>
								</div>
								<div class="form-check form-check-inline">
									<label class="containerradio-s">Customer<input
										type="radio" name="venCus" value="C"> <span
										class="checkmark-s"></span>
									</label>
								</div>
							</label> <select class="form-control" id="venCus">
								<option></option>
							</select>
						</div>
					</div>
					<div class="col-md-3">
						<div class="form-group">
							<label class="text-primary">BG No.</label><br> <select
								class="form-control" id="bgNo">
								<option></option>
							</select>
						</div>
					</div>
					<div class="col-md-3">
						<div class="form-group">
							<label class="text-primary">Po/Contrac No.</label><br> <select
								class="form-control" id="poConNo">
								<option></option>
							</select>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-3">
						<div class="form-group">
							<label class="text-primary">Created By</label> <input
								type="text" class="form-control" id="createdBy">
						</div>
					</div>
					<div class="col-md-3">
						<div class="form-group">
							<label class="text-primary">Bank</label> <select
								class="form-control" id="bank">
								<option></option>
							</select>
						</div>
					</div>
					<div class="col-md-3">
						<div class="form-group">
							<label class="text-primary">Request Status</label> <select
								class="form-control" id="reqStatus">
							</select>
						</div>
					</div>
					<div class="col-md-3">
						<div class="form-group">
							<label class="text-primary">Submitted On</label>
							<div class="input-group">
								<input type="text" id="submitDate" class="form-control">
								<div class="input-group-append">
									<button class="btn-date text-secondary" type="button"
										id="btnSubmitDate">
										<i class="far fa-calendar-alt"></i>
									</button>
								</div>
							</div>
						</div>
						<input type="hidden" id="submitDateFrom" /> <input type="hidden"
							id="submitDateTo" />
					</div>
				</div>
			
			<div class="text-center" style="margin-top: 15px;">
				<button type="button" class="btn btn-info" onclick="search();">Search</button>
			</div>
			<!-- Tab Form out -->
			<div class="line-head" style="margin-top: 20px;"></div>
				<div id="doncumentTable" class="table-responsive"
					style="display: none">
					<table class="table display" id="dataTableSearch">
						<thead>
							<tr class="bg-primary text-white">
								<th width="130px">Request No.</th>
								<th width="130px">Request Type</th>
								<th width="150px">Po / Contract No.</th>
								<th width="300px">Company</th>
								<th>Department</th>
								<th width="150px">Request Status</th>
								<th width="130px">Doc Type</th>
								<th width="100px">BG No.</th>
								<th>Bank</th>
								<th>Amount</th>
								<th width="180px">Vendor / Customer</th>
								<th width="130px">Created By</th>
								<th width="130px">Submitted On</th>
							</tr>
						</thead>
						<tbody>

						</tbody>
					</table>
					<br>
				</div>
				</div>
				
				
			</div>
		</div>

<br><br>
</body>
</html>