package com.orbitile.power.alert.view;


import com.orbitile.power.alert.model.Alert;
import com.orbitile.power.common.export.ExcelTools;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.web.servlet.view.document.AbstractXlsView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;


public class AlertXlsReportView extends AbstractXlsView {

  @Override
  protected void buildExcelDocument(Map<String, Object> model, Workbook workbook, HttpServletRequest request,
                                    HttpServletResponse response) throws Exception {
    List<Alert> alerts = (List<Alert>) model.get("alerts");
    Sheet sheet = workbook.createSheet("Alarmy");
    ExcelTools helper = new ExcelTools(workbook, sheet);

    helper.addHeaderCell("Nazwa linii", 25);
    helper.addHeaderCell("Powierzchnia", 25);
    helper.addHeaderCell("Data utworzenia", 35);
    helper.addHeaderCell("Numer Zlecenia", 35);
    helper.addHeaderCell("Przęsło", 20);


    for( Alert alert: alerts) {
      helper.nextRow();
      String orderNr = alert.getOrderId() != null ? alert.getOrderNr() : "";
      helper.addRowCell(alert.getPowerLineName());
      helper.addRowCell(alert.getArea().doubleValue());
      helper.addRowCell(alert.getCreatedTime());
      helper.addRowCell(orderNr);
      helper.addRowCell(alert.getSpan());
    }
  }
}
