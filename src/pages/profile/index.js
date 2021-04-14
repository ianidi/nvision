import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { open } from "../../store/modalSlice";
import {
  getCert,
  selectCert,
  getDiploma,
  selectDiploma,
  getDegree,
  selectDegree,
  getCredential,
  selectCredential,
  getGuide,
  selectGuide,
} from "../../store/dataSlice";
import { setCert, setDiploma, setDegree, setCredential } from "../../store/uiSlice";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { Collapse } from "react-collapse";

import { saveFile } from "../../service";
import { API_URL } from "../../config";

import { Round } from "../../components/ui/button";
import { ReactComponent as IconArrowRight } from "../../assets/icons/arrow_right.svg";
import { ReactComponent as IconArrowDownload } from "../../assets/icons/arrow_download.svg";
import { ReactComponent as IconPhone } from "../../assets/icons/phone.svg";
import { ReactComponent as IconEmail } from "../../assets/icons/email.svg";
import { ReactComponent as IconView } from "../../assets/icons/view.svg";
import { ReactComponent as IconDownload } from "../../assets/icons/download.svg";
import { ReactComponent as IconRemove } from "../../assets/icons/remove.svg";
import { ReactComponent as IconUpload } from "../../assets/icons/upload.svg";
import "./style.scoped.scss";

var classNames = require("classnames");

const useStyles = makeStyles({
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
});

