import React, { useState } from "react";

import { Popover } from "react-tiny-popover";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Checkbox from "@material-ui/core/Checkbox";

import Box from "@material-ui/core/Box";
import { Link, useParams } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";

import { exportExcel, saveFile } from "../../service";
import { FilterCert, FilterSpeciality, FilterDegree, FilterType, FilterVendor } from "../../components/ui/filter";

import { ReactComponent as IconArrowDownloadExcel } from "../../assets/icons/arrow_download_excel.svg";
import { ReactComponent as IconClear } from "../../assets/icons/clear.svg";
import { ReactComponent as IconArrowDownloadBlack } from "../../assets/icons/arrow_download_black.svg";
import { ReactComponent as IconArrowDown } from "../../assets/icons/arrow_down.svg";

import { ReactComponent as IconView } from "../../assets/icons/view.svg";
import { ReactComponent as IconDownload } from "../../assets/icons/download.svg";

import { Datepicker } from "../../components/ui/date";
import { TextInput } from "../../components/ui/input";
import { Button, Small } from "../../components/ui/button";

import "./style.scoped.scss";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableKey: {
    color: "#7F7F7F",
    fontWeight: "normal",
    fontSize: 14,
    textAlign: "left",
  },
  tableCell: {
    color: "#151515",
    fontSize: 14,
    textAlign: "left",
  },
}));

function createData(CertID, title, vendor, type, startDate, endDate, status) {
  return { CertID, title, vendor, type, startDate, endDate, status };
}

const rows = [
  createData("First Name", "Специалист по MS Excel", "Microsoft", "Type", "01.09.2020", "31.08.2020", "Действует"),
  createData("Last Name", "Специалист по MS Excel", "Microsoft", "Type", "02.09.2020", "30.08.2020", "Действует"),
];

