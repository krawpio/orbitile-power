package com.orbitile.power.order.model;

public enum OrderStatus {
  NEW("Nowe"),
  PROGRESS("W trakcie"),
  ORDERED("Zlecone"),
  CLOSED("Zamknięte");

  private String title;

  OrderStatus(String title) {
    this.title = title;
  }

  public String getTitle() {
    return title;
  }
}
