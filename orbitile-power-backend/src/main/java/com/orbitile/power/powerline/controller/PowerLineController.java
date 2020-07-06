package com.orbitile.power.powerline.controller;

import com.orbitile.power.powerline.model.PowerLine;
import com.orbitile.power.powerline.model.PowerLineDao;
import com.orbitile.power.powerline.view.PowerlineXlsReportView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
import java.util.Map;

import static com.orbitile.power.common.JsonHelper.unStringifyJson;

@RestController
@RequestMapping("/powerline")
public class PowerLineController {

  @Autowired
  private PowerLineDao powerLineDao;

  @GetMapping("/{id}")
  public PowerLine powerline(@PathVariable Long id) {
    return powerLineDao.find(id);
  }

  @GetMapping("/shape/{id}")
  public String shape(@PathVariable Long id) {
    return powerLineDao.findPowerLineShapes(id);
  }

  @GetMapping("/buffer/{id}")
  public String buffer(@PathVariable Long id) {
    return powerLineDao.findPowerLineBuffer(id);
  }

  @GetMapping("/search")
  public List<PowerLine> searchPowerLines(@RequestParam Map<String, String> params) {
    return powerLineDao.findPowerLinesByParams(params);
  }


  @GetMapping("/shapesByAlerts")
  public String shapesByAlerts(@RequestParam Map<String, String> params) {
    return powerLineDao.findPowerLineShapesByAlerts(unStringifyJson(params.get("ids")));
  }

  @GetMapping(value = "/export")
  public ModelAndView getExcelReport(@RequestParam Map<String, String> params) {
    List<PowerLine> powerLines = powerLineDao.find(unStringifyJson(params.get("ids")));
    return new ModelAndView(new PowerlineXlsReportView(), "powerlines", powerLines);
  }
}
