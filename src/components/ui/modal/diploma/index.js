import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { API_URL } from "../../../../config";
import { close } from "../../../../store/modalSlice";
import { addDiploma } from "../../../../store/dataSlice";

import Uploady from "@rpldy/uploady";

import { Select } from "../../../ui/input";
import { Button, Upload } from "../../../ui/button";
import { ReactComponent as IconModalClose } from "../../../../assets/icons/modal_close.svg";
import "./style.scoped.scss";

const options = [{ label: "Значение 1", value: "a" }, { label: "Значение 2", value: "b" }];

export const ModalDiploma = () => {
  const dispatch = useDispatch();
  const [specialty, setSpecialty] = useState("");

  return (
    <React.Fragment>
      <div className="modal__content">
        <div className="modal__close" onClick={() => dispatch(close())}>
          <IconModalClose />
        </div>
        <div className="modal__title">Добавить диплом</div>

        <Select
          // value={options[0].value}
          options={options}
          label="Выберите специальность"
          placeholder="Выберите специальность"
          name="a"
          setValue={(v) => setSpecialty(v)}
          style={{ marginBottom: 20 }}
        />

        <Uploady destination={{ url: `${API_URL}/upload` }}>
          <Upload />
        </Uploady>

        <div className="d-flex justify-content-end" style={{ marginTop: 20 }}>
          <Button title="Отправить" onClick={() => dispatch(addDiploma({ Specialty: specialty }))} />
        </div>
      </div>
    </React.Fragment>
  );
};
