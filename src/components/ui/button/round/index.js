import React from 'react';
import './style.scoped.scss'

export const Round = ({title, icon, style}) => {

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
