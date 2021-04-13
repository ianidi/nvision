import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { Popover } from "react-tiny-popover";

import { TextInput } from "../../input";
import Checkbox from "@material-ui/core/Checkbox";

import { getGuide, selectGuide } from "../../../../store/dataSlice";
import { ReactComponent as IconArrowDown } from "../../../../assets/icons/arrow_down.svg";
import "./style.scoped.scss"

export const FilterSpeciality = ({ open, setState }) => {
    const guide = useSelector(selectGuide);
    const isItemSelected = false;
  
    return (
      <Popover
        isOpen={open}
        onClickOutside={() => setState(false)}
        positions={["bottom", "right"]}
        content={({ position, childRect, popoverRect }) => (
          <div className="popover__container">
            <div className="d-flex align-items-center justify-content-end">
              <div className="filter__clear">Очистить все</div>
            </div>
            <OverlayScrollbarsComponent
              options={{
                scrollbars: { autoHide: "never" },
              }}
              style={{ maxHeight: "300px" }}
              className="os-theme-thin-dark"
            >
              {guide &&
                guide.map((item, index) => {
                  if (item.Category !== "specialty") {
                    return;
                  }
  
                  return (
                    <div key={index} className="d-flex justify-content-start">
                      <div className="d-flex align-items-center filter__row">
                        <Checkbox
                          checked={isItemSelected}
                          // inputProps={{ "aria-labelledby": labelId }}
                          // onClick={(event) => handleClick(event, row.EmployeeID)}
                        />
                        <div>{item.Title}</div>
                      </div>
                    </div>
                  );
                })}
            </OverlayScrollbarsComponent>
            <TextInput title="Поиск" search style={{ marginTop: 10 }} />
          </div>
        )}
      >
        <div className="dropdown" onClick={() => setState(!open)}>
          <div>Специальность</div>
          <IconArrowDown />
        </div>
      </Popover>
    );
  };