import PdfPrinter from "pdfmake"

export const getPDFReadableStream = data => {
  const fonts = {
    Helvetica: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
    },
  }

  const printer = new PdfPrinter(fonts)

  const docDefinition = {
    content: [data.firstName, "Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines"],
    defaultStyle: {
      font: "Helvetica",
    },
    // ...
  }

  const options = {
    // ...
  }

  const pdfReadableStream = printer.createPdfKitDocument(docDefinition, options)
  pdfReadableStream.end()
  return pdfReadableStream 

}