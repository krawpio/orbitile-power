package com.orbitile.power.powerline.model;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class PowerLineMapper implements RowMapper<PowerLine> {

  @Override
  public PowerLine mapRow(ResultSet rs, int rowNum) throws SQLException {
    return new PowerLine()
      .id(rs.getInt("id"))
      .name(rs.getString("name"))
      .province(rs.getString("province"))
      .county(rs.getString("county"))
      .length(rs.getBigDecimal("length"))
      .voltage(rs.getString("voltage"))
      .alertArea(rs.getBigDecimal("alertarea"))
      .lastCutTime(rs.getDate("lastcuttime"))
      .code(rs.getString("code"))
      .treePercentage();
  }
}