const headCells = [
  { id: "name", disablePadding: true, label: "ФИО сотрудника" },
  { id: "title", disablePadding: false, label: "Наименование" },
  { id: "vendor", disablePadding: false, label: "Вендор" },
  { id: "type", disablePadding: false, label: "Тип" },
  { id: "startDate", disablePadding: false, label: "Дата начала" },
  { id: "endDate", disablePadding: false, label: "Дата окончания" },
  { id: "status", disablePadding: false, label: "Статус" },
  { id: "action", disablePadding: false, label: "" },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc" ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export const Cert = () => {
  const [isPopoverCertOpen, setIsPopoverCertOpen] = useState(false);
  const [isPopoverVendorOpen, setIsPopoverVendorOpen] = useState(false);
  const [isPopoverTypeOpen, setIsPopoverTypeOpen] = useState(false);
  const [isPopoverDegreeOpen, setIsPopoverDegreeOpen] = useState(false);

  const classes = useStyles();

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.CertID);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const PATH = "/cert";
  const ROWS_PER_PAGE = 15;

  const { pageNumber = 1 } = useParams();

  const prepareExcel = () => {
    let data = rows;

    if (selected.length > 0) {
      data = data.filter((item) => selected.includes(item.CertID));
    }

    exportExcel({ title: "cert", data });
  };

  return (
    <React.Fragment>
      <div className="pcert__area">
        <div className="pcert__head">
          <div className="d-flex align-items-center">
            <div className="pcert__title">Сертификаты</div>
          </div>
          <div className="d-flex align-items-center">
            <Small title="Выгрузить в Excel" icon={<IconArrowDownloadExcel />} color="#009A50" onClick={prepareExcel} />
            <Small title="Очистить все фильтры" icon={<IconClear />} color="#EE262A" style={{ marginLeft: 20, marginRight: 20 }} />
            <Small
              title="Скачать файлы"
              icon={<IconArrowDownloadBlack />}
              color="#151515"
              onClick={() => saveFile({ title: "files.zip", url: "http://localhost:3000/file.zip" })}
            />
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between table__search">
          <div style={{ width: "25%" }}>
            <TextInput title="Введите ФИО сотрудника" search />
          </div>
          <div style={{ width: "11%" }}>
            <Datepicker
              callback={() => {}}
              // value={birthday}
              placeholder="Дата начала"
            />
          </div>
          <div style={{ width: "11%" }}>
            <Datepicker
              callback={() => {}}
              // value={birthday}
              placeholder="Дата конца"
            />
          </div>
          <div className="d-flex align-items-center justify-content-between" style={{ width: "40%" }}>
            <FilterCert open={isPopoverCertOpen} setState={setIsPopoverCertOpen} style={{ marginRight: 10 }} />
            <FilterVendor open={isPopoverVendorOpen} setState={setIsPopoverVendorOpen} style={{ marginRight: 10 }} />
            <FilterType open={isPopoverTypeOpen} setState={setIsPopoverTypeOpen} style={{ marginRight: 10 }} />
            <FilterDegree open={isPopoverDegreeOpen} setState={setIsPopoverDegreeOpen} />
          </div>
          <div style={{ width: "10%" }}>
            <Button title="Найти" />
          </div>
        </div>

        <div className="d-flex">
          <TableContainer style={{ marginTop: "10px", marginBottom: "20px", userSelect: "none" }}>
            <Table className={classes.table} size="small" aria-label="таблица">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={selected.length > 0 && selected.length < rows.length}
                      checked={rows.length > 0 && selected.length === rows.length}
                      onChange={handleSelectAllClick}
                      inputProps={{ "aria-label": "выбрать все" }}
                    />
                  </TableCell>

                  {headCells.map((headCell) => (
                    <TableCell
                      key={headCell.id}
                      align={"left"}
                      padding={headCell.disablePadding ? "none" : "default"}
                      sortDirection={orderBy === headCell.id ? order : false}
                      className={classes.tableKey}
                    >
                      <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : "asc"}
                        onClick={createSortHandler(headCell.id)}
                      >
                        {headCell.label}
                        {/*orderBy === headCell.id ? (
                      <span className={classes.visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </span>
                    ) : null*/}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.CertID);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        // hover
                        // onClick={(event) => handleClick(event, row.name)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.CertID}
                        selected={isItemSelected}
                        className={classes.tableLine}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ "aria-labelledby": labelId }}
                            onClick={(event) => handleClick(event, row.CertID)}
                          />
                        </TableCell>
                        <TableCell className={classes.tableCell} component="th" scope="row" padding="none">
                          {row.CertID}
                        </TableCell>
                        <TableCell className={classes.tableCell}>{row.title}</TableCell>
                        <TableCell className={classes.tableCell}>{row.vendor}</TableCell>
                        <TableCell className={classes.tableCell}>{row.type}</TableCell>
                        <TableCell className={classes.tableCell}>{row.startDate}</TableCell>
                        <TableCell className={classes.tableCell}>{row.endDate}</TableCell>
                        <TableCell className={classes.tableCell}>{row.status}</TableCell>
                        <TableCell className={classes.tableCell}>
                          <div className="d-flex align-items-center">
                            <div className="icon">
                              <IconView />
                            </div>
                            <div className="icon" onClick={() => saveFile({ title: "file.pdf", url: "http://localhost:3000/file.zip" })}>
                              <IconDownload />
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={9} />
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <Box display="flex" justifyContent="center" flex={1} padding={1}>
              <Pagination
                page={Number(pageNumber)}
                count={Math.ceil(rows.length / ROWS_PER_PAGE)}
                shape="round"
                color="#E6BE00"
                showFirstButton
                showLastButton
                boundaryCount={2}
                renderItem={(item) => (
                  <PaginationItem type={"start-ellipsis"} component={Link} selected to={`${PATH}/${item.page}`} {...item} />
                )}
              />
            </Box>
          </TableContainer>
        </div>
      </div>
    </React.Fragment>
  );
};
