import React from 'react';
import './style.scss'

export const Round = ({title, icon}) => {

  return (
    <React.Fragment>
      <div className="button">
        {title}
        {icon ? icon : ""}
      </div>

      <style jsx>{`
      
        `}</style>
    </React.Fragment>
  );
};
