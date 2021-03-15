import React from 'react';
import './style.scoped.scss'

export const Round = ({title, icon, style}) => {

  return (
    <React.Fragment>
      <div className="button" style={{...style}}>
        {title}
        {icon ? icon : ""}
      </div>

      <style jsx>{`
      
        `}</style>
    </React.Fragment>
  );
};
