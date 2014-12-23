/**
 * 
 */
package com.gcj.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.gcj.entity.Employee;


/**
 * @author quanbq
 *
 */
@Repository(value="employeeMapper")
public interface EmployeeMapper {

	public List<Employee> selectEmployeeListPage();
	public int getEmployeeCount();
}
