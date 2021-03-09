import React, { useMemo } from 'react';


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

  return
  <React.Fragment>
    
  </React.Fragment>;
};