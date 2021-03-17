import React from 'react';
import './style.scoped.scss'

import { ReactComponent as IconFilter } from '../../../../assets/icons/filter.svg';
import { ReactComponent as IconFilterClear } from '../../../../assets/icons/filter_clear.svg';

export const Filter = ({title, icon, style}) => {
  return (
    <React.Fragment>
      <div className="d-flex align-items-center filter" style={{...style}}>
        <div className="d-flex align-items-center">
          <div className="icon"><IconFilter /></div>
          <div>{title}</div>
        </div>
        <IconFilterClear />
      </div>

      <style jsx>{`
      
        `}</style>
    </React.Fragment>
  );
};
