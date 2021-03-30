import React from "react";
import "./style.scoped.scss";

import { ReactComponent as IconSearch } from "../../../../assets/icons/search.svg";

export const TextInput = ({ title, search, style, value, onChange }) => {
  return (
    <React.Fragment>
      <div className="d-flex align-items-center input" style={{ ...style }}>
        {search && (
          <div className="icon">
            <IconSearch />
          </div>
        )}
        <input type="text" className="input__field" placeholder={title} value={value && value} onChange={onChange && onChange} />
      </div>
    </React.Fragment>
  );
};
