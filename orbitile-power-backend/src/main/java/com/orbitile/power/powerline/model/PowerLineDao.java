package com.orbitile.power.powerline.model;


import com.orbitile.power.common.dao.QueriesBuilder;
import com.orbitile.power.common.dao.ShapeJsonMapper;
import com.orbitile.power.order.model.Order;
import com.orbitile.power.order.model.OrderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.orbitile.power.common.dao.QueriesBuilder.listConditionValue;
import static com.orbitile.power.common.dao.QueryCondition.QueryTemplate.NUMERIC;
import static com.orbitile.power.common.dao.QueryCondition.QueryTemplate.TEXT;
import static com.orbitile.power.common.dao.QueryCondition.createCondition;

@Repository
public class PowerLineDao {

  @Autowired
  private JdbcTemplate jdbcTemplate;

  private static final String POWER_LINE_SHAPE_QUERY =
    "SELECT row_to_json(fc) as geojson " +
      "FROM ( SELECT " +
      "         'FeatureCollection' as type, " +
      "         array_to_json(array_agg(f)) As features " +
      "       FROM (SELECT " +
      "                 'Feature' as type," +
      "                 ST_AsGeoJSON(tbl.geom)::json as geometry," +
      "                 row_to_json((SELECT l FROM (SELECT span, wiretype) as l)) as properties" +
      "             FROM powerlinepart as tbl " +
      "             %s " +
      "       ) as f" +
      ") as fc";

  private static final String POWER_LINE_ALERTS_SHAPE_QUERY =
    "WITH " +
    " spowerline as (" +
    "   SELECT plp.idpowerline, span, wiretype, plp.geom FROM powerlinepart as plp " +
    "   LEFT JOIN alert a on plp.idpowerline = a.idpowerline " +
    "   %s " +
    "   GROUP by 1,2,3,4), " +
    " sfeatures as (" +
    "   SELECT " +
    "     'Feature' as type," +
    "     ST_AsGeoJSON(geom)::json as geometry," +
    "     row_to_json((SELECT l FROM (SELECT span, wiretype) as l)) as properties" +
    "   FROM spowerline)," +
    " featureCollection as (" +
    "   SELECT " +
    "     'FeatureCollection' as type, " +
    "     array_to_json(array_agg(sfeatures)) As features " +
    "   FROM sfeatures)" +
    " SELECT row_to_json(featureCollection) as geojson " +
    " FROM featureCollection";

  private static final String POWER_LINE_BUFFER_QUERY =
    "SELECT row_to_json(fc) as geojson " +
      "FROM ( SELECT " +
      "         'FeatureCollection' as type, " +
      "         array_to_json(array_agg(f)) As features " +
      "       FROM (SELECT " +
      "                 'Feature' as type," +
      "                 ST_AsGeoJSON(tbl.geom)::json as geometry," +
      "                 row_to_json((SELECT l FROM (SELECT idpowerline) as l)) as properties" +
      "             FROM buffer as tbl" +
      "             WHERE idpowerline = %s " +
      "       ) as f" +
      ") as fc";


  public PowerLine find(Long idPowerLine) {
    String query = QueriesBuilder.create("powerline")
      .from("powerline")
      .where()
      .and(createCondition().eq("id", idPowerLine.toString(), NUMERIC))
      .build();
    return jdbcTemplate.query(query, new PowerLineMapper()).get(0);
  }

  public List<PowerLine> find(List<Integer> idOrders) {
    String idString = listConditionValue(idOrders);
    String query = baseQuery()
      .and(createCondition().in("id", idString, NUMERIC))
      .order("id")
      .build();
    return jdbcTemplate.query(query, new PowerLineMapper());
  }

  public String findPowerLineShapes(Long idPowerLine) {
    return jdbcTemplate.query(
      String.format(POWER_LINE_SHAPE_QUERY, String.format("WHERE idpowerline = %s", idPowerLine)),
      new ShapeJsonMapper()).get(0);
  }

  public String findPowerLineShapesByAlerts(List<Integer> ids) {
    String idString = listConditionValue(ids);
    return jdbcTemplate.query(
      String.format(POWER_LINE_ALERTS_SHAPE_QUERY, String.format("WHERE a.id in (%s)", idString)),
      new ShapeJsonMapper()).get(0);
  }

  public String findPowerLineBuffer(Long idPowerLine) {
    return jdbcTemplate.query(
      String.format(POWER_LINE_BUFFER_QUERY, idPowerLine),
      new ShapeJsonMapper()).get(0);
  }


  public List<PowerLine> findPowerLinesByParams(Map<String, String> params) {
    String query = baseQuery()
      .and(createCondition().eq("code", params.get("code"), TEXT))
      .and(createCondition().eq("voltage", params.get("voltage"),  TEXT))
      .and(createCondition().gte("length", params.get("length"), NUMERIC))
      .and(createCondition().lte("length", params.get("tolength"), NUMERIC))
      .and(
        createCondition()
          .like("province", params.get("region"), TEXT)
          .or(
            createCondition()
              .like("county", params.get("region"),  TEXT))

      )
      .order("id")
      .build();


    return jdbcTemplate.query(query, new PowerLineMapper());
  }

  private QueriesBuilder baseQuery() {
    return QueriesBuilder.create("powerline")
      .from("powerline")
      .where();
  }

}
