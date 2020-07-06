package com.orbitile.power.order.model;

import java.math.BigDecimal;
import java.util.Date;

public class Order {
  private Integer id;
  private String owner;
  private String nr;
  private Date createdTime;
  private Date closedTime;
  private BigDecimal area;
  private String status;
  private String verification;
  private String contractor;

  Order id(Integer id) {
    this.id = id;
    return this;
  }

  Order owner(String owner) {
    this.owner = owner;
    return this;
  }

  Order nr(String nr) {
    this.nr = nr;
    return this;
  }

  Order createdTime(Date createdTime) {
    this.createdTime = createdTime;
    return this;
  }

  Order closedTime(Date closedTime) {
    this.closedTime = closedTime;
    return this;
  }

  Order area(BigDecimal area) {
    this.area = area;
    return this;
  }

  Order status(String status) {
    this.status = status;
    return this;
  }

  Order verification(String verification) {
    this.verification = verification;
    return this;
  }

  Order contractor(String contractor) {
    this.contractor = contractor;
    return this;
  }


  public Integer getId() {
    return id;
  }

  public String getOwner() {
    return owner;
  }

  public String getNr() {
    return nr;
  }

  public Date getCreatedTime() {
    return createdTime;
  }

  public Date getClosedTime() {
    return closedTime;
  }

  public BigDecimal getArea() {
    return area;
  }

  public String getStatus() {
    return status;
  }

  public String getVerification() {
    return verification;
  }

  public String getContractor() {
    return contractor;
  }
}
