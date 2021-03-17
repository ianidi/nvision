import React from 'react';
import './style.scoped.scss'

export const Button = ({title, icon, style, onClick}) => {

  return (
    <React.Fragment>
      <div className="button" style={{...style}} onClick={onClick}>
        {title}
      </div>

      <style jsx>{`
      
        `}</style>
    </React.Fragment>
  );
};
