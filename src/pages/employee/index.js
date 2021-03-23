import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { open } from "../../store/modalSlice";

import { Popover } from "react-tiny-popover";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Box from "@material-ui/core/Box";
import { Link, useParams } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";

import { Filter, TextInput } from "../../components/ui/input";
import { Button, Small } from "../../components/ui/button";
import { ModalPD } from "../../components/ui/modal";

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

function createData(title, vendor, type, startDate, endDate, status) {
  return { title, vendor, type, startDate, endDate, status };
}

const rows = [createData("Специалист по MS Excel", "Microsoft", "Type", "Да", "01.09.2020", "Да", "31.08.2020", "Действует")];

export const Employee = () => {
  const dispatch = useDispatch();
  const [isPopover1Open, setIsPopover1Open] = useState(false);
  const [isPopover2Open, setIsPopover2Open] = useState(false);
  const [isPopover3Open, setIsPopover3Open] = useState(false);
  const [isPopover4Open, setIsPopover4Open] = useState(false);
  const [isPopover5Open, setIsPopover5Open] = useState(false);

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
            <Small
              title="Выгрузить в Excel"
              icon={<IconArrowDownloadExcel />}
              color="#009A50"
              onClick={() => exportExcel({ title: "employee", data: rows })}
            />
          </div>
        </div>

        <div className="d-flex justify-content-space-between">
          <div className="d-flex flex-column filter">
            <Filter title="Фильтр" />

            <Popover
              isOpen={isPopover1Open}
              onClickOutside={() => setIsPopover1Open(false)}
              positions={["right", "bottom"]}
              content={({ position, childRect, popoverRect }) => <div className="popover__container">Hi! I'm popover content.</div>}
            >
              <div className="dropdown" onClick={() => setIsPopover1Open(!isPopover1Open)}>
                <div>Специальность</div>
                <IconArrowDown />
              </div>
            </Popover>

            <Popover
              isOpen={isPopover2Open}
              onClickOutside={() => setIsPopover2Open(false)}
              positions={["right", "bottom"]}
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
              positions={["right", "bottom"]}
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
              positions={["right", "bottom"]}
              content={({ position, childRect, popoverRect }) => <div className="popover__container">Hi! I'm popover content.</div>}
            >
              <div className="dropdown" onClick={() => setIsPopover1Open(!isPopover4Open)}>
                <div>Тип удостоверения</div>
                <IconArrowDown />
              </div>
            </Popover>

            <Popover
              isOpen={isPopover5Open}
              onClickOutside={() => setIsPopover5Open(false)}
              positions={["right", "bottom"]}
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
              <TableEmployee />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

function TableEmployee() {
  const classes = useStyles();

  const PATH = "/employee";
  const ROWS_PER_PAGE = 15;

  const { pageNumber = 1 } = useParams();

  return (
    <TableContainer style={{ marginTop: "10px", marginBottom: "20px", userSelect: "none" }}>
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
              <TableCell className={classes.tableCell} component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell className={classes.tableCell}>{row.startDate}</TableCell>
            </TableRow>
          ))}
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
          renderItem={(item) => <PaginationItem type={"start-ellipsis"} component={Link} selected to={`${PATH}/${item.page}`} {...item} />}
        />
      </Box>
    </TableContainer>
  );
}
