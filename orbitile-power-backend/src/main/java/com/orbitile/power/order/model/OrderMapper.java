package com.orbitile.power.order.model;

import com.orbitile.power.alert.model.Alert;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class OrderMapper implements RowMapper<Order> {

  @Override
  public Order mapRow(ResultSet rs, int rowNum) throws SQLException {
    return new Order()
      .id(rs.getInt("id"))
      .area(rs.getBigDecimal("area"))
      .owner(rs.getString("owner"))
      .createdTime(rs.getDate("createdtime"))
      .closedTime(rs.getDate("closedtime"))
      .status(rs.getString("status"))
      .verification(rs.getString("verification"))
      .contractor(rs.getString("contractor"))
      .nr(rs.getString("nr"));
  }
}
