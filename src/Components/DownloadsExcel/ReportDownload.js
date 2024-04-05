import ExcelJS from "exceljs";
// import 'jspdf-autotable'; // Import jspdf-autotable

const convertToXLSX = async (ReportName, extension) => {
    
  const workbook = new ExcelJS.Workbook();
  // const worksheet = workbook.addWorksheet("Sheet1");
  
  
  const worksheet = workbook.addWorksheet('Sheet1', {
    views: [{
        rtl: true, // Set the right-to-left layout
        rightToLeft:true
    }]
});

  const element = document.getElementsByClassName("mainconts")[0];
  const contentElement = element.querySelector(".content-report");
  worksheet.properties.defaultRowHeight = 25;
  if (contentElement) {
    const contentHTML = contentElement.innerText;
    const contentLines = contentHTML.split("\n");
    contentLines.forEach((line) => {
      worksheet.addRow([line]);
    });
    worksheet.addRow([]);
  }

  const headerRow = [];
  const tableHeaderCells = element.querySelectorAll("thead tr th");
  tableHeaderCells.forEach((cell) => {
    headerRow.push(cell.textContent.trim());
  });

  let headerRowObject = worksheet.addRow(headerRow);
  headerRowObject.eachCell((cell) => {
    cell.font = { bold: true, color: { argb: "FFFFFF" } };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "2F75B5" },
    };
    cell.border = { top: { style: "thin" }, bottom: { style: "thin" } };
  });

  const tableRows = element.querySelectorAll("tbody tr");
  tableRows.forEach((htmlRow) => {
    const rowData = [];
    const tableCells = htmlRow.querySelectorAll("td");
    tableCells.forEach((cell) => {
      rowData.push(cell.textContent.trim());
    });
    worksheet.addRow(rowData);
  });

  const columnMaxContentLengths = Array.from(
    { length: headerRow.length },
    () => 0
  );

  worksheet.eachRow((row, rowNumber) => {
    row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      cell.alignment = { horizontal: "center", vertical: "middle" };
      const contentLength = cell.value ? cell.value.toString().length : 0;
      columnMaxContentLengths[colNumber - 1] = Math.max(
        columnMaxContentLengths[colNumber - 1],
        contentLength
      );
    });
  });

  columnMaxContentLengths.forEach((maxContentLength, colNumber) => {
    worksheet.getColumn(colNumber + 1).width = maxContentLength + 2;
  });

  await workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, extension === 'xlsx' ? `${ReportName}.xlsx` : `${ReportName}.csv`);
  });
};

