import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { Collapse } from "react-collapse";
// import { Dropzone } from '../../components/ui/upload';
import { Round } from '../../components/ui/button';
import { ModalCert, ModalDiploma, ModalDegree, ModalCredential, ModalPD } from '../../components/ui/modal';
import { ReactComponent as IconArrowRight } from '../../assets/icons/arrow_right.svg';
import { ReactComponent as IconArrowDownload } from '../../assets/icons/arrow_download.svg';
import { ReactComponent as IconPhone } from '../../assets/icons/phone.svg';
import { ReactComponent as IconEmail } from '../../assets/icons/email.svg';
import { ReactComponent as IconView } from '../../assets/icons/view.svg';
import { ReactComponent as IconDownload } from '../../assets/icons/download.svg';
import { ReactComponent as IconRemove } from '../../assets/icons/remove.svg';
import { ReactComponent as IconUpload } from '../../assets/icons/upload.svg';
import './style.scoped.scss'

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

function createData(title, vendor, type, startDate, endDate, status) {
  return { title, vendor, type, startDate, endDate, status };
}

function Status() {
  return (
    <div className="status">
      <div className="icon"><IconView /></div>
      <div className="icon"><IconDownload /></div>
      <div className="icon"><IconRemove /></div>
    </div>
  )
}

const rows = [
  createData("Специалист по MS Excel", "Microsoft", "Type", "Да", "01.09.2020", "Да", "31.08.2020", "Действует"),
];

function Cert() {
  const classes = useStyles();

  const [visible, setVisible] = useState(false);

  return (<React.Fragment>
    <ModalCert visible={visible} setVisible={setVisible} />
      <TableContainer style={{marginTop: "10px", marginBottom: "20px", userSelect: "none"}}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableKey}>Наименование</TableCell>
              <TableCell className={classes.tableKey}>Вендор</TableCell>
              <TableCell className={classes.tableKey}>Тип</TableCell>
              <TableCell className={classes.tableKey}>Затраты</TableCell>
              <TableCell className={classes.tableKey}>Дата начала</TableCell>
              <TableCell className={classes.tableKey}>Дата окончания</TableCell>
              <TableCell className={classes.tableKey}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} className={classes.tableLine}>
                <TableCell className={classes.tableCell} component="th" scope="row">{row.title}</TableCell>
                <TableCell className={classes.tableCell}>{row.vendor}</TableCell>
                <TableCell className={classes.tableCell}>{row.type}</TableCell>
                <TableCell className={classes.tableCell}>{row.startDate}</TableCell>
                <TableCell className={classes.tableCell}>{row.endDate}</TableCell>
                <TableCell className={classes.tableCell}>{row.status}</TableCell>
                <TableCell className={classes.tableCell}><Status /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="upload" onClick={() => setVisible(true)}>
        <IconUpload />
        <div className="upload__text">Добавьте сертификат</div>
      </div>
    </React.Fragment>
  );
}

function Diploma() {
  const classes = useStyles();

  const [visible, setVisible] = useState(false);

  return (<React.Fragment>
    <ModalDiploma visible={visible} setVisible={setVisible} />
      <TableContainer style={{marginTop: "10px", marginBottom: "20px", userSelect: "none"}}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableKey}>Специальность</TableCell>
              <TableCell className={classes.tableKey}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} className={classes.tableLine}>
                <TableCell className={classes.tableCell} component="th" scope="row">{row.title}</TableCell>
                <TableCell className={classes.tableCell}><Status /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="upload" onClick={() => setVisible(true)}>
        <IconUpload />
        <div className="upload__text">Добавьте сертификат</div>
      </div>
    </React.Fragment>
  );
}

