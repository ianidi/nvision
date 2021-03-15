import React from 'react';
import { Excel } from '../../components/ui/button';
import { ReactComponent as IconArrowNav } from '../../assets/icons/arrow_nav.svg';
import { ReactComponent as IconArrowDownloadExcel } from '../../assets/icons/arrow_download_excel.svg';
import './style.scss'

export const Employee = () => {
  return <React.Fragment>
    <div className="card">
      <div className="head">
        <div className="d-flex align-items-center">
          <div className="title">Мои сотрудники</div>
          <div className="d-flex align-items-center navigation"><div className="icon"><IconArrowNav /></div>Все сотрудники</div>
        </div>
        <div>
          <Excel title="Выгрузить в Excel" icon={<IconArrowDownloadExcel />} />
        </div>
      </div>
    </div>
  </React.Fragment>;
};