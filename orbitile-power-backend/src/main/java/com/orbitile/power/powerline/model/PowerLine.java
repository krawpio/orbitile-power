package com.orbitile.power.powerline.model;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Date;

public class PowerLine {
  private Integer id;
  private String name;
  private String voltage;
  private BigDecimal length;
  private String province;
  private String county;
  private String code;
  private BigDecimal alertArea;
  private BigDecimal treePercentage;
  private Date lastCutTime;


  public PowerLine county(String county) {
    this.county = county;
    return this;
  }

  public PowerLine id(Integer id) {
    this.id = id;
    return this;
  }

  public PowerLine length(BigDecimal length) {
    this.length = length;
    return this;
  }

  public PowerLine name(String name) {
    this.name = name;
    return this;
  }

  public PowerLine province(String province) {
    this.province = province;
    return this;
  }

  public PowerLine voltage(String voltage) {
    this.voltage = voltage;
    return this;
  }

  public PowerLine code(String code) {
    this.code = code;
    return this;
  }

  public PowerLine alertArea(BigDecimal alertArea) {
    this.alertArea = alertArea;
    return this;
  }

  public PowerLine lastCutTime(Date lastCutTime) {
    this.lastCutTime = lastCutTime;
    return this;
  }

  public PowerLine treePercentage() {
    int bufferSize = 15;
    if (voltage.equals("MEDIUM")) {
      bufferSize = 8;
    }
    this.treePercentage = alertArea
      .divide(
        length
          .multiply(new BigDecimal(bufferSize))
          .multiply(new BigDecimal(10)),
        3,
        RoundingMode.HALF_DOWN
        );
    return this;
  }



  public Integer getId() {
    return id;
  }

  public BigDecimal getLength() {
    return length;
  }

  public String getCounty() {
    return county;
  }

  public String getName() {
    return name;
  }

  public String getProvince() {
    return province;
  }

  public String getVoltage() {
    return voltage;
  }

  public String getCode() {
    return code;
  }

  public Date getLastCutTime() {
    return lastCutTime;
  }

  public BigDecimal getAlertArea() {
    return alertArea;
  }

  public BigDecimal getTreePercentage() {
    return treePercentage;
  }
}
