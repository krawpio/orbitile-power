package com.orbitile.power.alert.model;


import com.orbitile.power.common.dao.QueriesBuilder;
import com.orbitile.power.common.dao.QueryCondition;
import com.orbitile.power.common.dao.ShapeJsonMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.orbitile.power.common.dao.QueriesBuilder.listConditionValue;
import static com.orbitile.power.common.dao.QueryCondition.QueryTemplate.*;
import static com.orbitile.power.common.dao.QueryCondition.createCondition;

@Repository
public class AlertDao {

  @Autowired
  private JdbcTemplate jdbcTemplate;

  private static final String ALERT_SHAPE_QUERY =
    "SELECT row_to_json(fc) as geojson " +
      "FROM ( SELECT " +
      "         'FeatureCollection' as type, " +
      "         array_to_json(array_agg(f)) As features " +
      "       FROM (SELECT " +
      "                 'Feature' as type," +
      "                 ST_AsGeoJSON(alert.geom)::json as geometry," +
      "                 row_to_json((SELECT l FROM (SELECT area, createdTime, name, span) as l)) as properties" +
      "             FROM alert " +
      "             JOIN powerline p on p.id = alert.idpowerline " +
      "             %s " +
      "       ) as f" +
      ") as fc";



  public Alert find(Long idAlert) {
    String query = baseQuery()
      .and(createCondition().eq("id", idAlert.toString(), NUMERIC))
      .build();
    return jdbcTemplate.query(query, new AlertMapper()).get(0);
  }

  public List<Alert> find(List<Integer> idAlerts) {
    String idString = listConditionValue(idAlerts);
    String query = baseQuery()
      .and(createCondition().in("alert.id", idString, NUMERIC))
      .order("id, span")
      .build();
    return jdbcTemplate.query(query, new AlertMapper());
  }


  public String findAlertShapesByPowerline(Long idPowerLine) {
    return jdbcTemplate.query(
      String.format(ALERT_SHAPE_QUERY, String.format("WHERE idpowerline = %s", idPowerLine)),
      new ShapeJsonMapper()).get(0);
  }

  public String findAlertShapes(List<Integer> ids) {
    String idString = listConditionValue(ids);
    return jdbcTemplate.query(
      String.format(ALERT_SHAPE_QUERY, String.format("WHERE alert.id in (%s)", idString)),
      new ShapeJsonMapper()).get(0);
  }


  public List<Alert> findAlertByParams(Map<String, String> params) {
    String query = baseQuery()
      .and(createCondition().gte("alert.createdTime", params.get("createdTime"), DATE))
      .and(createCondition().lte("alert.createdTime", params.get("tocreatedTime"), DATE))
      .and(createCondition().eq("powerline.code", params.get("code"), TEXT))
      .and(createCondition().gte("alert.area", params.get("area"), NUMERIC))
      .and(createCondition().lte("alert.area", params.get("toarea"), NUMERIC))
      .and(createCondition().eq("powerline.voltage", params.get("voltage"),  TEXT))
      .and(createCondition().eq("idorder", params.get("idorder"),  NUMERIC))
      .and(
        createCondition()
          .like("province", params.get("region"), TEXT)
          .or(
            createCondition()
              .like("county", params.get("region"),  TEXT))

      )
      .and(statusCondition(params.get("status")))
      .order("id, span")
      .build();

    return jdbcTemplate.query(query, new AlertMapper());
  }

  private QueryCondition statusCondition(String status) {
    if (status == null) {
      return createCondition();
    } else {
      return createCondition().custom(
        status.equals("ORDERED") ? "idorder is not null" : "idorder is null"
      );
    }
  }

  private QueriesBuilder baseQuery() {
    return QueriesBuilder.create("alert")
      .select(",powerline.name, orders.nr ")
      .from("alert")
      .join("powerline", "alert.idpowerline = powerline.id")
      .leftJoin("orders", "alert.idorder = orders.id")
      .where();
  }

  public void updateAlertOrder(List<Integer> idAlerts, Integer idOrder) {
    String idList = idAlerts.stream()
      .map(Object::toString)
      .collect(Collectors.joining(","));
    String query = String.format("UPDATE alert set idorder = %d WHERE id in (%s)",
      idOrder, idList);
    jdbcTemplate.execute(query);
  }
}
