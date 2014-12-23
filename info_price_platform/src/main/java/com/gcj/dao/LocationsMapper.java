/**
 * 
 */
package com.gcj.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.gcj.entity.Locations;


/**
 * @author quanbq
 *
 */
@Repository(value="locationsMapper")
public interface LocationsMapper {

	public List<Locations> selectLocations();
		
}
