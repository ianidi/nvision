import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as IconArrow } from "../../assets/icons/arrow.svg";
import "./style.scoped.scss";

export const Guide = () => {
  const items = useMemo(
    () => [
      {
        title: "Справочник “Вендоры”",
        path: "vendor",
      },
      {
        title: "Справочник “Типы сертификатов”",
        path: "cert",
      },
      {
        title: "Справочник “Специальности”",
        path: "specialty",
      },
      {
        title: "Справочник “Виды удостоверений”",
        path: "credential",
      },
      {
        title: "Справочник “Типы учёных степеней”",
        path: "degree",
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <div className="items">
        {items.map((item, index) => (
          <Link key={index} to={`/guide/${item.path}`} className="item">
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
