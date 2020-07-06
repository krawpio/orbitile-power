package com.orbitile.power.order.view;


import com.orbitile.power.common.export.ExcelTools;
import com.orbitile.power.order.model.Order;
import com.orbitile.power.order.model.OrderStatus;
import com.orbitile.power.order.model.OrderVerificationStatus;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.web.servlet.view.document.AbstractXlsView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;


public class OrderXlsReportView extends AbstractXlsView {

  @Override
  protected void buildExcelDocument(Map<String, Object> model, Workbook workbook, HttpServletRequest request,
                                    HttpServletResponse response) throws Exception {
    List<Order> orders = (List<Order>) model.get("orders");
    Sheet sheet = workbook.createSheet("Zlecenia");
    ExcelTools helper = new ExcelTools(workbook, sheet);

    helper.addHeaderCell("Numer", 20);
    helper.addHeaderCell("Data utworzenia", 20);
    helper.addHeaderCell("Data zamknięcia", 20);
    helper.addHeaderCell("Powierzchnia", 20);
    helper.addHeaderCell("Status", 25);
    helper.addHeaderCell("Status Weryfikacji", 25);
    helper.addHeaderCell("Twórca", 25);
    helper.addHeaderCell("Zleceniobiorca", 25);


    for (Order order : orders) {
      String status = OrderStatus.valueOf(order.getStatus()).getTitle();
      String verification = OrderVerificationStatus.valueOf(order.getVerification()).getTitle();

      helper.nextRow();
      helper.addRowCell(order.getNr());
      helper.addRowCell(order.getCreatedTime());
      if (order.getClosedTime() != null) {
        helper.addRowCell(order.getClosedTime());
      } else {
        helper.addRowCell("");
      }
      helper.addRowCell(order.getArea().doubleValue());
      helper.addRowCell(status);
      helper.addRowCell(verification);
      helper.addRowCell(order.getOwner());
      helper.addRowCell(order.getContractor());
    }
  }
}
