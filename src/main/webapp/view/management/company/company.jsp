<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>Company Management</title>
<%@ include file="../../../WEB-INF/tag-libraly.jspf"%>
<%@ include file="../../../WEB-INF/main-menu.jspf"%>
<%@ include file="../../../WEB-INF/global-constant.jspf"%>
<script src="<%= request.getContextPath() %>/js/management/global.js" type="text/javascript"></script>
<script src="<%= request.getContextPath() %>/js/management/company.js" type="text/javascript"></script>

</head>
<body>
	<div class="container" style="background-color: #fff;">
	<br>
		<div class="card-main">
			<div class="card-body">
			
				<div class="row">
					<div class="col-8">
						<h1 class="text-head">
							<i class="fas fa-cogs"></i> Company Management
						</h1>
					</div>
					<div class="col-4" style="text-align: right;">
						<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCreate">Create</button>
						<button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#exampleModalUploadFile">Create File</button>
					</div>
				</div>
				
				<div class="line-head" style="margin-top: 7px;"></div>
				
				<div class="row">
					<div class="col-md-2">
						<div class="form-group">
							<label class="text-secondary">Company Code</label><br> <select
								class="form-control" id="">
							</select>
						</div>
					</div>
					<div class="col-md-3">
						<div class="form-group">
							<label class="text-secondary">Company Code ID</label><br> <select
								class="form-control" id="">
							</select>
						</div>
					</div>
					<div class="col-md-3">
						<div class="form-group">
							<label class="text-secondary">Description (EN)</label><br> <select
								class="form-control" id="">
							</select>
						</div>
					</div>
					<div class="col-md-3">
						<div class="form-group">
							<label class="text-secondary">Description (TH)</label><br> <select
								class="form-control" id="">
							</select>
						</div>
					</div>
					<div class="col-md-1">
						<div style="margin-top: 22px;">
							<button type="button" class="btn btn-info" onclick="search();">Search</button>
						</div>
					</div>
				</div>
				
				
				<div class="line-head" style="margin-top: 20px;"></div>
				<div class="table-responsive">
				<table id="companyTable" class="display">
					<thead>
						<tr class="bg-dark text-white">
							<th width="150px">Company Code</th>
							<th width="200px">Company Code ID</th>
							<th width="200px">Description (EN) </th>
							<th width="200px">Description (TH) </th>
							<th width="200px">Address 1 (EN)</th>
							<th width="200px">Address 1 (TH)</th>
							<th width="200px">Address 2 (EN)</th>
							<th width="200px">Address 2 (TH)</th>
							<th width="100px">Logo</th>
							<th>Edit</th>
						</tr>
					</thead>
				</table>
				</div>
			</div>
		</div>
	</div>
<br>
<br>


<!-- Modal Create-->
<div class="modal fade" id="exampleModalCreate" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabelCreate" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabelCreate">Company Create</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
		<div class="row">
      	<div class="col-md-6">
	        <div class="form-group">
			    <label>Company Code</label>
			    <input type="text" id="companyCode" class="form-control">
			</div>
		</div>
		<div class="col-md-6">
			<div class="form-group">
			    <label>Company Code ID</label>
			    <input type="text" id="companyCodeID" class="form-control">
			</div>
		</div>
		<div class="col-md-12">
			<div class="form-group">
			    <label>Description (EN)</label>
			    <input type="text" id="descriptionEN" class="form-control">
			</div>
		</div>
		<div class="col-md-12">
			<div class="form-group">
			    <label>Description (TH)</label>
			    <input type="text" id="descriptionTH" class="form-control">
			</div>
		</div>
		<div class="col-md-12">
			<div class="form-group">
			    <label>Address 1 (EN)</label>
			    <input type="text" id="addressOfficeEN" class="form-control">
			</div>
		</div>
		<div class="col-md-12">
			<div class="form-group">
			    <label>Address 1 (TH)</label>
			    <input type="text" id="CP_AddressOfficeTH" class="form-control">
			</div>
		</div>
		<div class="col-md-12">
			<div class="form-group">
			    <label>Address 2 (EN)</label>
			    <input type="text" id="addressOffice2EN" class="form-control">
			</div>
		</div>
		<div class="col-md-12">
			<div class="form-group">
			    <label>Address 2 (TH)</label>
			    <input type="text" id="addressOffice2TH" class="form-control">
			</div>
		</div>
		<div class="col-md-12">
			<div class="form-group">
			    <label>Logo</label>
			    <input type="file" id="logo" class="form-control">
			</div>
		</div>
		</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="createData()">Save</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal Upload file-->
<div class="modal fade" id="exampleModalUploadFile" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">DOWNLOAD TEMPLATE</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
		<input type="file" id="fileBrows" onchange="processFile(this); return false;" style="opacity: 0;">
		<div class="input-group mb-3">
			<input type="text" class="form-control browseFile" id="nameFile" placeholder="Browse File" aria-label="Recipient's username" aria-describedby="button-addon2" onclick="browseFlile()">
			<div class="input-group-append">
				<button class="btn bg-secondary text-white browseFile" type="button" id="button-addon2" onclick="browseFlile()">Browse</button>
			</div>
		</div>
        <p class="text-secondary text-center">( MAXIMUM FILE SIZE 10MB )</p>
        <center><button type="button" class="btn btn-primary" onclick="uploadFile()">UPLOAD FILE</button></center>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
</body>
</html>

				