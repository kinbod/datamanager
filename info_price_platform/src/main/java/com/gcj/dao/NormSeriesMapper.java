/**
 * 
 */
package com.gcj.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.gcj.entity.NormSeries;

/**
 * @author quanbq
 *
 */
@Repository(value = "normSeriesMapper")
public interface NormSeriesMapper {

	List<NormSeries> selectNormSeriesByAdditions(Map<String, Object> param);
}
