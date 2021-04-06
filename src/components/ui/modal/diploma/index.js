import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../../../config";
import { close } from "../../../../store/modalSlice";
import { selectLoading, addDiploma, removeDiploma, selectGuideSpecialty } from "../../../../store/dataSlice";
import { selectDiploma } from "../../../../store/uiSlice";

import Uploady from "@rpldy/uploady";

import { Select } from "../../../ui/input";
import { Button, Upload } from "../../../ui/button";
import { ReactComponent as IconModalClose } from "../../../../assets/icons/modal_close.svg";
import "./style.scoped.scss";

export const ModalDiploma = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const [specialty, setSpecialty] = useState("");
  const [file, setFile] = useState("");

  const guideSpecialty = useSelector(selectGuideSpecialty);

  return (
    <React.Fragment>
      <div className="modal__content">
        <div className="modal__close" onClick={() => dispatch(close())}>
          <IconModalClose />
        </div>
        <div className="modal__title">Добавить диплом</div>

        <Select
          options={guideSpecialty}
          label="Выберите специальность"
          placeholder="Выберите специальность"
          name="specialty"
          setValue={(v) => setSpecialty(v)}
          style={{ marginBottom: 20 }}
        />

        <Uploady destination={{ url: `${API_URL}/upload` }}>
          <Upload extraProps={{ onComplete: (res) => setFile(res) }} />
        </Uploady>

        <div className="d-flex justify-content-end" style={{ marginTop: 20 }}>
          <Button
            title="Отправить"
            loading={loading.addDiploma}
            onClick={() => dispatch(addDiploma({ Specialty: specialty, File: file }))}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export const ModalDiplomaRemove = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const diploma = useSelector(selectDiploma);

  return (
    <React.Fragment>
      <div className="modal__content">
        <div className="modal__close" onClick={() => dispatch(close())}>
          <IconModalClose />
        </div>
        <div className="modal__title">Удалить запись</div>

        <div className="d-flex justify-content-center">
          <Button title="Удалить" loading={loading.removeDiploma} onClick={() => dispatch(removeDiploma(diploma))} />
        </div>
      </div>
    </React.Fragment>
  );
};
