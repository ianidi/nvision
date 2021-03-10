import React, { useState } from 'react';
import { Collapse } from "react-collapse";
import { ReactComponent as IconPhone } from '../../assets/icons/phone.svg';
import { ReactComponent as IconEmail } from '../../assets/icons/email.svg';
import './style.scss'

var classNames = require("classnames");

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
          </Collapse>
        </div>
      </div>
      </React.Fragment>
    );
  }