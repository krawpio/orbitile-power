package com.orbitile.power.order.model;


import com.orbitile.power.alert.model.Alert;
import com.orbitile.power.alert.model.AlertDao;
import com.orbitile.power.common.dao.QueriesBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import javax.sql.DataSource;
import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

import static com.orbitile.power.common.dao.QueriesBuilder.*;
import static com.orbitile.power.common.dao.QueryCondition.QueryTemplate.*;
import static com.orbitile.power.common.dao.QueryCondition.QueryTemplate.TEXT;
import static com.orbitile.power.common.dao.QueryCondition.createCondition;

@Repository
public class OrderDao {

  private static String INSERT_ORDER_POWERLINE_QUERY =
    "INSERT INTO orderpowerline(idorder,idpowerline) values %s";
  private static String DELETE_QUERY = "DELETE FROM orders WHERE %s";


  @Autowired
  private DataSource dataSource;

  @Autowired
  private JdbcTemplate jdbcTemplate;

  @Autowired
  private AlertDao alertDao;

  private SimpleJdbcInsert simpleJdbcInsert;



  public Order find(Integer id) {
    String query = baseQuery()
      .and(createCondition().eq("id", id.toString(), NUMERIC))
      .build();
    return jdbcTemplate.query(query, new OrderMapper()).get(0);
  }


  public List<Order> find(List<Integer> idOrders) {
    String idString = listConditionValue(idOrders);
    String query = baseQuery()
      .and(createCondition().in("id", idString, NUMERIC))
      .order("id", "desc")
      .build();
    return jdbcTemplate.query(query, new OrderMapper());
  }

  public void delete(List<Integer> idOrders) {
    String idString = listConditionValue(idOrders);
    String query = QueriesBuilder
      .create()
      .delete("orders")
      .where()
      .and(createCondition().in("id", idString, NUMERIC))
      .build();
    jdbcTemplate.execute(query);
  }

  public void update(Integer id,  Map<String, String> params) {
    String query = QueriesBuilder
      .create()
      .update("orders")
      .set("owner", params.get("owner"))
      .set("closedtime", params.get("closedtime"))
      .where()
      .and(createCondition().eq("id", id.toString(), NUMERIC))
      .build();
    jdbcTemplate.execute(query);
  }

  public void close(List<Integer> idOrders) {
    String idString = listConditionValue(idOrders);
    String query = QueriesBuilder
      .create()
      .update("orders")
      .set("status", "CLOSED")
      .where()
      .and(createCondition().in("id", idString, NUMERIC))
      .build();
    jdbcTemplate.execute(query);
  }

  public List<Order> findOrdersByPowerline(Integer id) {
    String query = queryWithPowerline()
      .and(createCondition().eq("powerline.id", id.toString(), NUMERIC))
      .order("id", "desc")
      .build();
    return jdbcTemplate.query(query, new OrderMapper());
  }


  public Order insert(List<Integer> idAlerts) {
    List<Alert> alerts = alertDao.find(idAlerts);
    BigDecimal area = alerts.stream()
      .map(Alert::getArea)
      .reduce(BigDecimal.ZERO, BigDecimal::add);
    // insert order
    Map<String, Object> parameters = new HashMap<>(1);
    parameters.put("area", area);
    parameters.put("owner", "Jan Kowalski");
    parameters.put("createdtime", new Date());
    Number newId = simpleJdbcInsert.executeAndReturnKey(parameters);
    Integer idOrder = (Integer) newId;

    //update alerts
    alertDao.updateAlertOrder(idAlerts, idOrder);

    //insert orderpowerline
    Order order = find(idOrder);
    Set<Integer> idPowerLines = alerts.stream()
      .map(Alert::getPowerLineId)
      .collect(Collectors.toSet());
    String idPowerLinesQuery = idPowerLines.stream()
      .map(id -> String.format("(%d, %d)", order.getId(), id))
      .collect(Collectors.joining(","));
    String query = String.format(INSERT_ORDER_POWERLINE_QUERY, idPowerLinesQuery);
    jdbcTemplate.execute(query);
    return order;
  }

  public List<Order> findOrderByParams(Map<String, String> params) {
    QueriesBuilder queriesBuilder;
    if (!StringUtils.isEmpty(params.get("region")) || !StringUtils.isEmpty(params.get("code"))) {
      queriesBuilder = queryWithPowerline();
    } else {
      queriesBuilder = baseQuery();
    }

    String query = queriesBuilder
      .and(createCondition().gte("createdTime", params.get("createdTime"), DATE))
      .and(createCondition().lte("createdTime", params.get("tocreatedTime"), DATE))
      .and(createCondition().lte("closedTime", params.get("closedTime"), DATE))
      .and(createCondition().lte("closedTime", params.get("toclosedTime"), DATE))
      .and(createCondition().like("nr", params.get("nr"), TEXT))
      .and(createCondition().gte("orders.area", params.get("area"), NUMERIC))
      .and(createCondition().lte("orders.area", params.get("toarea"), NUMERIC))
      .and(createCondition().eq("status", params.get("status"),  TEXT))
      .and(createCondition().eq("verification", params.get("verification"),  TEXT))
      .and(
        createCondition()
          .like("province", params.get("region"), TEXT)
          .or(
            createCondition()
              .like("county", params.get("region"),  TEXT))

      )
      .and(createCondition().eq("code", params.get("code"), TEXT))
      .order("id", "desc")
      .build();

    return jdbcTemplate.query(query, new OrderMapper());
  }

  private QueriesBuilder baseQuery() {
    return create("orders")
      .from("orders")
      .where();
  }

  private QueriesBuilder queryWithPowerline() {
    return create("orders")
      .from("orders")
      .leftJoin("orderpowerline", "orderpowerline.idorder = orders.id")
      .leftJoin("powerline", "powerline.id = orderpowerline.idpowerline")
      .where();
  }

  @Autowired
  public void setSimpleJdbcInsert() {
    this.simpleJdbcInsert = new SimpleJdbcInsert(dataSource)
      .withTableName("orders").usingGeneratedKeyColumns("id")
      .usingColumns("area", "owner", "createdtime");
  }
}
