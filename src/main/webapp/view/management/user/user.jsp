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
<script src="<%= request.getContextPath() %>/js/management/user.js" type="text/javascript"></script>

</head>
<body>
	<div class="container" style="background-color: #fff;">
	<br>
		<div class="card-main">
			<div class="card-body">
				
				<div class="row">
					<div class="col-8">
						<h1 class="text-head">
							<i class="fas fa-cogs"></i> User Management
						</h1>
					</div>
					<div class="col-4" style="text-align: right;">
						<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCreate">Create</button>
					</div>
				</div>
				
				<div class="line-head" style="margin-top: 7px;"></div>
				<div class="row">
					<div class="col-md-3">
						<div class="form-group">
							<label class="text-secondary">User Company</label><br> <select
								class="form-control" id="">
							</select>
						</div>
					</div>
					<div class="col-md-3">
						<div class="form-group">
							<label class="text-secondary">User ID</label><br> <select
								class="form-control" id="">
							</select>
						</div>
					</div>
					<div class="col-md-3">
						<div class="form-group">
							<label class="text-secondary">User Name</label><br> <select
								class="form-control" id="">
							</select>
						</div>
					</div>
					<div class="col-md-3">
						<div class="form-group">
							<label class="text-secondary">User Group</label><br> <select
								class="form-control" id="">
							</select>
						</div>
					</div>
					<div class="col-md-3">
						<div class="form-group">
							<label class="text-secondary">Status</label><br> <select
								class="form-control" id="">
							</select>
						</div>
					</div>
					<div class="col-md-6">
						<div class="form-group">
							<label class="text-secondary">share Company</label><br> 
							<select class="js-example-basic-multiple" name="states[]" multiple="multiple" style="width: 100%;">
								<option value="AL">Alabama</option>
								<option value="WY">Wyoming</option>
							</select>
							<script type="text/javascript">
								$(document).ready(function() {
								    $('.js-example-basic-multiple').select2();
								});
							</script>
						</div>
					</div>
					<div class="col-md-1">
						<div style="margin-top: 22px;">
							<button type="button" class="btn btn-info" onclick="search();">Search</button>
						</div>
					</div>
				</div>
				
				<div class="line-head" style="margin-top: 20px;"></div>
				
				<table id="userTable" class="display" style="width: 100%">
					<thead>
						<tr class="bg-dark text-white">
							<th>User Company</th>
							<th>User ID</th>
							<th>User Name</th>
							<th>User Group</th>
							<th>User Email</th>
							<th>Share Company</th>
							<th>Status</th>
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