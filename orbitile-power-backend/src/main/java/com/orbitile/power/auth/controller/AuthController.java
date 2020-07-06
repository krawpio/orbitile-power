package com.orbitile.power.auth.controller;


import com.orbitile.power.auth.model.User;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {

  @GetMapping(produces = "application/json")
  @RequestMapping(value= "/login", method = RequestMethod.POST)
  public User login() {
    return new User("Jan", "Kowalski");
  }
}
