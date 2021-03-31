import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { close } from "../../../../store/modalSlice";
import { selectGuideCategory, selectGuideID } from "../../../../store/uiSlice";
import { selectLoading, addGuide, editGuide } from "../../../../store/dataSlice";

import { TextInput } from "../../../ui/input";
import { Button } from "../../../ui/button";
import { ReactComponent as IconModalClose } from "../../../../assets/icons/modal_close.svg";
import "./style.scoped.scss";

export const ModalGuideCreate = () => {
  const dispatch = useDispatch();
  const category = useSelector(selectGuideCategory);
  const [title, setTitle] = useState("");

  return (
    <React.Fragment>
      <div className="modal__content">
        <div className="modal__close" onClick={() => dispatch(close())}>
          <IconModalClose />
        </div>
        <div className="modal__title">Добавить справочник</div>
        <TextInput title="Название" style={{ marginBottom: 20 }} value={title} onChange={(e) => setTitle(e.target.value)} />

        <div className="d-flex justify-content-center">
          <Button title="Отправить" onClick={() => dispatch(addGuide({ Title: title, Category: category }))} />
        </div>
      </div>
    </React.Fragment>
  );
};

export const ModalGuideEdit = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const category = useSelector(selectGuideCategory);
  const guideID = useSelector(selectGuideID);
  const [title, setTitle] = useState("");

  return (
    <React.Fragment>
      <div className="modal__content">
        <div className="modal__close" onClick={() => dispatch(close())}>
          <IconModalClose />
        </div>
        <div className="modal__title">Изменить справочник</div>
        <TextInput title="Название" style={{ marginBottom: 20 }} value={title} onChange={(e) => setTitle(e.target.value)} />

        <div className="d-flex justify-content-center">
          <Button
            title="Отправить"
            loading={loading.editGuide}
            onClick={() => dispatch(editGuide({ Category: category, GuideID: guideID, Title: title }))}
          />
        </div>
      </div>
    </React.Fragment>
  );
};