function Degree() {
  const classes = useStyles();

  const [visible, setVisible] = useState(false);

  return (<React.Fragment>
    <ModalDegree visible={visible} setVisible={setVisible} />
      <TableContainer style={{marginTop: "10px", marginBottom: "20px", userSelect: "none"}}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableKey}>Ученая степень</TableCell>
              <TableCell className={classes.tableKey}>Научная область</TableCell>
              <TableCell className={classes.tableKey}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} className={classes.tableLine}>
                <TableCell className={classes.tableCell} component="th" scope="row">{row.title}</TableCell>
                <TableCell className={classes.tableCell}>{row.vendor}</TableCell>
                <TableCell className={classes.tableCell}><Status /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="upload" onClick={() => setVisible(true)}>
        <IconUpload />
        <div className="upload__text">Добавьте сертификат</div>
      </div>
    </React.Fragment>
  );
}

function Credential() {
  const classes = useStyles();

  const [visible, setVisible] = useState(false);

  return (<React.Fragment>
    <ModalCredential visible={visible} setVisible={setVisible} />
      <TableContainer style={{marginTop: "10px", marginBottom: "20px", userSelect: "none"}}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableKey}>Вид</TableCell>
              <TableCell className={classes.tableKey}>Дата начала</TableCell>
              <TableCell className={classes.tableKey}>Бессрочный</TableCell>
              <TableCell className={classes.tableKey}>Дата окончания</TableCell>
              <TableCell className={classes.tableKey}>Статус</TableCell>
              <TableCell className={classes.tableKey}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} className={classes.tableLine}>
                <TableCell className={classes.tableCell} component="th" scope="row">{row.title}</TableCell>
                <TableCell className={classes.tableCell}>{row.startDate}</TableCell>
                <TableCell className={classes.tableCell}>{row.vendor}</TableCell>
                <TableCell className={classes.tableCell}>{row.endDate}</TableCell>
                <TableCell className={classes.tableCell}>{row.status}</TableCell>
                <TableCell className={classes.tableCell}><Status /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="upload" onClick={() => setVisible(true)}>
        <IconUpload />
        <div className="upload__text">Добавьте сертификат</div>
      </div>
    </React.Fragment>
  );
}

export const Profile = () => {
  const [visible, setVisible] = useState(false);

  return <React.Fragment>
  <ModalPD visible={visible} setVisible={setVisible} />

  <div className="profile__wrapper">

  <div className="profile">
    <div className="avatar">
        <div className="avatar__img"></div>
    </div>
    <div className="person">
        <div className="person__name">Сафонова Ирина Владимировна</div>
        <div className="person__position">Руководитель направления обучения и развития</div>
        <div className="person__department">Департамент по управлению закупками и работе с партнерами; Блок по управлению персоналом.</div>
        <div className="person__director">Руководитель:<br />Гурленов Андрей Владимирович</div>
    </div>
    <div className="line"></div>
    <div className="contact">
        <div className="contact__item">
            <IconPhone />
            <div className="contact__info">(885) 2186</div>
        </div>
        <div className="contact__item">
            <IconEmail />
            <div className="contact__info">VVinokurov@nvg.ru</div>
        </div>
    </div>
      <div className="line"></div>
      <div className="buttons">
        <Round title="Отправить запрос о ПД" icon={<IconArrowRight />} style={{ marginBottom: 20 }} onClick={() => setVisible(true)} />
        <Round title="Скачать все файлы" icon={<IconArrowDownload />} />
      </div>
  </div>

  <div className="list">
    <CollapseItem title="Сертификаты" content={<Cert />} />
    <CollapseItem title="Дипломы" content={<Diploma />} />
    <CollapseItem title="Учёные степени" content={<Degree />} />
    <CollapseItem title="Удостоверения" content={<Credential />} />
  </div>
  
  </div>
  </React.Fragment>;
};


function CollapseItem({ title, content }) {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <div className="card">
        <div className={classNames({ card_open: open, card_closed: !open })}>
          <h3 className="title">{title}</h3>
          <div className="toggle" onClick={toggle}>
            <svg width="20" height="11" viewBox="0 0 20 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.35 11L10 4.20108L17.65 11L20 8.90688L10 0L0 8.90688L2.35 11Z" fill="#151515"/>
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