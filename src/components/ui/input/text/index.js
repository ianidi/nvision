import React from 'react';
import './style.scoped.scss'

export const TextInput = ({title, icon, style}) => {
  return (
    <React.Fragment>
      <div className="d-flex align-items-center input" style={{...style}}>
        <input type="text" className="input__field" placeholder={title} />
      </div>

      <style jsx>{`
      
        `}</style>
    </React.Fragment>
  );
};
