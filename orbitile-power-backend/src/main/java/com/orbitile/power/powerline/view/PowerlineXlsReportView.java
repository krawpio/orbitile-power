package com.orbitile.power.powerline.view;


import com.orbitile.power.common.export.ExcelTools;
import com.orbitile.power.order.model.Order;
import com.orbitile.power.order.model.OrderStatus;
import com.orbitile.power.order.model.OrderVerificationStatus;
import com.orbitile.power.powerline.model.PowerLine;
import com.orbitile.power.powerline.model.Voltage;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.web.servlet.view.document.AbstractXlsView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;


public class PowerlineXlsReportView extends AbstractXlsView {

  @Override
  protected void buildExcelDocument(Map<String, Object> model, Workbook workbook, HttpServletRequest request,
                                    HttpServletResponse response) throws Exception {
    List<PowerLine> powerlines = (List<PowerLine>) model.get("powerlines");
    Sheet sheet = workbook.createSheet("Linie energetyczne");
    ExcelTools helper = new ExcelTools(workbook, sheet);

    helper.addHeaderCell("Nazwa", 15);
    helper.addHeaderCell("Napięcie", 15);
    helper.addHeaderCell("Długość", 15);
    helper.addHeaderCell("Powierzchnia alarmów w m2", 25);
    helper.addHeaderCell("Procent zadrzewienia bufora", 25);
    helper.addHeaderCell("Województwo", 20);
    helper.addHeaderCell("Powiat", 20);
    helper.addHeaderCell("Data ostatniej wycinki", 25);

    for (PowerLine powerline : powerlines) {
      String voltage = Voltage.valueOf(powerline.getVoltage()).getTitle();

      helper.nextRow();
      helper.addRowCell(powerline.getName());
      helper.addRowCell(voltage);
      helper.addRowCell(powerline.getLength().doubleValue());
      helper.addRowCell(powerline.getAlertArea().doubleValue());
      helper.addRowCell(powerline.getTreePercentage().doubleValue());
      helper.addRowCell(powerline.getProvince());
      helper.addRowCell(powerline.getCounty());
      helper.addRowCell(powerline.getLastCutTime());
    }
  }
}
