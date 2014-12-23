<body>  
<%  
session.invalidate();  
response.sendRedirect(application.getInitParameter("casServerLogoutUrl")  
+ "?service="  
+ application.getInitParameter("casServeName"));  
%>  
</body>
