import React from 'react';
import './style.scss'

export const Excel = ({title, icon, style}) => {

  return (
    <React.Fragment>
      <div className="button" style={{...style}}>
        {title}
        {icon ? <div className="icon">{icon}</div> : ""}
      </div>

      <style jsx>{`
      
        `}</style>
    </React.Fragment>
  );
};
