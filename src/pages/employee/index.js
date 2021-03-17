import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Box from "@material-ui/core/Box";
import { Link, useParams } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";

import { Small } from '../../components/ui/button';
import { ReactComponent as IconArrowNav } from '../../assets/icons/arrow_nav.svg';
import { ReactComponent as IconArrowDownloadExcel } from '../../assets/icons/arrow_download_excel.svg';
import './style.scoped.scss'


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

function createData(title, vendor, type, startDate, endDate, status) {
  return { title, vendor, type, startDate, endDate, status };
}

const rows = [
  createData("Специалист по MS Excel", "Microsoft", "Type", "Да", "01.09.2020", "Да", "31.08.2020", "Действует"),
];

export const Employee = () => {
  return <React.Fragment>
    <div className="card">
      <div className="head">
        <div className="d-flex align-items-center">
          <div className="title">Мои сотрудники</div>
          <div className="d-flex align-items-center navigation"><div className="icon"><IconArrowNav /></div>Все сотрудники</div>
        </div>
        <div>
          <Small title="Выгрузить в Excel" icon={<IconArrowDownloadExcel />} color="#009A50" />
        </div>
      </div>

      <div className="d-flex justify-content-space-between">
        <div className="filter">
          
        </div>
        <div className="list">
          <div className="d-flex align-items-center">
            <input />
          </div>
          <div>
            <TableEmployee />
          </div>
        </div>
      </div>
    </div>
  </React.Fragment>;
};

function TableEmployee() {
  const classes = useStyles();

  const PATH = "/employee";
  const ROWS_PER_PAGE = 15;

  const { pageNumber = 1 } = useParams();

  return (
    <TableContainer style={{marginTop: "10px", marginBottom: "20px", userSelect: "none"}}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableKey}>Фамилия, Имя, Отчество сотрудника</TableCell>
            <TableCell className={classes.tableKey}>Подразделение</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} className={classes.tableLine}>
              <TableCell className={classes.tableCell} component="th" scope="row">{row.title}</TableCell>
              <TableCell className={classes.tableCell}>{row.startDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
        
        <Box
          display="flex"
          justifyContent="center"
          flex={1}
          padding={1}
        >
        <Pagination
        page={Number(pageNumber)}
        count={Math.ceil(rows.length / ROWS_PER_PAGE)}
        shape="round"
        color="#E6BE00"
        showFirstButton
        showLastButton
        boundaryCount={2}
        renderItem={(item) => (
          <PaginationItem
          type={"start-ellipsis"}
            component={Link}
            selected
            to={`${PATH}/${item.page}`}
            {...item}
          />
        )}
      />
      </Box>

    </TableContainer>
  );
}