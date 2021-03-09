import React, { useMemo } from 'react';
import { ReactComponent as IconArrow } from '../../assets/icons/arrow.svg';
import './style.scss'

export const Guide = () => {

  const items = useMemo(
    () => [
      {
        title: 'Справочник “Вендоры”',
        path: 'vendor',
      },
      {
        title: 'Справочник “Типы сертификатов”',
        path: 'vendor',
      },
      {
        title: 'Справочник “Специальности”',
        path: 'vendor',
      },
      {
        title: 'Справочник “Виды удостоверений”',
        path: 'vendor',
      },
      {
        title: 'Справочник “Типы учёных степеней”',
        path: 'vendor',
      },
    ],
    []
  );

  return <React.Fragment>
    <div className="items">
      {items.map((item, index) => (<div key={index} className="item"><div>{item.title}</div><div><IconArrow /></div></div>))}
    </div>
  </React.Fragment>;
};