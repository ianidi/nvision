import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../../../config";
import { close } from "../../../../store/modalSlice";
import { selectLoading, addDegree, removeDegree } from "../../../../store/dataSlice";
import { selectDegree } from "../../../../store/uiSlice";

import Uploady from "@rpldy/uploady";

import { TextInput, Select } from "../../../ui/input";
import { Button, Upload } from "../../../ui/button";
import { ReactComponent as IconModalClose } from "../../../../assets/icons/modal_close.svg";
import "./style.scoped.scss";

const options = [{ label: "Значение 1", value: "a" }, { label: "Значение 2", value: "b" }];

export const ModalDegree = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [field, setField] = useState("");

  return (
    <React.Fragment>
      <div className="modal__content">
        <div className="modal__close" onClick={() => dispatch(close())}>
          <IconModalClose />
        </div>
        <div className="modal__title">Добавить ученую степень</div>

        <Select
          // value={options[0].value}
          options={options}
          label="Выберите учёную степень"
          placeholder="Выберите учёную степень"
          name="title"
          setValue={(v) => setTitle(v)}
          style={{ marginBottom: 20 }}
        />

        <div className="d-flex align-items-center justify-content-between" style={{ marginBottom: 10 }}>
          <TextInput title="Укажите научную область" style={{ marginBottom: 20 }} name="field" />
        </div>

        <Uploady destination={{ url: `${API_URL}/upload` }}>
          <Upload />
        </Uploady>

        <div className="d-flex justify-content-end" style={{ marginTop: 20 }}>
          <Button title="Отправить" onClick={() => dispatch(addDegree({ Title: title, Field: field }))} />
        </div>
      </div>
    </React.Fragment>
  );
};

export const ModalDegreeRemove = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const degree = useSelector(selectDegree);

  return (
    <React.Fragment>
      <div className="modal__content">
        <div className="modal__close" onClick={() => dispatch(close())}>
          <IconModalClose />
        </div>
        <div className="modal__title">Удалить запись</div>

        <div className="d-flex justify-content-center">
          <Button title="Удалить" loading={loading.removeDegree} onClick={() => dispatch(removeDegree(degree))} />
        </div>
      </div>
    </React.Fragment>
  );
};
