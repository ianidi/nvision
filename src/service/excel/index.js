import XLSX from "xlsx";

export const exportExcel = ({ title, data }) => {
  let exportWS = XLSX.utils.json_to_sheet(data);
  let wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, exportWS, title);
  XLSX.writeFile(wb, `${title}.xlsx`);
};