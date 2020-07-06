package com.orbitile.power.common.dao;

public class ShapeQueries {

  private final static String ALL_CODES = "ALL";
  private final static String PARENT_CONDITION = "WHERE parent_kod = '%s'";

  private static final String BASIC_SHAPES_SQL =
      "SELECT row_to_json(fc) as geojson " +
          "FROM ( SELECT " +
          "         'FeatureCollection' as type, " +
          "         array_to_json(array_agg(f)) As features " +
          "       FROM (SELECT " +
          "                 'Feature' as type," +
          "                 ST_AsGeoJSON(tbl.geom)::json as geometry," +
          "                 row_to_json((SELECT l FROM (SELECT kod, nazwa, powierzchnia) as l)) as properties" +
          "             FROM %s as tbl" +
          "             %s " +
          "       ) as f" +
          ") as fc";
}
