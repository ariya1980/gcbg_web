<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>Manage Signature</title>
<%@ include file="../../../WEB-INF/tag-libraly.jspf"%>
<%@ include file="/WEB-INF/global-constant.jspf" %>
<script src="<%= request.getContextPath() %>/js/login.js" type="text/javascript"></script>
<script src="<%= request.getContextPath() %>/js/authen-mail.js" type="text/javascript"></script>
<link rel="stylesheet" type="text/css" href="<%= request.getContextPath() %>/css/login.css">
<style type="text/css">
body {
  background-image: url("<%=request.getContextPath() %>/assets/images/bg-login9.png");
  background-color: #fff;
  height: 500px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
} 
</style>	
</head>
<body>
<%-- <input type="hidden" id="company" value="<%=System.getenv("USERDNSDOMAIN")%>"> --%>
<%-- <input type="text" class="input-login" id="username" value="<%=System.getenv("USERNAME")%>"> --%>
<input type="hidden" class="input-login" id="company" value="pttgc">

<input type="hidden" id="endpointUrl" value=<%=s.get(1).toString() %> />
<input type="hidden" id="engineUrl" value=<%=s.get(2).toString() %> />
<input type="hidden" id="transaction_id" value=<%=getTransactionId()%> />
<input type="hidden" id="baseUrl" value=<%=s.get(0).toString() %> />
<input type="hidden" id="token" value="<%= request.getParameter("token") %>">
<!-- <input type="hidden" id="token" value="d637e673-9789-4826-ae7c-9fdeb67d786c"> -->
<div class="container">
	<div class="row login">
		<div class="col-md-6 logo-form">
			<img alt="" src="<%= request.getContextPath() %>/assets/images/logo-gc.png" width="100%">
			<br><br><br>
			<img alt="" src="<%= request.getContextPath() %>/assets/images/bank-logo.png" width="100%">
		</div>
		<div class="col-md-6 login-form">
			<h2 class=" text-center">Sign In</h2>
			<font class="font-de">Company</font>
			<input type="text" class="input-login" id="companyCode" value="<%=System.getenv("USERDNSDOMAIN")%>" placeholder="Company">
			<br><br>
			<font class="font-de">User Name</font>
			<input type="text" class="input-login" id="username" value="<%=System.getenv("USERNAME")%>" placeholder="User Name">
			<br>
			<br>
			<font class="font-de">Password</font>
			<input type="password" class="input-login" id="password" placeholder="Password">
			<br><br>
			<center>
			<button type="button" id="submitBtn" onclick="login('authenMail')" class="btn btn-light">Login</button>
			</center>
			<br><br><br>
		</div>
	</div>
</div>
<br>
<br>
<br>
</div>
  
</body>
</html>