<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>Document List Out</title>
<%@ include file="/WEB-INF/tag-libraly.jspf"%>
<%@ include file="/WEB-INF/main-menu.jspf"%>
<%@ include file="/WEB-INF/global-constant.jspf"%>
<script src="<%= request.getContextPath() %>/js/select.js" type="text/javascript"></script>
<script src="<%= request.getContextPath() %>/js/document-out-list.js" type="text/javascript"></script>
<style>
td.details-control {
    background: url('../assets/images/plus.png') no-repeat center center;
    background-size: 16px;
    cursor: pointer;
}
tr.shown td.details-control {
    background: url('../assets/images/minus.png') no-repeat center center;
    background-size: 16px;
}
</style>
</head>
<body>
<div class="container" style="background-color: #fff;">
	<br>
		<div class="card-main">
			<div class="card-body">
				<h1 class="text-head">
					<i class="fas fa-file-alt"></i> Document List Out
				</h1>
				<div class="line-head"></div>
				
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
							<label class="text-primary">Department</label> <select
								class="form-control" id="depGroup">
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
							<label class="text-primary">Bank</label> <select
								class="form-control" id="bank">
								<option></option>
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
							<label class="text-primary">Expired Date</label>
							<div class="input-group">
								<input type="text" id="expDate" class="form-control">
								<div class="input-group-append">
									<button class="btn-date text-secondary" type="button"
										id="btnExpDate">
										<i class="far fa-calendar-alt"></i>
									</button>
								</div>
							</div>
						</div>
						<input type="hidden" id="expDateFrom" /> <input type="hidden"
							id="expDateTo" />
					</div>
					<div class="col-md-3">
						<div class="form-group">
							<label class="text-primary">po/contract no.</label><br> <select
								class="form-control" id="poConNo">
							</select>
						</div>
					</div>
					<div class="col-md-3">
						<div class="form-group">
							<label class="text-primary">Document Type</label> <select
								class="form-control" id="docType">
							</select>
						</div>
					</div>
					<div class="col-md-3">
						<div class="form-group">
							<label class="text-primary">Date of Return</label>
							<div class="input-group">
								<input type="text" id="dateOfReDate" class="form-control">
								<div class="input-group-append">
									<button class="btn-date text-secondary" type="button"
										id="btnDateOfReDate">
										<i class="far fa-calendar-alt"></i>
									</button>
								</div>
							</div>
						</div>
						<input type="hidden" id="dateOfReDateFrom" /> <input
							type="hidden" id="dateOfReDateTo" />
					</div>
					<div class="col-md-3">
						<div class="form-group">
							<label class="text-primary">BG Type</label> <select
								class="form-control" id="bgType">
								<option></option>
							</select>
						</div>
					</div>
					<div class="col-md-3">
						<div class="form-group">
							<label class="text-primary">Status</label> <select
								class="form-control" id="status">
								<option></option>
							</select>
						</div>
					</div>
					<div class="col-md-3">
						<div class="form-group">
							<label class="text-primary">Create By</label> <input
								type="text" class="form-control" id="createdBy">
						</div>
					</div>
				</div>

				<div class="text-center" style="margin-top: 15px;">
					<button type="button" class="btn btn-secondary" onclick="search();">Search</button>
				</div>
				<div class="line-head" style="margin-top: 20px;"></div>
			<!-- Tab Form In -->
			<div id="tabIn">
				<div class="table-responsive">
					<table id="example" class="display">
						<thead>
							<tr class="bg-primary text-white" >
								<th></th>
								<th>Status</th>
								<th style="width: 300px;">Company</th>
								<th style="width: 200px;">Vendor / Customer</th>
								<th style="width: 100px;">Doc Type</th>
								<th>BG No.</th>
								<th>Bank</th>
								<th>Amount</th>
								<th style="width: 150px;">Expired Date</th>
								<th style="width: 150px;">Date of Return</th>
								<th style="width: 200px;">Fee Due Date</th>
								<th style="width: 150px;">Created By</th>
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