const specialConvertToXLSX = async (ReportName, extension) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet1");
  const element = document.getElementsByClassName("mainconts")[0];
  const contentElement = element.querySelector(".content-report");
  worksheet.properties.defaultRowHeight = 25;
  if (contentElement) {
      const contentHTML = contentElement.innerText;
      const contentLines = contentHTML.split("\n");
      contentLines.forEach((line) => {
        worksheet.addRow([line]);
      });
      worksheet.addRow([]);
  }

  let mainHeaders = [];
  let subHeaders = [];
  const headers = element.querySelectorAll("thead tr ");

  headers.forEach((cell,index) => {
    if(index === 0){
      mainHeaders = cell.textContent.trim().split(/(?=[A-Z])/).filter(item => item.trim() !== "")
    } else {
      subHeaders = cell.textContent.trim().split(/(?=[A-Z])/).filter(item => item.trim() !== "")
    }
  });


  const allHeadersRowSpan= [];
  const allHeadersColSpan= [];
  const allHeadersCells = element.querySelectorAll("thead tr th");
  allHeadersCells.forEach((cell) => {
    allHeadersRowSpan.push(cell.rowSpan);
    allHeadersColSpan.push(cell.colSpan);
  });

  const mainHeadersColSpan = [...allHeadersColSpan.slice(0,mainHeaders.length)]
  const subHeadersColSpan = [...allHeadersColSpan.slice(mainHeaders.length)]

  const headerRow = [];
  const tableHeaderCells = element.querySelectorAll("thead tr th");
  tableHeaderCells.forEach((cell) => {
    headerRow.push(cell.textContent.trim());
  });

  allHeadersRowSpan.map((header,index) => {
    if(header > 1){
      worksheet.mergeCells(`${String.fromCharCode(65 + index)}4:${String.fromCharCode(65 + index)}5`);
    }
  })

  // for main header
  
  const startingColumns = mainHeadersColSpan.reduce((acc, span, index) => {
    const prevSpan = index > 0 ? acc[index - 1].endColumnIndex : 0;
    const startColumnIndex = prevSpan + 1;
    const endColumnIndex = prevSpan + span;
    const startColumnLetter = String.fromCharCode(65 + startColumnIndex - 1);
    const endColumnLetter = String.fromCharCode(65 + endColumnIndex - 1);

    if( startColumnLetter !== endColumnLetter){
      worksheet.mergeCells(`${startColumnLetter}4:${endColumnLetter}4`); 
    }

    acc.push({ start: `${startColumnLetter}4`, end: `${endColumnLetter}4`, endColumnIndex });
    return acc;
  }, []);


  const startValuesOnly = startingColumns.map(item => item.start);

  mainHeaders.map((header, index) => {
    worksheet.getCell(startValuesOnly[index]).value = header
    worksheet.getCell(startValuesOnly[index]).fill = {type: "pattern",pattern: "solid",fgColor: { argb: "2F75B5" },};
    worksheet.getCell(startValuesOnly[index]).font = { bold: true, color: { argb: "FFFFFF" } };
    worksheet.getCell(startValuesOnly[index]).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell(startValuesOnly[index]).border = {top: { style: "thin" },left: { style: "thin" },bottom: { style: "thin" },right: { style: "thin" }};
  });

  //-------------------------------------------------------------------------------------------------------------------------------------------------------------- 

  // for sub header

  const cellwithRowSpan = allHeadersRowSpan.filter(cell => cell > 1)

  const startingColumns2 = subHeadersColSpan.reduce((acc, span, index) => {
    const prevSpan = index > 0 ? acc[index - 1].endColumnIndex : 0;
    const startColumnIndex = prevSpan + 1;
    const endColumnIndex = prevSpan + span;
    const startColumnLetter = String.fromCharCode((65 + startColumnIndex - 1) + cellwithRowSpan.length);
    const endColumnLetter = String.fromCharCode((65 + endColumnIndex - 1) + cellwithRowSpan.length);

    acc.push({ start: `${startColumnLetter}5`, end: `${endColumnLetter}5`, endColumnIndex });
    return acc;
  }, []);

  const startValuesOnly2 = startingColumns2.map(item => item.start);

  subHeaders.map((header, index) => {
      worksheet.getCell(startValuesOnly2[index]).value = header
      worksheet.getCell(startValuesOnly2[index]).fill = {type: "pattern",pattern: "solid",fgColor: { argb: "2F75B5" },};
      worksheet.getCell(startValuesOnly2[index]).font = { bold: true, color: { argb: "FFFFFF" } };
      worksheet.getCell(startValuesOnly2[index]).alignment = { vertical: "middle", horizontal: "center" };
      worksheet.getCell(startValuesOnly2[index]).border = {top: { style: "thin" },left: { style: "thin" },bottom: { style: "thin" },right: { style: "thin" }};
  });


  const tableRows = element.querySelectorAll("tbody tr");
  tableRows.forEach((htmlRow) => {
    const rowData = [];
    const tableCells = htmlRow.querySelectorAll("td");
    tableCells.forEach((cell) => {
      rowData.push(cell.textContent.trim());
    });
    worksheet.addRow(rowData);
  });

  const columnMaxContentLengths = Array.from(
    { length: headerRow.length },
    () => 0
  );

  worksheet.eachRow((row, rowNumber) => {
    row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      cell.alignment = { horizontal: "center", vertical: "middle" };
      const contentLength = cell.value ? cell.value.toString().length : 0;
      columnMaxContentLengths[colNumber - 1] = Math.max(
        columnMaxContentLengths[colNumber - 1],
        contentLength
      );
    });
  });

  columnMaxContentLengths.forEach((maxContentLength, colNumber) => {
    worksheet.getColumn(colNumber + 1).width = maxContentLength + 2;
  });

  await workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, extension === 'xlsx' ? `${ReportName}.xlsx` : `${ReportName}.csv`);
  });
};

const saveAs = (blob, filename) => {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};
export { convertToXLSX, specialConvertToXLSX };
