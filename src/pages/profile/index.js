import React, { useMemo } from 'react';
import { ReactComponent as IconArrow } from '../../assets/icons/arrow.svg';
import './style.scss'

export const Profile = () => {

  return <React.Fragment>
  <div className="profile">
  <div className="avatar">
      <div className="avatar__img"></div>
  </div>
  <div className="person">
      <div className="person__name">Сафонова Ирина Владимировна</div>
      <div className="person__position">Руководитель направления обучения и развития</div>
      <div className="person__department">Департамент по управлению закупками и работе с партнерами; Блок по управлению персоналом.</div>
      <div className="person__director">Руководитель: Гурленов Андрей Владимирович</div>
  </div>
  <div className="line"></div>
  <div className="contact">
      <div className="contact__item">
          <div className="contact__info">(885) 2186</div>
      </div>
      <div className="contact__item">
          <div className="contact__info">VVinokurov@nvg.ru</div>
      </div>
  </div>
    <div className="line"></div>
    <div className="buttons"></div>
  </div>
  </React.Fragment>;
};