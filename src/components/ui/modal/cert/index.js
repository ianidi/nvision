import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../../../config";
import { close } from "../../../../store/modalSlice";
import { selectLoading, addCert, removeCert, selectGuideVendor, selectGuideCert } from "../../../../store/dataSlice";
import { selectCert } from "../../../../store/uiSlice";

import Uploady from "@rpldy/uploady";

import { Select, TextInput } from "../../../ui/input";
import { Button, Upload } from "../../button";
import { Datepicker } from "../../../ui/date";
import { ReactComponent as IconModalClose } from "../../../../assets/icons/modal_close.svg";
import "./style.scoped.scss";

export const ModalCert = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const [title, setTitle] = useState("");
  const [vendor, setVendor] = useState("");
  const [type, setType] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [file, setFile] = useState("");

  const guideVendor = useSelector(selectGuideVendor);
  const guideCert = useSelector(selectGuideCert);

  return (
    <React.Fragment>
      <div className="modal__content">
        <div className="modal__close" onClick={() => dispatch(close())}>
          <IconModalClose />
        </div>
        <div className="modal__title">Добавить сертификат</div>

        <div className="d-flex align-items-center" style={{ marginBottom: 20 }}>
          <TextInput title="Введите название" name="title" onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="d-flex align-items-center justify-content-between" style={{ marginBottom: 20 }}>
          <Datepicker callback={(d) => setDateStart(`${d.day}-${d.month}-${d.year}`)} placeholder="Дата начала" style={{ width: "48%" }} />
          <Datepicker callback={(d) => setDateEnd(`${d.day}-${d.month}-${d.year}`)} placeholder="Дата окончания" style={{ width: "48%" }} />
        </div>

        <div className="d-flex align-items-center justify-content-between" style={{ marginBottom: 20 }}>
          <Select
            options={guideVendor}
            label="Вендор"
            placeholder="Вендор"
            name="vendor"
            setValue={(v) => setVendor(v)}
            style={{ width: "48%" }}
          />
          <Select
            options={guideCert}
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
            loading={loading.addCert}
            onClick={() =>
              dispatch(addCert({ Vendor: vendor, Type: type, Title: title, DateStart: dateStart, DateEnd: dateEnd, File: file }))
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
          <Button title="Удалить" loading={loading.removeCert} onClick={() => dispatch(removeCert(cert))} />
        </div>
      </div>
    </React.Fragment>
  );
};
