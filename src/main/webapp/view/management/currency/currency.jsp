<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>Currency Management</title>
<%@ include file="../../../WEB-INF/tag-libraly.jspf"%>
<%@ include file="../../../WEB-INF/main-menu.jspf"%>
<%@ include file="../../../WEB-INF/global-constant.jspf"%>
<script src="<%= request.getContextPath() %>/js/management/global.js" type="text/javascript"></script>
<script src="<%= request.getContextPath() %>/js/management/currency.js" type="text/javascript"></script>

</head>
<body>
	<div class="container" style="background-color: #fff;">
	<br>
		<div class="card-main">
			<div class="card-body">
				
				<div class="row">
					<div class="col-8">
						<h1 class="text-head">
							<i class="fas fa-cogs"></i> Currency Management
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
							<label class="text-secondary">Currency Code</label><br> <select
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
					<div class="col-md-2">
						<div class="form-group">
							<label class="text-secondary">Status</label><br> <select
								class="form-control" id="">
							</select>
						</div>
					</div>
					<div class="col-md-2">
						<div style="margin-top: 22px;">
							<button type="button" class="btn btn-info" onclick="search();">Search</button>
						</div>
					</div>
				</div>
				
				
				<div class="line-head" style="margin-top: 20px;"></div>
				<div class="table-responsive">
				<table id="cuurencyTable" class="display" style="width: 100%">
					<thead>
						<tr class="bg-dark text-white">
							<th>Currency Code</th>
							<th>Description (EN) </th>
							<th>Description (TH) </th>
							<th>Status</th>
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
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabelCreate">Currency Create</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
		<div class="form-group">
		    <label>Currency Code</label>
		    <input type="text" id="currencyCode" class="form-control">
		</div>
		<div class="form-group">
		    <label>Description (EN)</label>
		    <input type="text" id="descriptionEN" class="form-control">
		</div>
		<div class="form-group">
		    <label>Description (TH)</label>
		    <input type="text" id="descriptionTH" class="form-control">
		</div>
		<div>
			<p style="margin-bottom: 0px;">Status</p>
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

				