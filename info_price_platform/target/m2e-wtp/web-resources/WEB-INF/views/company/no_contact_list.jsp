<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:forEach items="${requestScope.nccList}" var="company" varStatus="vs">
	<c:choose>
		<c:when test="${vs.index == 5}">
			<tr>
				<td>......</td>
				<td></td>
			</tr>
		</c:when>
		<c:otherwise>
			<tr>
				<td>${company.name}</td>
				<td>本周期剩余维护天数：${company.residualMaintainDays}</td>
			</tr>
		</c:otherwise>
	</c:choose>
</c:forEach>