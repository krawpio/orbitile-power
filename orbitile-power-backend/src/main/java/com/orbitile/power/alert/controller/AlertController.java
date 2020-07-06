package com.orbitile.power.alert.controller;

import com.orbitile.power.alert.model.Alert;
import com.orbitile.power.alert.model.AlertDao;
import com.orbitile.power.alert.view.AlertXlsReportView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
import java.util.Map;

import static com.orbitile.power.common.JsonHelper.unStringifyJson;

@RestController
@RequestMapping("/alert")
public class AlertController {

  @Autowired
  private AlertDao alertDao;


  @GetMapping(value = "/shapeByPowerLine/{idPowerLine}", produces = "application/json;charset=UTF-8")
  public String shapeByPowerLine(@PathVariable Long idPowerLine) {
    return alertDao.findAlertShapesByPowerline(idPowerLine);
  }

  @GetMapping(value = "/shapes", produces = "application/json;charset=UTF-8")
  public String shapes(@RequestParam Map<String, String> params) {
    return alertDao.findAlertShapes(unStringifyJson(params.get("ids")));
  }

  @GetMapping("/search")
  public List<Alert> searchAlerts(@RequestParam Map<String, String> params) {
    return alertDao.findAlertByParams(params);
  }

  @GetMapping(value = "/export")
  public ModelAndView getExcelReport(@RequestParam Map<String, String> params) {
    List<Alert> alerts = alertDao.find(unStringifyJson(params.get("ids")));
    return new ModelAndView(new AlertXlsReportView(), "alerts", alerts);
  }
}
