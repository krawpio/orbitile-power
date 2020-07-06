package com.orbitile.power.order.model;

public enum OrderVerificationStatus {
  NO_DATA(""),
  CHECKED("Zgodne z deklaracją"),
  CONTROL("Do kontroli");

  private String title;

  OrderVerificationStatus(String title) {
    this.title = title;
  }

  public String getTitle() {
    return title;
  }
}
