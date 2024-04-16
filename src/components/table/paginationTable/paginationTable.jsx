import React from "react";
import { usePathname } from 'next/navigation'
import { Pagination, Button } from "@nextui-org/react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { CSVLink } from "react-csv";

export default function CustomPagination({
  page,
  pages,
  rowsPerPage,
  handleChangeRowsPerPage,
  items,
  setPage,
  children,
  dataCSVButton,
}) {
  const pathname = usePathname();
  const segments = pathname.split('/');
  const lastSegment = segments[segments.length - 1];
  const filename = `${lastSegment}.csv`;

  const exportToPDF = () => {
  const pdf = new jsPDF();

  const titleFontSize = 16;
  const titleMargin = 10;

  const footerText = "Teste, alterar depois"; // Customize this with your desired footer text
  const pageNumber = pdf.internal.getNumberOfPages(); // Get total number of pages

  for (let i = 1; i <= pageNumber; i++) {
    pdf.setPage(i); // Set current page
    pdf.text(footerText, pdf.internal.pageSize.getWidth() / 2, pdf.internal.pageSize.getHeight() - 10, {
      align: "center"
    });
  }

  // Set title font size and add title text
  pdf.setFontSize(titleFontSize);
  pdf.text(titleMargin, titleFontSize, lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1));

  // Render the table below the title
  pdf.autoTable({ html: "#TableToPDF", startY: titleFontSize + titleMargin + 5 });

  // Save the PDF with the specified filename
  pdf.save(`${lastSegment}.pdf`);
};

  return (
    <>
      <div className="bg-tableFooter border border-tableFooterBorder flex justify-between items-center lg:pl-72 w-full min-h-10vh fixed bottom-0 right-0 z-20 text-sm text-default-400 py-3">
        <div>
          {dataCSVButton && dataCSVButton.length > 0 && (
            <div className="ml-5 space-x-3">
              <Button onPress={exportToPDF}>PDF</Button>
              <Button>
                <CSVLink
                  data={dataCSVButton}
                  filename={filename}
                  separator={";"}
                  enclosingCharacter={""}
                >
                  CSV
                </CSVLink>
              </Button>
            </div>
          )}
        </div>
        <div className="flex flex-row items-center">
          <Pagination
            isCompact
            showControls
            color="primary"
            variant="flat"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
            className="mx-5"
          />
          <div>
            <span className="text-sm text-black">Linhas por página:</span>
            <select
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
              className="ml-2 py-1 px-2 border rounded bg-transparent text-sm text-default-600 mx-5"
            >
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={150}>150</option>
              <option value={250}>250</option>
            </select>
          </div>
          <div className="ml-5 mr-10 text-black">
            {items?.length > 0
              ? `${(page - 1) * rowsPerPage + 1}-${Math.min(
                  page * rowsPerPage,
                  items.length
                )} de ${items.length}`
              : "0 resultados"}
          </div>
        </div>
      </div>

      {children}
    </>
  );
}
