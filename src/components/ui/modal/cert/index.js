import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../../../config";
import { close } from "../../../../store/modalSlice";
import { selectLoading, addCert, removeCert } from "../../../../store/dataSlice";
import { selectCert } from "../../../../store/uiSlice";

import { makeStyles } from "@material-ui/core/styles";

import Uploady from "@rpldy/uploady";

import { Select } from "../../../ui/input";
import { Button, Upload } from "../../button";
import { Datepicker } from "../../../ui/date";
import { ReactComponent as IconModalClose } from "../../../../assets/icons/modal_close.svg";
import "./style.scoped.scss";

const options = [{ label: "Значение 1", value: "a" }, { label: "Значение 2", value: "b" }];

export const ModalCert = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [vendor, setVendor] = useState("");
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
        <div className="modal__title">Добавить сертификат</div>

        <Select
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
            options={options}
            label="Вендор"
            placeholder="Вендор"
            name="vendor"
            setValue={(v) => setVendor(v)}
            style={{ width: "48%" }}
          />
          <Select
            options={options}
            label="Выберите тип"
            placeholder="Выберите тип"
            name="type"
            setValue={(v) => setType(v)}
            style={{ width: "48%" }}
          />
        </div>

        <Uploady destination={{ url: `${API_URL}/upload` }}>
          <Upload extraProps={{ onComplete: (res) => setFile(res) }} />
        </Uploady>

        <div className="d-flex justify-content-end" style={{ marginTop: 20 }}>
          <Button
            title="Отправить"
            onClick={() =>
              dispatch(addCert({ Vendor: vendor, Type: type, File: file, Title: title, DateStart: dateStart, DateEnd: dateEnd }))
            }
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export const ModalCertRemove = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const cert = useSelector(selectCert);

  return (
    <React.Fragment>
      <div className="modal__content">
        <div className="modal__close" onClick={() => dispatch(close())}>
          <IconModalClose />
        </div>
        <div className="modal__title">Удалить запись</div>

        <div className="d-flex justify-content-center">
          <Button title="Удалить" loading={loading.removeGuide} onClick={() => dispatch(removeCert(cert))} />
        </div>
      </div>
    </React.Fragment>
  );
};
