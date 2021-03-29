import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { close } from "../../../../store/modalSlice";
import { addCert } from "../../../../store/dataSlice";

import { makeStyles } from "@material-ui/core/styles";

import Uploady from "@rpldy/uploady";

import { Select } from "../../../ui/input";
import { Button, Upload } from "../../button";
import { Datepicker } from "../../../ui/date";
import { ReactComponent as IconModalClose } from "../../../../assets/icons/modal_close.svg";
import "./style.scoped.scss";

const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    borderRadius: 4,
    width: 20,
    height: 20,
    boxShadow: "0px 0px 5px rgba(19, 19, 19, 0.25)",
    backgroundColor: "#f5f8fa",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "#E6BE00",
    "&:before": {
      display: "block",
      width: 20,
      height: 20,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23000'/%3E%3C/svg%3E\")",
      content: '""',
    },
  },
});

const options = [{ label: "Значение 1", value: "a" }, { label: "Значение 2", value: "b" }];

export const ModalCert = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [vendor, setVendor] = useState("");
  const [type, setType] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");

  return (
    <React.Fragment>
      <div className="modal__content">
        <div className="modal__close" onClick={() => dispatch(close())}>
          <IconModalClose />
        </div>
        <div className="modal__title">Добавить сертификат</div>

        <Select
          // value={options[0].value}
          options={options}
          label="Выберите название"
          placeholder="Выберите название"
          name="title"
          setValue={(v) => setTitle(v)}
          style={{ marginBottom: 20 }}
        />

        <div className="d-flex align-items-center justify-content-between" style={{ marginBottom: 20 }}>
          <Datepicker callback={(d) => setDateStart(`${d.day}-${d.month}-${d.year}`)} placeholder="Дата начала" style={{ width: "48%" }} />
          <Datepicker callback={(d) => setDateEnd(`${d.day}-${d.month}-${d.year}`)} placeholder="Дата окончания" style={{ width: "48%" }} />
        </div>

        <div className="d-flex align-items-center justify-content-between" style={{ marginBottom: 20 }}>
          <Select
            // value={options[0].value}
            options={options}
            label="Вендор"
            placeholder="Вендор"
            name="vendor"
            setValue={(v) => setVendor(v)}
            style={{ width: "48%" }}
          />
          <Select
            // value={options[0].value}
            options={options}
            label="Выберите тип"
            placeholder="Выберите тип"
            name="type"
            setValue={(v) => setType(v)}
            style={{ width: "48%" }}
          />
        </div>

        {/*<FormGroup aria-label="position" row>
          <FormControlLabel
            value="end"
            control={
              <Checkbox
                className={classes.root}
                disableRipple
                color="default"
                checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                icon={<span className={classes.icon} />}
                inputProps={{ "aria-label": "decorative checkbox" }}
              />
            }
            label="Затраты на сертификат"
            labelPlacement="end"
          />
          <FormControlLabel
            value="end"
            control={
              <Checkbox
                className={classes.root}
                disableRipple
                color="default"
                checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                icon={<span className={classes.icon} />}
                inputProps={{ "aria-label": "decorative checkbox" }}
              />
            }
            label="Бессрочный"
            labelPlacement="end"
          />
          </FormGroup>*/}

        <Uploady destination={{ url: "https://my-server/upload" }}>
          <Upload />
        </Uploady>

        <div className="d-flex justify-content-end" style={{ marginTop: 20 }}>
          <Button
            title="Отправить"
            onClick={() =>
              dispatch(addCert({ Vendor: vendor, Type: type, File: "d", Title: title, DateStart: dateStart, DateEnd: dateEnd }))
            }
          />
        </div>
      </div>
    </React.Fragment>
  );
};
