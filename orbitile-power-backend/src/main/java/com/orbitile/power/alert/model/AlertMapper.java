package com.orbitile.power.alert.model;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class AlertMapper implements RowMapper<Alert> {

  @Override
  public Alert mapRow(ResultSet rs, int rowNum) throws SQLException {
    String orderNr;
    AlertStatus status = AlertStatus.valueOf(rs.getString("status"));
    if (status == AlertStatus.ACTIVE) {
      if (rs.getString("nr") != null) {
        orderNr = rs.getString("nr");
      } else {
        orderNr = "UNORDERED";
      }
    } else {
      orderNr = AlertStatus.INACTIVE.name();
    }

    return new Alert()
      .id(rs.getInt("id"))
      .powerLineId(rs.getInt("idpowerline"))
      .powerLineName(rs.getString("name"))
      .span(rs.getString("span"))
      .area(rs.getBigDecimal("area"))
      .createdTime(rs.getDate("createdtime"))
      .orderId(rs.getInt("idorder") == 0 ? null : rs.getInt("idorder"))
      .orderNr(orderNr)
      .description(rs.getString("description"));
  }
}
