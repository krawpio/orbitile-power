package com.orbitile.power.common.dao;

import java.util.List;
import java.util.stream.Collectors;

public class QueriesBuilder {

  private StringBuffer query;


  protected QueriesBuilder() {
    query = new StringBuffer();
  }

  public static String listConditionValue(List<Integer> values) {
    return values.stream()
      .map(Object::toString)
      .collect(Collectors.joining( ", " ));
  }

  public static QueriesBuilder create(String tableName) {
    QueriesBuilder builder = new QueriesBuilder();
    builder.createSelect(tableName);
    return builder;
  }

  public static QueriesBuilder create() {
    return new QueriesBuilder();
  }

  public QueriesBuilder createSelect(String tableName) {
    query.append(String.format("SELECT %s.* ", tableName));
    return this;
  }

  public QueriesBuilder delete(String tableName) {
    query.append(String.format("DELETE from %s ", tableName));
    return this;
  }

  public QueriesBuilder update(String tableName) {
    query.append(String.format("UPDATE %s ", tableName));
    return this;
  }

  public QueriesBuilder set(String param, String value) {
    String setTemplate = " SET %s = '%s' ";
    if (query.toString().contains("SET")) {
      setTemplate = ", %s = '%s' ";
    }
    query.append(String.format(setTemplate, param, value));
    return this;
  }


  public QueriesBuilder select(String select) {
    query.append(select);
    return this;
  }

  public QueriesBuilder from(String tableName) {
    query.append(String.format("FROM %s ", tableName));
    return this;
  }

  public QueriesBuilder where() {
    query.append("WHERE true = true ");
    return this;
  }


  public QueriesBuilder join(String tableName, String cond) {
    query.append(String.format("JOIN %s on %s ", tableName, cond));
    return this;
  }

  public QueriesBuilder leftJoin(String tableName, String cond) {
    query.append(String.format("LEFT JOIN %s on %s ", tableName, cond));
    return this;
  }


  public QueriesBuilder and(QueryCondition condition) {
    if (!condition.build().isEmpty()) {
      query.append(String.format(" AND (%s)", condition.build()));
    }
    return this;
  }

  public QueriesBuilder order(String params) {
    query.append(String.format(" ORDER BY %s", params));
    return this;
  }

  public QueriesBuilder order(String params, String direction) {
    query.append(String.format(" ORDER BY %s %s", params, direction));
    return this;
  }

  public QueriesBuilder or(QueryCondition condition) {
    if (!condition.build().isEmpty()) {
      query.append(String.format(" OR (%s)", condition.build()));
    }
    return this;
  }

  public String build() {
    return query.toString();
  }
}
