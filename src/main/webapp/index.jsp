<%-- 
    Document   : index
    Created on : Nov 2, 2018, 10:00:00 AM
    Author     : kullanit.n
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
    		<!-- a href="/gcbg-front-main/view/login.jsp">login</a><br> -->
    </head>
    <body>
    	<%
	      System.out.println("Welcome Message : Redirect page");
	      request.setAttribute("Request-Attribute", "Value of Attribute ");
	      response.sendRedirect("/gcbg-front-main/view/login.jsp");
	    %>
    </body>
</html>