<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>Manage Signature</title>
<%@ include file="../../../WEB-INF/tag-libraly.jspf"%>
<%@ include file="../../../WEB-INF/main-menu.jspf"%>
<%@ include file="../../../WEB-INF/global-constant.jspf"%>
<script src="<%= request.getContextPath() %>/js/management/global.js" type="text/javascript"></script>
<script src="<%= request.getContextPath() %>/js/management/owner.js" type="text/javascript"></script>
<style type="text/css">
.responsible td{
	padding-bottom: 10px;
	padding-right: 10px;
}
#ownerTable_wrapper label {
    margin-bottom: .4rem;
}
</style>
</head>
<body>
	<div class="container" style="background-color: #fff;">
	<br>
		<div class="card-main">
			<div class="card-body">
				
				<div class="row">
					<div class="col-12">
						<h1 class="text-head">
							<i class="fas fa-cogs"></i> Re-Assign Owner
						</h1>
					</div>
				</div>
				<div class="line-head" style="margin-top: 7px;"></div>
				
				<table style="width: 100%" class="responsible">
					<tr>
						<th width="25%"></th>
						<th width="25%" class="font-weight-normal">Company</th>
						<th width="25%" class="font-weight-normal">User Id</th>
						<th width="25%" class="font-weight-normal">Name</th>
					</tr>
					<tr>
						<td class="text-primary font-weight-bold">Responsible Employee</td>
						<td><select class="form-control"></select></td>
						<td><select class="form-control"></select></td>
						<td><select class="form-control"></select></td>
					</tr>
					<tr style="margin-top: 20px;">
						<td class="text-primary font-weight-bold">New Responsible Employee</td>
						<td><select class="form-control"></select></td>
						<td><select class="form-control"></select></td>
						<td><select class="form-control"></select></td>
					</tr>
				</table>
				
				<div class="line-head" style="margin-top: 20px;"></div>
				<button class="btn btn-primary" type="button" style="margin-bottom: -60px; z-index: 1;position: absolute;">Re-Assign</button>
				<table id="ownerTable" class="display" style="width: 100%">
					<thead>
						<tr class="bg-dark text-white">
							<th><input type="checkbox"></th>
							<th>Form Type</th>
							<th>Company</th>
							<th>Doc Type</th>
							<th>BG No</th>
							<th>Related To</th>
							<th>Vendor/Customer</th>
							<th>Bank</th>
						</tr>
					</thead>
				</table>
				
			</div>
		</div>
	</div>
<br>
<br>

<!-- modal Create -->

<div class="modal fade bd-example-modal-lg-create" id="exampleModalCreate" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Manage Signature Create</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
		    <label>Employee ID</label>
		    <input type="text" id="employeeID" class="form-control">
		</div>
		<div class="form-group" style="margin-top: 10px;">
		    <label>Employee Name</label>
		    <input type="text" id="employeeName" class="form-control">
		</div>
		<div class="form-group" style="margin-top: 10px;">
		    <label>Position</label>
		    <input type="text" id="position" class="form-control">
		</div>
		<div class="form-group" style="margin-top: 10px;">
		    <label>Signature</label>
		    <input type="file" id="signature" class="form-control">
		</div>
		<div style="margin-top: 10px;">
			<p>Status</p>
			<label class="switch">
			  <input type="checkbox" id="status" checked>
			  <span class="slider round"></span>
			</label>
		</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="createData()">Save</button>
      </div>
    </div>
  </div>
</div>

</body>
</html>