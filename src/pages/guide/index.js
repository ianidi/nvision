import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as IconArrow } from "../../assets/icons/arrow.svg";
import { guide } from "../../config";
import "./style.scoped.scss";

export const Guide = () => {
  return (
    <React.Fragment>
      <div className="guide__items">
        {guide.map((item, index) => (
          <Link key={index} to={`/guide/${item.path}`} className="guide__item">
            <div>{item.title}</div>
            <div>
              <IconArrow />
            </div>
          </Link>
        ))}
      </div>
    </React.Fragment>
  );
};
