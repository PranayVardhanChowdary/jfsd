<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Upload Resume</title>
</head>
<body>
<form:form action="insertresume" modelAttribute="JobApplication" method="post" enctype="multipart/form-data">
    <label for="resume">Upload Resume:</label>
    <input type="file" id="resume" name="resume">
    <input type="submit" value="Upload">
</form:form>
</body>
</html>
