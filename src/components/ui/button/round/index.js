import React from 'react';
import './style.scoped.scss'

export const Round = ({title, icon, style, onClick}) => {

  return (
    <React.Fragment>
      <div className="button" style={{...style}} onClick={onClick}>
        {title}
        {icon ? <div className="icon">{icon}</div> : ""}
      </div>

      <style jsx>{`
      
        `}</style>
    </React.Fragment>
  );
};
