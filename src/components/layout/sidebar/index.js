import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeDrawer } from "../../../store/uiSlice";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { ReactComponent as IconHome } from '../../../assets/icons/home.svg';
import { ReactComponent as IconMember } from '../../../assets/icons/member.svg';
import { ReactComponent as IconEmployee } from '../../../assets/icons/employee.svg';
import { ReactComponent as IconCertificate } from '../../../assets/icons/certificate.svg';
import { ReactComponent as IconGuide } from '../../../assets/icons/guide.svg';
import { ReactComponent as IconDrawer } from '../../../assets/icons/drawer.svg';
import "./style.scss";

var classNames = require("classnames");

export const Sidebar = ({ drawer }) => {

  let menu = [
          {
            icon: <IconHome />,
            to: `/`,
          },
          {
            icon: <IconMember />,
            to: `/a`,
          },
          {
            icon: <IconEmployee />,
            to: `/a`,
          },
          {
            icon: <IconCertificate />,
            to: `/a`,
          },
          {
            icon: <IconGuide />,
            to: `/guide`,
          },
        ]

  return (
    <React.Fragment>
      <div
        className={classNames({
          sidebar__container: true,
          sidebar: true,
          sidebar_drawer: drawer,
        })}
      >
        <div
          className={classNames({
            logo: true,
            sidebar_drawer: drawer,
          })}
        >
          <IconDrawer style={{ width: 24, height: 18 }} />
        </div>
        <div>
                {menu.map((link, index_2) => (
                  <MenuLink key={index_2} {...link} />
                ))}
              </div>
      </div>
    </React.Fragment>
  );
}

function MenuLink({ icon, title, to, count }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const isActive = useRouteMatch({
    path: to,
    exact: true,
    strict: false,
  });

  const memuClickHandler = () => {
    dispatch(closeDrawer());

    history.push(to);
  };

  return (
    <React.Fragment>
      <div
        className={classNames({
          menuLink__container: true,
          menuLink_active: isActive !== null
        })}
        onClick={memuClickHandler}
      >
        <div
          className={classNames({
            menuLink: true
          })}
        >
          <div className="icon">{icon}</div>
          {/*<div className="menu__title">
            {title}
        </div>*/}
          {count && <div className="count">{count}</div>}
        </div>
      </div>
    </React.Fragment>
  );
}


// <OverlayScrollbarsComponent
//               options={{
//                 scrollbars: { autoHide: "never" },
//               }}
//               style={{ maxHeight: "90vh" }}
//               className="os-theme-thin-dark"
//             >
//           </OverlayScrollbarsComponent>