function Cert() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cert = useSelector(selectCert);
  const guide = useSelector(selectGuide);

  useEffect(() => {
    dispatch(getCert());
  }, []);

  return (
    <React.Fragment>
      <TableContainer style={{ marginTop: "10px", marginBottom: "20px", userSelect: "none" }}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableKey}>Наименование</TableCell>
              <TableCell className={classes.tableKey}>Вендор</TableCell>
              <TableCell className={classes.tableKey}>Тип</TableCell>
              {/*<TableCell className={classes.tableKey}>Затраты</TableCell>*/}
              <TableCell className={classes.tableKey}>Дата начала</TableCell>
              <TableCell className={classes.tableKey}>Дата окончания</TableCell>
              <TableCell className={classes.tableKey} width="300px" />
            </TableRow>
          </TableHead>
          <TableBody>
            {cert &&
              cert.map((row) => (
                <TableRow key={row.id} className={classes.tableLine}>
                  <TableCell className={classes.tableCell} component="th" scope="row">
                    {row.Title}
                  </TableCell>
                  <TableCell className={classes.tableCell}>{row.Vendor}</TableCell>
                  <TableCell className={classes.tableCell}>{row.Type}</TableCell>
                  {/*<TableCell className={classes.tableCell}>{row.Expenses}</TableCell>*/}
                  <TableCell className={classes.tableCell}>{row.DateStart}</TableCell>
                  <TableCell className={classes.tableCell}>{row.DateEnd}</TableCell>
                  <TableCell className={classes.tableCell}>
                    <div className="d-flex align-items-center">
                      <a className="p__icon" href={`${API_URL}/static/${row.File}`} target="_blank" rel="nofollow noreferrer noopener">
                        <IconView />
                      </a>
                      <div className="p__icon" onClick={() => saveFile({ title: row.File, url: `${API_URL}/static/${row.File}` })}>
                        <IconDownload />
                      </div>
                      <div
                        className="p__icon"
                        onClick={() => {
                          dispatch(setCert(row));
                          dispatch(open("cert/remove"));
                        }}
                      >
                        <IconRemove />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="p__upload" onClick={() => dispatch(open("cert"))}>
        <IconUpload />
        <div className="p__upload__text">Добавьте сертификат</div>
      </div>
    </React.Fragment>
  );
}

function Diploma() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const diploma = useSelector(selectDiploma);

  useEffect(() => {
    dispatch(getDiploma());
  }, []);

  return (
    <React.Fragment>
      <TableContainer style={{ marginTop: "10px", marginBottom: "20px", userSelect: "none" }}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableKey}>Специальность</TableCell>
              <TableCell className={classes.tableKey} width="300px" />
            </TableRow>
          </TableHead>
          <TableBody>
            {diploma &&
              diploma.map((row) => (
                <TableRow key={row.id} className={classes.tableLine}>
                  <TableCell className={classes.tableCell} component="th" scope="row">
                    {row.Specialty}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <div className="d-flex align-items-center">
                      <a className="p__icon" href={`${API_URL}/static/${row.File}`} target="_blank" rel="nofollow noreferrer noopener">
                        <IconView />
                      </a>
                      <div className="p__icon" onClick={() => saveFile({ title: row.File, url: `${API_URL}/static/${row.File}` })}>
                        <IconDownload />
                      </div>
                      <div
                        className="p__icon"
                        onClick={() => {
                          dispatch(setDiploma(row));
                          dispatch(open("diploma/remove"));
                        }}
                      >
                        <IconRemove />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="p__upload" onClick={() => dispatch(open("diploma"))}>
        <IconUpload />
        <div className="p__upload__text">Добавьте диплом</div>
      </div>
    </React.Fragment>
  );
}

function Degree() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const degree = useSelector(selectDegree);

  useEffect(() => {
    dispatch(getDegree());
  }, []);

  return (
    <React.Fragment>
      <TableContainer style={{ marginTop: "10px", marginBottom: "20px", userSelect: "none" }}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableKey}>Ученая степень</TableCell>
              <TableCell className={classes.tableKey}>Научная область</TableCell>
              <TableCell className={classes.tableKey} width="300px" />
            </TableRow>
          </TableHead>
          <TableBody>
            {degree &&
              degree.map((row) => (
                <TableRow key={row.id} className={classes.tableLine}>
                  <TableCell className={classes.tableCell} component="th" scope="row">
                    {row.Title}
                  </TableCell>
                  <TableCell className={classes.tableCell}>{row.Field}</TableCell>
                  <TableCell className={classes.tableCell}>
                    <div className="d-flex align-items-center">
                      <a className="p__icon" href={`${API_URL}/static/${row.File}`} target="_blank" rel="nofollow noreferrer noopener">
                        <IconView />
                      </a>
                      <div className="p__icon" onClick={() => saveFile({ title: row.File, url: `${API_URL}/static/${row.File}` })}>
                        <IconDownload />
                      </div>
                      <div
                        className="p__icon"
                        onClick={() => {
                          dispatch(setDegree(row));
                          dispatch(open("degree/remove"));
                        }}
                      >
                        <IconRemove />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="p__upload" onClick={() => dispatch(open("degree"))}>
        <IconUpload />
        <div className="p__upload__text">Добавьте ученую степень</div>
      </div>
    </React.Fragment>
  );
}

function Credential() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const credential = useSelector(selectCredential);

  useEffect(() => {
    dispatch(getCredential());
  }, []);

  return (
    <React.Fragment>
      <TableContainer style={{ marginTop: "10px", marginBottom: "20px", userSelect: "none" }}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableKey}>Вид</TableCell>
              <TableCell className={classes.tableKey}>Дата начала</TableCell>
              <TableCell className={classes.tableKey}>Дата окончания</TableCell>
              <TableCell className={classes.tableKey}>Статус</TableCell>
              <TableCell className={classes.tableKey} width="300px" />
            </TableRow>
          </TableHead>
          <TableBody>
            {credential &&
              credential.map((row) => (
                <TableRow key={row.id} className={classes.tableLine}>
                  <TableCell className={classes.tableCell} component="th" scope="row">
                    {row.Type}
                  </TableCell>
                  <TableCell className={classes.tableCell}>{row.DateStart}</TableCell>
                  <TableCell className={classes.tableCell}>{row.DateEnd}</TableCell>
                  <TableCell className={classes.tableCell}>{row.Status}</TableCell>
                  <TableCell className={classes.tableCell}>
                    <div className="d-flex align-items-center">
                      <a className="p__icon" href={`${API_URL}/static/${row.File}`} target="_blank" rel="nofollow noreferrer noopener">
                        <IconView />
                      </a>
                      <div className="p__icon" onClick={() => saveFile({ title: row.File, url: `${API_URL}/static/${row.File}` })}>
                        <IconDownload />
                      </div>
                      <div
                        className="p__icon"
                        onClick={() => {
                          dispatch(setCredential(row));
                          dispatch(open("credential/remove"));
                        }}
                      >
                        <IconRemove />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="p__upload" onClick={() => dispatch(open("credential"))}>
        <IconUpload />
        <div className="p__upload__text">Добавьте удостоверение</div>
      </div>
    </React.Fragment>
  );
}

export const Profile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGuide());
  }, []);

  return (
    <React.Fragment>
      <div className="p__profile__wrapper">
        <div className="p__profile">
          <div className="p__avatar">
            <div className="p__avatar__img" />
          </div>
          <div className="p__person">
            <div className="p__person__name">Сафонова Ирина Владимировна</div>
            <div className="p__person__position">Руководитель направления обучения и развития</div>
            <div className="p__person__department">
              Департамент по управлению закупками и работе с партнерами; Блок по управлению персоналом.
            </div>
            <div className="p__person__director">
              Руководитель:
              <br />
              Гурленов Андрей Владимирович
            </div>
          </div>
          <div className="p__line" />
          <div className="p__contact">
            <div className="p__contact__item">
              <IconPhone />
              <div className="p__contact__info">(885) 2186</div>
            </div>
            <div className="p__contact__item">
              <IconEmail />
              <div className="p__contact__info">VVinokurov@nvg.ru</div>
            </div>
          </div>
          <div className="p__line" />
          <div className="p__buttons">
            <Round
              title="Отправить запрос о ПД"
              icon={<IconArrowRight />}
              style={{ marginBottom: 20 }}
              onClick={() => dispatch(open("pd"))}
            />
            <Round
              title="Скачать все файлы"
              icon={<IconArrowDownload />}
              onClick={() => saveFile({ title: "files.zip", url: `${API_URL}/download` })}
            />
          </div>
        </div>

        <div className="p__list">
          <CollapseItem title="Сертификаты" content={<Cert />} />
          <CollapseItem title="Дипломы" content={<Diploma />} />
          <CollapseItem title="Учёные степени" content={<Degree />} />
          <CollapseItem title="Удостоверения" content={<Credential />} />
        </div>
      </div>
    </React.Fragment>
  );
};

function CollapseItem({ title, content }) {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <div className="p__area">
        <div className={classNames({ p__card_open: open, p__card_closed: !open })}>
          <h3 className="p__title">{title}</h3>
          <div className="p__toggle" onClick={toggle}>
            <svg width="20" height="11" viewBox="0 0 20 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.35 11L10 4.20108L17.65 11L20 8.90688L10 0L0 8.90688L2.35 11Z" fill="#151515" />
            </svg>
          </div>
        </div>
        <div>
          <Collapse isOpened={open} initialStyle={open ? { height: "auto", overflow: "initial" } : { height: "0px", overflow: "hidden" }}>
            {content}
          </Collapse>
        </div>
      </div>
    </React.Fragment>
  );
}
