import React from 'react';
import './style.scoped.scss'

import { ReactComponent as IconSearch } from '../../../../assets/icons/search.svg';

export const Search = ({title, icon, style}) => {
  return (
    <React.Fragment>
      <div className="d-flex align-items-center justify-content-center input" style={{...style}}>
        <div className="icon"><IconSearch /></div>
        <input type="text" className="input__field" placeholder={title} />
      </div>

      <style jsx>{`
      
        `}</style>
    </React.Fragment>
  );
};
