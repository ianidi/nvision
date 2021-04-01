import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../../../config";
import { close } from "../../../../store/modalSlice";
import { selectLoading, addCredential, removeCredential } from "../../../../store/dataSlice";
import { selectCredential } from "../../../../store/uiSlice";

import { makeStyles } from "@material-ui/core/styles";

import Uploady from "@rpldy/uploady";

import { Select } from "../../../ui/input";
import { Button, Upload } from "../../../ui/button";
import { Datepicker } from "../../../ui/date";
import { ReactComponent as IconModalClose } from "../../../../assets/icons/modal_close.svg";
import "./style.scoped.scss";

// const useStyles = makeStyles({
//   root: {
//     '&:hover': {
//       backgroundColor: 'transparent',
//     },
//   },
//   icon: {
//     borderRadius: 4,
//     width: 20,
//     height: 20,
//     boxShadow: '0px 0px 5px rgba(19, 19, 19, 0.25)',
//     backgroundColor: '#f5f8fa',
//     '$root.Mui-focusVisible &': {
//       outline: '2px auto rgba(19,124,189,.6)',
//       outlineOffset: 2,
//     },
//     'input:disabled ~ &': {
//       boxShadow: 'none',
//       background: 'rgba(206,217,224,.5)',
//     },
//   },
//   checkedIcon: {
//     backgroundColor: '#E6BE00',
//     '&:before': {
//       display: 'block',
//       width: 20,
//       height: 20,
//       backgroundImage:
//         "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
//         " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
//         "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23000'/%3E%3C/svg%3E\")",
//       content: '""',
//     },
//   },
// });

const options = [{ label: "Значение 1", value: "a" }, { label: "Значение 2", value: "b" }];

export const ModalCredential = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const [type, setType] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [file, setFile] = useState("");

  return (
    <React.Fragment>
      <div className="modal__content">
        <div className="modal__close" onClick={() => dispatch(close())}>
          <IconModalClose />
        </div>
        <div className="modal__title">Добавить удостоверение</div>

        <Select
          options={options}
          label="Выберите вид"
          placeholder="Выберите вид"
          name="type"
          setValue={(v) => setType(v)}
          style={{ marginBottom: 20 }}
        />

        <div className="d-flex align-items-center justify-content-between" style={{ marginBottom: 10 }}>
          <Datepicker callback={(d) => setDateStart(`${d.day}-${d.month}-${d.year}`)} placeholder="Дата начала" style={{ width: "48%" }} />
          <Datepicker callback={(d) => setDateEnd(`${d.day}-${d.month}-${d.year}`)} placeholder="Дата окончания" style={{ width: "48%" }} />
        </div>

        {/*<FormControlLabel
          value="end"
          control={<Checkbox className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      inputProps={{ 'aria-label': 'decorative checkbox' }} />}
          label="Бессрочный"
          labelPlacement="end"
      />*/}

        <Uploady destination={{ url: `${API_URL}/upload` }}>
          <Upload extraProps={{ onComplete: (res) => setFile(res) }} />
        </Uploady>

        <div className="d-flex justify-content-end" style={{ marginTop: 20 }}>
          <Button
            title="Отправить"
            loading={loading.addCredential}
            onClick={() => dispatch(addCredential({ Type: type, DateStart: dateStart, DateEnd: dateEnd, File: file }))}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export const ModalCredentialRemove = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const credential = useSelector(selectCredential);

  return (
    <React.Fragment>
      <div className="modal__content">
        <div className="modal__close" onClick={() => dispatch(close())}>
          <IconModalClose />
        </div>
        <div className="modal__title">Удалить запись</div>

        <div className="d-flex justify-content-center">
          <Button title="Удалить" loading={loading.removeCredential} onClick={() => dispatch(removeCredential(credential))} />
        </div>
      </div>
    </React.Fragment>
  );
};
