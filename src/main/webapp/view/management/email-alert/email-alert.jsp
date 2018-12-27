<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>Email Alert</title>
<%@ include file="../../../WEB-INF/tag-libraly.jspf"%>
<%@ include file="../../../WEB-INF/main-menu.jspf"%>
<%@ include file="../../../WEB-INF/global-constant.jspf"%>
<script src="<%= request.getContextPath() %>/assets/ckeditor_4.7.3_full/ckeditor/ckeditor.js"></script>
<script src="<%= request.getContextPath() %>/js/management/global.js" type="text/javascript"></script>
<script src="<%= request.getContextPath() %>/js/management/email-alert.js" type="text/javascript"></script>

</head>
<body>
	<div class="container" style="background-color: #fff;">
		<br>
		<div class="card-main">
			<div class="card-body">
				<h1 class="text-head">
					<i class="fas fa-cogs"></i> Email Alert
				</h1>
				<div class="line-head"></div>

				<div class="row">
					<div class="col-md-3">
						<div class="form-group">
							<label class="text-secondary">Function Code</label><br> <select
								class="form-control" id="">
							</select>
						</div>
					</div>
					<div class="col-md-5">
						<div class="form-group">
							<label class="text-secondary">Action</label><br> <select
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
					<div class="col-md-1">
						<div style="margin-top: 22px;">
							<button type="button" class="btn btn-info" data-toggle="modal" data-target=".bd-example-modal-lg-create">Search</button>
						</div>
					</div>
				</div>


				<div class="line-head" style="margin-top: 20px;"></div>
			</div>
		</div>
	</div>
	<br>
	<br>



	<!-- modal Create -->

	<div class="modal fade bd-example-modal-lg-create" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">Email Alert Edit</h5>
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-md-6">
							<div class="form-group">
								<label>From</label> <input type="text" id="mail_from"
									class="form-control">
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<label>To</label> <input type="text" id="mail_to" class="form-control">
							</div>
						</div>
						<div class="col-md-12">
							<div class="form-group">
								<label>Cc</label> <input type="text" id="mail_cc" class="form-control">
							</div>
						</div>
						<div class="col-md-12">
							<div class="form-group">
								<label>Subject</label> <input type="text" id="mail_subject"
									class="form-control">
							</div>
						</div>
						<div class="col-md-12">
							<div class="form-group">
								<label>Content</label>
								<textarea name="mail_body" id="mail_body" class="ckeditor"></textarea>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary"
						data-dismiss="modal">Close</button>
					<button type="button" class="btn btn-primary"
						onclick="createData()">Save</button>
				</div>
			</div>
		</div>
	</div>
</body>
</html>