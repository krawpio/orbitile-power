package com.orbitile.power.main.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class MainController {

  @GetMapping("_ah/warmup")
  public String warmup() {
    return "warmup";
  }

}
