import FileSaver from "file-saver";

export const saveFile = ({title, url}) => {
  FileSaver.saveAs(url, title);
};