import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { open } from "../../store/modalSlice";

import { Popover, ArrowContainer } from "react-tiny-popover";

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

import { Filter, TextInput } from "../../components/ui/input";
import { Button, Small } from "../../components/ui/button";

import { exportExcel } from "../../service";

import { ReactComponent as IconArrowNav } from "../../assets/icons/arrow_nav.svg";
import { ReactComponent as IconArrowDownloadExcel } from "../../assets/icons/arrow_download_excel.svg";
import { ReactComponent as IconArrowRightSmall } from "../../assets/icons/arrow_right_small.svg";
import { ReactComponent as IconArrowDown } from "../../assets/icons/arrow_down.svg";
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

function createData(EmployeeID, firstName, title, vendor, type, startDate, endDate, status) {
  return { EmployeeID, firstName, title, vendor, type, startDate, endDate, status };
}

const rows = [
  createData(1, "First Name", "Специалист по MS Excel", "Microsoft", "Type", "01.09.2020", "31.08.2020", "Действует"),
  createData(2, "Last Name", "Специалист по MS Excel", "Microsoft", "Type", "02.09.2020", "30.08.2020", "Действует"),
];

const headCells = [
  { id: "firstName", disablePadding: true, label: "ФИО сотрудника" },
  { id: "title", disablePadding: false, label: "Подразделение" },
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

export const Employee = () => {
  const dispatch = useDispatch();
  const [isPopover1Open, setIsPopover1Open] = useState(false);
  const [isPopover2Open, setIsPopover2Open] = useState(false);
  const [isPopover3Open, setIsPopover3Open] = useState(false);
  const [isPopover4Open, setIsPopover4Open] = useState(false);
  const [isPopover5Open, setIsPopover5Open] = useState(false);

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
      const newSelecteds = rows.map((n) => n.EmployeeID);
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

  const PATH = "/employee";
  const ROWS_PER_PAGE = 15;

  const { pageNumber = 1 } = useParams();

  const prepareExcel = () => {
    let data = rows;

    if (selected.length > 0) {
      data = data.filter((item) => selected.includes(item.EmployeeID));
    }

    exportExcel({ title: "employee", data });
  };

  console.log(selected);

  return (
    <React.Fragment>
      <div className="area">
        <div className="head">
          <div className="d-flex align-items-center">
            <div className="title">Мои сотрудники</div>
            <div className="d-flex align-items-center navigation">
              <div className="icon">
                <IconArrowNav />
              </div>
              Все сотрудники
            </div>
          </div>
          <div className="d-flex align-items-center">
            <Small
              title="Отправить запрос о ПД"
              icon={<IconArrowRightSmall />}
              color="#151515"
              style={{ marginRight: 20 }}
              onClick={() => dispatch(open("cert"))}
            />
            <Small title="Выгрузить в Excel" icon={<IconArrowDownloadExcel />} color="#009A50" onClick={prepareExcel} />
          </div>
        </div>

        <div className="d-flex justify-content-space-between">
          <div className="d-flex flex-column filter">
            <Filter title="Фильтр" />

            <Popover
              isOpen={isPopover1Open}
              onClickOutside={() => setIsPopover1Open(false)}
              positions={["bottom", "right"]}
              content={({ position, childRect, popoverRect }) => (
                <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
                  position={position}
                  childRect={{ width: 300, height: 200, top: 0, left: 120, right: 0, bottom: 0 }}
                  popoverRect={popoverRect}
                  arrowColor={"white"}
                  arrowSize={10}
                  arrowStyle={{ opacity: 1 }}
                  className="popover-arrow-container"
                  arrowClassName="popover-arrow"
                >
                  <div className="popover__container">Hi! I'm popover content. Here's my position: {position}.</div>
                </ArrowContainer>
              )}
            >
              <div className="dropdown" onClick={() => setIsPopover1Open(!isPopover1Open)}>
                <div>Специальность</div>
                <IconArrowDown />
              </div>
            </Popover>

            <Popover
              isOpen={isPopover2Open}
              onClickOutside={() => setIsPopover2Open(false)}
              positions={["bottom", "right"]}
              content={({ position, childRect, popoverRect }) => <div className="popover__container">Hi! I'm popover content.</div>}
            >
              <div className="dropdown" onClick={() => setIsPopover2Open(!isPopover2Open)}>
                <div>Сертификат</div>
                <IconArrowDown />
              </div>
            </Popover>

            <Popover
              isOpen={isPopover3Open}
              onClickOutside={() => setIsPopover3Open(false)}
              positions={["bottom", "right"]}
              content={({ position, childRect, popoverRect }) => <div className="popover__container">Hi! I'm popover content.</div>}
            >
              <div className="dropdown" onClick={() => setIsPopover3Open(!isPopover3Open)}>
                <div>Вендор</div>
                <IconArrowDown />
              </div>
            </Popover>

            <Popover
              isOpen={isPopover4Open}
              onClickOutside={() => setIsPopover4Open(false)}
              positions={["bottom", "right"]}
              content={({ position, childRect, popoverRect }) => <div className="popover__container">Hi! I'm popover content.</div>}
            >
              <div className="dropdown" onClick={() => setIsPopover4Open(!isPopover4Open)}>
                <div>Тип удостоверения</div>
                <IconArrowDown />
              </div>
            </Popover>

            <Popover
              isOpen={isPopover5Open}
              onClickOutside={() => setIsPopover5Open(false)}
              positions={["bottom", "right"]}
              content={({ position, childRect, popoverRect }) => <div className="popover__container">Hi! I'm popover content.</div>}
            >
              <div className="dropdown" onClick={() => setIsPopover5Open(!isPopover5Open)}>
                <div>Ученая степень</div>
                <IconArrowDown />
              </div>
            </Popover>

            <div className="d-flex justify-content-center" style={{ marginTop: 10 }}>
              <Button title="Применить" />
            </div>
          </div>
          <div className="list">
            <div className="d-flex align-items-center">
              <TextInput title="Поиск" search style={{ marginRight: 20 }} />
              <Button title="Найти" />
            </div>
            <div>
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
                        const isItemSelected = isSelected(row.EmployeeID);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            // hover
                            // onClick={(event) => handleClick(event, row.EmployeeID)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.EmployeeID}
                            selected={isItemSelected}
                            className={classes.tableLine}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                inputProps={{ "aria-labelledby": labelId }}
                                onClick={(event) => handleClick(event, row.EmployeeID)}
                              />
                            </TableCell>
                            <TableCell className={classes.tableCell} component="th" scope="row" padding="none">
                              {row.firstName}
                            </TableCell>
                            <TableCell className={classes.tableCell}>{row.title}</TableCell>
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
        </div>
      </div>
    </React.Fragment>
  );
};
