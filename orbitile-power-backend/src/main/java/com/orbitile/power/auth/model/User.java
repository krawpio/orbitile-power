package com.orbitile.power.auth.model;

import java.io.Serializable;
import java.security.PrivateKey;

public class User implements Serializable {

  private String userName;
  private String password;
  private String firstName;
  private String lastName;

  public User(String firstName, String lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  public String getFirstName() {
    return firstName;
  }

  public String getLastName() {
    return lastName;
  }
}
