package com.orbitile.power.common.dao;


import com.google.common.collect.ImmutableMap;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Collections;
import java.util.Map;

import static com.orbitile.power.common.dao.QueryCondition.QueryTemplate.NUMERIC;
import static com.orbitile.power.common.dao.QueryCondition.QueryTemplate.TEXT;
import static com.orbitile.power.common.dao.QueryCondition.createCondition;
import static org.junit.Assert.assertEquals;

@RunWith(MockitoJUnitRunner.class)
public class QueriesBuilderTest {


  @Test
  public void testFullQuery() {
    //given
    Map<String, String> params = ImmutableMap.of(
      "name", "Sitnicka",
      "voltage", "HIGH",
      "length", "123",
      "toLength", "200",
      "region", "lubelskie"
    );

    //when
    String query = getQuery(params);

    //then
    String expectedResult =
      "SELECT powerline.* FROM powerline " +
        "WHERE true = true  " +
        "AND (name = 'Sitnicka') " +
        "AND (voltage = 'HIGH') " +
        "AND (length >= 123) " +
        "AND (length <= 200) " +
        "AND (province ~* 'lubelskie' " +
        "OR (county ~* 'lubelskie'))";

    assertEquals(query, expectedResult);
  }

  @Test
  public void testQueryNoParams() {
    //given
    Map<String, String> params = Collections.emptyMap();

    //when
    String query = getQuery(params);

    //then
    String expectedResult =
      "SELECT powerline.* FROM powerline " +
        "WHERE true = true ";
    assertEquals(query.trim(), expectedResult.trim());
  }


  @Test
  public void testPartialQuery() {
    //given
    Map<String, String> params = ImmutableMap.of(
      "name", "Sitnicka",
      "length", "123",
      "region", "lubelskie"
    );

    //when
    String query = getQuery(params);

    //then
    String expectedResult =
      "SELECT powerline.* FROM powerline " +
        "WHERE true = true  " +
        "AND (name = 'Sitnicka') " +
        "AND (length >= 123) " +
        "AND (province ~* 'lubelskie' " +
        "OR (county ~* 'lubelskie'))";

    assertEquals(query.trim(), expectedResult.trim());
  }


  private String getQuery(Map<String, String> params) {
    return QueriesBuilder.create("powerline")
      .from("powerline")
      .where()
      .and(createCondition().eq("name", params.get("name"), TEXT))
      .and(createCondition().eq("voltage", params.get("voltage"), TEXT))
      .and(createCondition().gte("length", params.get("length"), NUMERIC))
      .and(createCondition().lte("length", params.get("toLength"), NUMERIC))
      .and(
        createCondition()
          .like("province", params.get("region"), TEXT)
          .or(
            createCondition()
              .like("county", params.get("region"), TEXT))

      )
      .build();
  }

}
