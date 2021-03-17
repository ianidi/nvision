import React from 'react';
import './style.scoped.scss'

export const Button = ({title, icon, style}) => {

  return (
    <React.Fragment>
      <div className="button" style={{...style}}>
        {title}
      </div>

      <style jsx>{`
      
        `}</style>
    </React.Fragment>
  );
};
