package com.orbitile.power.powerline.model;

public enum Voltage {
  HIGH("WN"),
  MEDIUM("SN"),
  LOW("Niskie");

  private String title;

  Voltage(String title) {
    this.title = title;
  }

  public String getTitle() {
    return title;
  }
}
