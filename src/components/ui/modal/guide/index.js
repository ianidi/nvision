import React from "react";
import { useDispatch } from "react-redux";
import { close } from "../../../../store/modalSlice";

import { TextInput } from "../../../ui/input";
import { Button } from "../../../ui/button";
import { ReactComponent as IconModalClose } from "../../../../assets/icons/modal_close.svg";
import "./style.scoped.scss";

export const ModalGuideCreate = () => {
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <div className="modal__content">
        <div className="modal__close" onClick={() => dispatch(close())}>
          <IconModalClose />
        </div>
        <div className="modal__title">Добавить справочник</div>
        <TextInput title="Название" style={{ marginBottom: 20 }} />

        <div className="d-flex justify-content-center">
          <Button title="Отправить" onClick={() => dispatch(close())} />
        </div>
      </div>
    </React.Fragment>
  );
};
