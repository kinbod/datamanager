package com.gcj.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gcj.dao.EmployeeMapper;
import com.gcj.entity.Employee;

/**
 * Created by quanbq on 2014/12/17.
 */
@Service(value = "employeeFacade")
public class EmployeeFacade {

	@Autowired
	EmployeeMapper employeeMapper;

	public List<Employee> getAllEmployees() {
		return employeeMapper.selectEmployeeListPage();
	}

	public int getEmployeeCount() {
		return employeeMapper.getEmployeeCount();
	}
}
