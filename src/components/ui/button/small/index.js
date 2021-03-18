import React from 'react';
import './style.scoped.scss'

export const Small = ({title, icon, style, color="#000"}) => {
  return (
    <React.Fragment>
      <div className="button" style={{...style, color}}>
        {title}
        {icon ? <div className="button__icon">{icon}</div> : ""}
      </div>

      <style jsx>{`
      
        `}</style>
    </React.Fragment>
  );
};