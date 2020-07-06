package com.orbitile.power.common.export;

import org.apache.poi.ss.usermodel.*;

import java.util.Date;

public class ExcelTools {

  private Sheet sheet;
  private CellStyle dateStyle;
  private CellStyle numberStyle;
  private CellStyle headerStyle;
  private CreationHelper createHelper;
  private Row header;
  private int rowNr;
  private int columnNr;
  private Row currentRow;


  public ExcelTools(Workbook workbook, Sheet sheet) {
    this.sheet = sheet;
    createHelper = workbook.getCreationHelper();
    dateStyle = workbook.createCellStyle();
    dateStyle.setDataFormat(
      createHelper.createDataFormat().getFormat("yyyy-MM-dd"));
    numberStyle = workbook.createCellStyle();
    numberStyle.setDataFormat(
      createHelper.createDataFormat().getFormat("#,##0.0000"));
    headerStyle = this.createHeaderCellStyle(workbook);
    header = sheet.createRow(0);
    header.setHeight((short) 400);
    rowNr = 0;
    columnNr = 0;
  }

  public void addHeaderCell(
    String value,
    int columnWidth
  ) {
    sheet.setColumnWidth(columnNr, columnWidth * 256);
    Cell cell = header.createCell(columnNr);
    cell.setCellValue(value);
    cell.setCellStyle(headerStyle);
    columnNr ++;
  }

  public void addRowCell(
    String value
  ) {
    Cell cell = currentRow.createCell(columnNr);
    cell.setCellValue(value);
    columnNr ++;
  }

  public void addRowCell(
    Date value
  ) {
    Cell cell = currentRow.createCell(columnNr);
    cell.setCellValue(value);
    cell.setCellStyle(dateStyle);
    columnNr ++;
  }

  public void addRowCell(
    double value
  ) {
    Cell cell = currentRow.createCell(columnNr);
    cell.setCellValue(value);
    cell.setCellStyle(numberStyle);
    columnNr ++;

  }

  public void nextRow() {
    rowNr++;
    this.currentRow = sheet.createRow(rowNr);
    columnNr = 0;
  }


  private CellStyle createHeaderCellStyle(Workbook workbook) {
    Font font = workbook.createFont();
    font.setFontHeight((short) 230);
    CellStyle style = workbook.createCellStyle();
    style.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.index);
    style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
    style.setFont(font);
    style.setAlignment(HorizontalAlignment.CENTER);
    style.setVerticalAlignment(VerticalAlignment.CENTER);
    return style;
  }
}
