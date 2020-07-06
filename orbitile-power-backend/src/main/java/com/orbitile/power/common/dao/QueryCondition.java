package com.orbitile.power.common.dao;

import com.google.common.collect.ImmutableMap;
import org.springframework.util.StringUtils;

import java.util.Map;

public class QueryCondition {

  public enum QueryTemplate {
    TEXT,
    NUMERIC,
    DATE
  }

  private static Map<QueryTemplate, String> templates = ImmutableMap.of(
    QueryTemplate.TEXT, "%s %s '%s'",
    QueryTemplate.NUMERIC, "%s %s %s",
    QueryTemplate.DATE, "%s %s '%s'"
  );

  private StringBuffer query = new StringBuffer();;


  public static QueryCondition createCondition() {
    return new QueryCondition();
  }

  public QueryCondition eq(String columnName, String param,  QueryTemplate template) {
    query.append(cond(columnName, "=", param, templates.get(template)));
    return this;
  }

  public QueryCondition like(String columnName, String param, QueryTemplate template) {
    query.append(cond(columnName, "~*", param, templates.get(template)));
    return this;
  }

  public QueryCondition gte(String columnName, String param,  QueryTemplate template) {
    query.append(cond(columnName, ">=", param, templates.get(template)));
    return this;

  }

  public QueryCondition lte(String columnName, String param,  QueryTemplate template) {
    query.append(cond(columnName, "<=", param, templates.get(template)));
    return this;
  }

  public QueryCondition in(String columnName, String param,  QueryTemplate template) {
    query.append(cond(columnName, "in", param, "%s %s (%s)"));
    return this;
  }

  public QueryCondition custom(String customCond) {
    query.append(customCond);
    return this;
  }



  public QueryCondition and(QueryCondition condition) {
    if (!condition.build().isEmpty()) {
      query.append(String.format(" AND (%s)", condition.build()));
    }
    return this;
  }

  public QueryCondition or(QueryCondition condition) {
    if (!condition.build().isEmpty()) {
      query.append(String.format(" OR (%s)", condition.build()));
    }
    return this;
  }

  private String cond(String column, String operator,  String param, String template) {
    if (StringUtils.isEmpty(param)) {
      return "";
    } else {
      return String.format(template, column, operator, param);
    }
  }

  public String build() {
    return query.toString();
  }

}
