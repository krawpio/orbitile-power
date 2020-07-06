package com.orbitile.power.order.controller;

import com.orbitile.power.order.model.Order;
import com.orbitile.power.order.model.OrderDao;
import com.orbitile.power.order.view.OrderXlsReportView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
import java.util.Map;

import static com.orbitile.power.common.JsonHelper.unStringifyJson;

@RestController
@RequestMapping("/order")
public class OrderController {

  @Autowired
  private OrderDao orderDao;

  @PostMapping()
  public Order create(@RequestBody List<Integer> idAlerts) {
    return orderDao.insert(idAlerts);
  }

  @GetMapping("/{id}")
  public Order order(@PathVariable Integer id) {
    return orderDao.find(id);
  }

  @GetMapping("/search")
  public List<Order> search(@RequestParam Map<String, String> params) {
    return orderDao.findOrderByParams(params);
  }

  @GetMapping("/search/powerline/{id}")
  public List<Order> search(@PathVariable Integer id) {
    return orderDao.findOrdersByPowerline(id);
  }

  @GetMapping(value = "/export")
  public ModelAndView getExcelReport(@RequestParam Map<String, String> params) {
    List<Order> orders = orderDao.find(unStringifyJson(params.get("ids")));
    return new ModelAndView(new OrderXlsReportView(), "orders", orders);
  }

  @GetMapping("/delete")
  public Boolean delete(@RequestParam Map<String, String> params) {
    orderDao.delete(unStringifyJson(params.get("ids")));
    return true;
  }

  @GetMapping("/update/{id}")
  public Boolean update(
    @PathVariable Integer id,
    @RequestParam Map<String, String> params) {
    orderDao.update(id, params);
    return true;
  }

  @GetMapping("/close")
  public Boolean close(@RequestParam Map<String, String> params) {
    orderDao.close(unStringifyJson(params.get("ids")));
    return true;
  }
}
