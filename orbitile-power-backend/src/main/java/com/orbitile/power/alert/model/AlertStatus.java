package com.orbitile.power.alert.model;

public enum AlertStatus {
  ACTIVE("active"),
  INACTIVE("inactive");

  private String title;

  AlertStatus(String title) {
    this.title = title;
  }

  public String getTitle() {
    return title;
  }
}
