/**
 * 
 */
package com.gcj.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gcj.dao.NormSeriesMapper;
import com.gcj.entity.NormSeries;

/**
 * @author quanbq
 *
 */
@Service(value = "normSeriesFacade")
public class NormSeriesFacade {

	@Autowired
	private NormSeriesMapper normSeriesMapper;

	public List<NormSeries> fetchNormSeriesByAdditions(Map<String, Object> param) {
		return normSeriesMapper.selectNormSeriesByAdditions(param);
	}
}
