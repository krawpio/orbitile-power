package com.orbitile.power.alert.model;

import java.math.BigDecimal;
import java.util.Date;

public class Alert {
  private Integer id;
  private Integer powerLineId;
  private String powerLineName;
  private Date createdTime;
  private BigDecimal area;
  private Integer orderId;
  private String orderNr;
  private String span;

  public void Alert() {
  }


  public Alert id(Integer id) {
    this.id = id;
    return this;
  }

  public Alert powerLineId(Integer powerLineId) {
    this.powerLineId = powerLineId;
    return this;
  }

  public Alert powerLineName(String powerLineName) {
    this.powerLineName = powerLineName;
    return this;
  }

  public Alert area(BigDecimal area) {
    this.area = area;
    return this;
  }

  public Alert createdTime(Date createdTime) {
    this.createdTime = createdTime;
    return this;
  }

  public Alert orderId(Integer orderId) {
    this.orderId = orderId;
    return this;
  }


  public Alert orderNr(String orderNr) {
    this.orderNr = orderNr;
    return this;
  }

  public Alert span(String span) {
    this.span = span;
    return this;
  }


  public BigDecimal getArea() {
    return area;
  }

  public Date getCreatedTime() {
    return createdTime;
  }

  public Integer getId() {
    return id;
  }

  public String getPowerLineName() {
    return powerLineName;
  }

  public Integer getPowerLineId() {
    return powerLineId;
  }

  public Integer getOrderId() {
    return orderId;
  }

  public String getOrderNr() {
    return orderNr;
  }

  public String getSpan() {
    return span;
  }
}
