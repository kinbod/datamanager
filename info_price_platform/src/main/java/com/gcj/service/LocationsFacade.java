/**
 * 
 */
package com.gcj.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gcj.dao.LocationsMapper;
import com.gcj.entity.Locations;

/**
 * @author quanbq
 *
 */
@Service(value = "locationsFacade")
public class LocationsFacade {

	@Autowired
	LocationsMapper locationsMapper;

	public List<Locations> normLocations() {
		return locationsMapper.selectLocations();
	}
}
