import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { open } from "../../store/modalSlice";
import { selectLoading, getGuide, selectGuide, removeGuide } from "../../store/dataSlice";
import { setGuideCategory, setGuide } from "../../store/uiSlice";

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

import { saveFile } from "../../service";

import { ReactComponent as IconAdd } from "../../assets/icons/add.svg";
import { ReactComponent as IconRemove } from "../../assets/icons/remove.svg";
import { ReactComponent as IconEdit } from "../../assets/icons/edit.svg";

import { TextInput } from "../../components/ui/input";
import { Button, Small } from "../../components/ui/button";
import { pageTitle } from "../../config";

import "./style.scoped.scss";

var classNames = require("classnames");

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

const headCells = [
  { id: "name", disablePadding: true, label: "№", props: { width: "25%" } },
  { id: "title", disablePadding: false, label: "Название", props: { width: "25%" } },
  { id: "vendor", disablePadding: false, label: "Оповещать об окончании сертификата", props: { width: "25%" } },
  { id: "action", disablePadding: false, label: "", props: { width: "25%" } },
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

function Action(row) {
  const dispatch = useDispatch();
  // const loading = useSelector(selectLoading);
  const { category } = useParams();

  return (
    <div className="d-flex align-items-center">
      <div
        className="icon"
        onClick={() => {
          dispatch(setGuideCategory(category));
          dispatch(setGuide(row));
          dispatch(open("guide/edit"));
        }}
      >
        <IconEdit />
      </div>
      <div className="icon" onClick={() => dispatch(removeGuide({ GuideID: row.GuideID, Category: category }))}>
        <IconRemove />
      </div>
    </div>
  );
}

export const GuideView = () => {
  const dispatch = useDispatch();
  const { category } = useParams();

  return (
    <React.Fragment>
      <div className="area">
        <div className="head">
          <div className="d-flex align-items-center">
            <div className="title">{pageTitle[category]}</div>
          </div>
          <div className="d-flex align-items-center">
            <Small
              title="Добавить запись"
              icon={<IconAdd />}
              color="#151515"
              onClick={() => {
                dispatch(setGuideCategory(category));
                dispatch(open("guide/create"));
              }}
            />
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between table__search">
          <div style={{ width: "89%" }}>
            <TextInput title="Введите название" search />
          </div>
          <div style={{ width: "10%" }}>
            <Button title="Найти" />
          </div>
        </div>

        <div className="d-flex">
          <TableGuide />
        </div>
      </div>
    </React.Fragment>
  );
};

function TableGuide() {
  const classes = useStyles();
  const { category } = useParams();

  const dispatch = useDispatch();
  const rows = useSelector(selectGuide);

  useEffect(() => {
    dispatch(getGuide({ Category: category }));
  }, []);

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

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const PATH = `/guide/${category}`;
  const ROWS_PER_PAGE = 15;

  const { pageNumber = 1 } = useParams();

  return (
    <TableContainer style={{ marginTop: "10px", marginBottom: "20px", userSelect: "none" }}>
      <Table className={classes.table} size="small" aria-label="таблица">
        <TableHead>
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                align={"left"}
                padding={headCell.disablePadding ? "none" : "default"}
                sortDirection={orderBy === headCell.id ? order : false}
                className={classes.tableKey}
                {...headCell.props}
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
          {rows &&
            stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    // hover
                    // onClick={(event) => handleClick(event, row.name)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.GuideID}
                    selected={isItemSelected}
                    className={classes.tableLine}
                  >
                    <TableCell className={classes.tableCell} component="th" scope="row" padding="none">
                      {row.GuideID}
                    </TableCell>
                    <TableCell className={classes.tableCell}>{row.Title}</TableCell>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                        // onClick={(event) => handleClick(event, row.name)}
                      />
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Action {...row} />
                    </TableCell>
                  </TableRow>
                );
              })}
          {/*emptyRows > 0 && (
            <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
              <TableCell colSpan={9} />
            </TableRow>
          )*/}
        </TableBody>
      </Table>

      {/*<Box display="flex" justifyContent="center" flex={1} padding={1}>
        <Pagination
          page={Number(pageNumber)}
          count={Math.ceil(rows.length / ROWS_PER_PAGE)}
          shape="round"
          color="#E6BE00"
          showFirstButton
          showLastButton
          boundaryCount={2}
          renderItem={(item) => <PaginationItem type={"start-ellipsis"} component={Link} selected to={`${PATH}/${item.page}`} {...item} />}
        />
        </Box>*/}
    </TableContainer>
  );
}
