import React from 'react';
import './style.scoped.scss'

export const Round = ({title, icon, style, onClick}) => {

  return (
    <React.Fragment>
      <div className="round__button" style={{...style}} onClick={onClick}>
        {title}
        {icon ? <div className="round__icon">{icon}</div> : ""}
      </div>

      <style jsx>{`
      
        `}</style>
    </React.Fragment>
  );
};
