package com.orbitile.power.common.dao;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ShapeJsonMapper implements RowMapper<String> {
  @Override
  public String mapRow(ResultSet rs, int rowNum) throws SQLException {
    return rs.getString("geojson");
  }
}
