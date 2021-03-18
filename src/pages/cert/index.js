import React, { useMemo } from 'react';
// import { Table } from '../../components/ui/table';
// import { TableCell } from '../../components/ui/table';

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

import { exportExcel } from '../../service';

import { ReactComponent as IconArrowDownloadExcel } from '../../assets/icons/arrow_download_excel.svg';
import { ReactComponent as IconClear } from '../../assets/icons/clear.svg';
import { ReactComponent as IconArrowDownloadBlack } from '../../assets/icons/arrow_download_black.svg';

import { ReactComponent as IconView } from '../../assets/icons/view.svg';
import { ReactComponent as IconDownload } from '../../assets/icons/download.svg';

import { Datepicker } from '../../components/ui/date';
import { TextInput } from '../../components/ui/input';
import { Button, Small } from '../../components/ui/button';

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

function Action() {
  return (
    <div className="d-flex align-items-center">
      <div className="icon"><IconView /></div>
      <div className="icon"><IconDownload /></div>
    </div>
  )
}

export const Cert = () => {
  return <React.Fragment>
    <div className="area">
      <div className="head">
        <div className="d-flex align-items-center">
          <div className="title">Сертификаты</div>
        </div>
        <div className="d-flex align-items-center">
          <Small title="Выгрузить в Excel" icon={<IconArrowDownloadExcel />} color="#009A50" onClick={()=>exportExcel({title: "cert", data: rows})} />
          <Small title="Очистить все фильтры" icon={<IconClear />} color="#EE262A" style={{marginLeft: 20, marginRight: 20}} />
          <Small title="Скачать файлы" icon={<IconArrowDownloadBlack />} color="#151515" />
        </div>
      </div>

        <div className="d-flex align-items-center justify-content-between table__search">
          <div style={{width: '25%'}}>
            <TextInput title="Введите ФИО сотрудника" search />
          </div>
          <div style={{width: '10%'}}>
            <Datepicker
            callback={()=>{}}
            // value={birthday}
            placeholder="Дата начала"
            />
          </div>
          <div style={{width: '10%'}}>
            <Datepicker
              callback={()=>{}}
              // value={birthday}
              placeholder="Дата конца"
            />
          </div>
          <div style={{width: '40%'}}>
            Наименование Вендор Тип Статус
          </div>
          <div style={{width: '10%'}}>
            <Button title="Найти" />
          </div>
        </div>

      <div className="d-flex">
          <TableEmployee />
        </div>
      </div>
  </React.Fragment>;
};

function TableEmployee() {
  const classes = useStyles();

  const PATH = "/cert";
  const ROWS_PER_PAGE = 15;

  const { pageNumber = 1 } = useParams();

  return (
    <TableContainer style={{marginTop: "10px", marginBottom: "20px", userSelect: "none"}}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableKey}>ФИО сотрудника</TableCell>
            <TableCell className={classes.tableKey}>Наименование</TableCell>
            <TableCell className={classes.tableKey}>Вендор</TableCell>
            <TableCell className={classes.tableKey}>Тип</TableCell>
            <TableCell className={classes.tableKey}>Дата начала</TableCell>
            <TableCell className={classes.tableKey}>Дата окончания</TableCell>
            <TableCell className={classes.tableKey}>Статус</TableCell>
            <TableCell className={classes.tableKey}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} className={classes.tableLine}>
              <TableCell className={classes.tableCell} component="th" scope="row">{row.title}</TableCell>
              <TableCell className={classes.tableCell}>{row.vendor}</TableCell>
              <TableCell className={classes.tableCell}>{row.type}</TableCell>
              <TableCell className={classes.tableCell}>{row.type}</TableCell>
              <TableCell className={classes.tableCell}>{row.endDate}</TableCell>
              <TableCell className={classes.tableCell}>{row.startDate}</TableCell>
              <TableCell className={classes.tableCell}>{row.status}</TableCell>
              <TableCell className={classes.tableCell}><Action /></TableCell>
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

// export const List = () => {

//   const columns = useMemo(
//     () => [
//       {
//         Header: 'ФИО сотрудника',
//         accessor: 'OfferID',
//         disableSortBy: false,
//       },
//       {
//         Header: 'Наименование',
//         accessor: 'title',
//         disableSortBy: false,
//       },
//       {
//         Header: 'Вендор',
//         accessor: 'vendor',
//         disableSortBy: false,
//       },
//       {
//         Header: 'Тип',
//         accessor: 'type',
//         disableSortBy: false,
//       },
//       {
//         Header: 'Дата начала',
//         accessor: 'validFrom',
//         disableSortBy: false,
//         Cell: TableCell.Datetime,
//       },
//       {
//         Header: 'Дата окончания',
//         accessor: 'validTo',
//         disableSortBy: false,
//         Cell: TableCell.Datetime,
//       },
//       {
//         Header: 'Статус',
//         accessor: 'status',
//         disableSortBy: false,
//         Cell: TableCell.Status,
//       },
//     ],
//     []
//   );

//   return <React.Fragment>



//     <Table
//       columns={columns}
//       // menuOptions={[
//       //   {
//       //     onSelect: (row) => {
//       //       // history.push(`/manager/${path}/view/${row.original.OfferID}`);
//       //     },
//       //     label: 'View',
//       //   },
//       //   {
//       //     onSelect: (row) => {},
//       //     label: 'Remove',
//       //   },
//       // ]}
//       query={async () => {
//         // try {
//         //   const { data, error } = await ManagerOfferList();

//         //   if (!error) {
//         //     return { data: data.ManagerOfferList, error };
//         //   }

//         //   return { data: [], error };
//         // } catch (err) {
//         //   return { data: [], error: "NETWORK_ERROR" };
//         // }
//         return { data: [], error: "" };
//       }}
//       checkbox
//     />
//   </React.Fragment>;
// };