import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Collapse } from "react-collapse";
import { Dropzone } from '../../components/ui/upload';
import { ReactComponent as IconPhone } from '../../assets/icons/phone.svg';
import { ReactComponent as IconEmail } from '../../assets/icons/email.svg';
import './style.scss'

var classNames = require("classnames");


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableKey: {
    color: "rgba(255, 255, 255, 0.5)",
    borderBottom: "0.1rem solid rgba(0, 0, 0, 0.2)",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
  },
  tableLine: {
    // borderBottom: "0.1rem solid rgba(0, 0, 0, 0.1)",
    borderBottom: "0.1rem solid red",
  },
  tableCell: {
    borderBottom: "0.1rem solid rgba(0, 0, 0, 0.1)",
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 16,
    textAlign: "left",
  },
});

function createData(id, baseCurrency, baseCurrencyOpenPrice, baseCurrencyCurrentPrice, depositCurrency, timeLeft, tokens) {
  return { id, baseCurrency, baseCurrencyOpenPrice, baseCurrencyCurrentPrice, depositCurrency, timeLeft, tokens };
}

function SentiMentComponent({bear, bull}) {
  return (
    <div className="sentiment">
      {bear > 0 && `${bear}%`}
      <div className="sentiment-bear" style={{width: `${bear}%`}}></div>
      <div className="sentiment-bull" style={{width: `${bull}%`}}></div>
      {bull > 0 && `${bull}%`}
    </div>
  )
}

const rows = [
  createData( 1, "BTC", "48,514", "48,299", "SOL", "00:00", {bear: 0, bull: 100}),
];


function TableComponent() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} style={{background: "#191f2b", marginTop: "30px", borderRadius: "10px", padding: "0 7px", paddingBottom: "10px", border: "0.1rem solid rgba(255, 255, 255, 0.2)"}}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableKey}>#</TableCell>
            <TableCell className={classes.tableKey} align="right">Base currency</TableCell>
            <TableCell className={classes.tableKey} align="right">Open price</TableCell>
            <TableCell className={classes.tableKey} align="right">Current price</TableCell>
            <TableCell className={classes.tableKey} align="right">Deposit currency</TableCell>
            <TableCell className={classes.tableKey} align="right">Date created</TableCell>
            <TableCell className={classes.tableKey} align="right">Time created</TableCell>
            <TableCell className={classes.tableKey} align="right">Time left</TableCell>
            <TableCell className={classes.tableKey} align="right">Sentiment</TableCell>
            <TableCell className={classes.tableKey} align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} className={classes.tableLine} style={{borderBottom: '0.1rem solid red'}}>
              <TableCell className={classes.tableCell} component="th" scope="row">{row.id}</TableCell>
              <TableCell className={classes.tableCell} align="right">{row.baseCurrency}</TableCell>
              <TableCell className={classes.tableCell} align="right">{row.baseCurrencyOpenPrice}</TableCell>
              <TableCell className={classes.tableCell} align="right">{row.baseCurrencyCurrentPrice}</TableCell>
              <TableCell className={classes.tableCell} align="right">{row.depositCurrency}</TableCell>
              <TableCell className={classes.tableCell} align="right">01.03.2021</TableCell>
              <TableCell className={classes.tableCell} align="right">19:00</TableCell>
              <TableCell className={classes.tableCell} align="right">{row.timeLeft}</TableCell>
              <TableCell className={classes.tableCell} align="right"><SentiMentComponent bear={row.tokens.bear} bull={row.tokens.bull} /></TableCell>
              <TableCell className={classes.tableCell} align="right">Closed</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export const Profile = () => {

  return <React.Fragment>
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
      <div className="buttons"></div>
  </div>

  <div className="list">
    <CollapseItem title="Сертификаты" content="s" />
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
      <div className="faq__container" onClick={toggle}>
        <div className={classNames({ faq_open: open, faq_closed: !open })}>
          <h3 className="faq__question">{title}</h3>
          <svg width="20" height="11" viewBox="0 0 20 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.35 11L10 4.20108L17.65 11L20 8.90688L10 0L0 8.90688L2.35 11Z" fill="#151515"/>
          </svg>
        </div>
        <div>
          <Collapse isOpened={open} initialStyle={open ? { height: "auto", overflow: "initial" } : { height: "0px", overflow: "hidden" }}>
            <div className="faq__answer">{content}</div>
            <TableComponent />
            <Dropzone />
          </Collapse>
        </div>
      </div>
      </React.Fragment>
    );
  }