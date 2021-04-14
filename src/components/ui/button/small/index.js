import React from 'react';
import './style.scoped.scss'

export const Small = ({title, icon, style, onClick, color="#000"}) => {
  return (
    <React.Fragment>
      <div className="small__button" style={{...style, color}} onClick={onClick}>
        {title}
        {icon ? <div className="small__button__icon">{icon}</div> : ""}
      </div>

      <style jsx>{`
      
        `}</style>
    </React.Fragment>
  );
};