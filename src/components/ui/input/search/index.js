import React from 'react';
import './style.scoped.scss'

export const Search = ({title, icon, style}) => {
  return (
    <React.Fragment>
      <div className="input" style={{...style}}>
        {icon ? <div className="icon">{icon}</div> : ""}
        {title}
      </div>

      <style jsx>{`
      
        `}</style>
    </React.Fragment>
  );
};
