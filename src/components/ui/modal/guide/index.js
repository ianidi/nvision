import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { close } from "../../../../store/modalSlice";
import { selectGuide, selectGuideCategory } from "../../../../store/uiSlice";
import { selectLoading, addGuide, editGuide, removeGuide } from "../../../../store/dataSlice";

import { TextInput } from "../../../ui/input";
import { Button } from "../../../ui/button";
import { ReactComponent as IconModalClose } from "../../../../assets/icons/modal_close.svg";
import "./style.scoped.scss";

export const ModalGuideCreate = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
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
          <Button title="Отправить" loading={loading.addGuide} onClick={() => dispatch(addGuide({ Title: title, Category: category }))} />
        </div>
      </div>
    </React.Fragment>
  );
};

export const ModalGuideEdit = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const guide = useSelector(selectGuide);
  const [title, setTitle] = useState(guide.Title);

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
            onClick={() => dispatch(editGuide({ Category: guide.Category, GuideID: guide.GuideID, Title: title }))}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export const ModalGuideRemove = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const guide = useSelector(selectGuide);

  return (
    <React.Fragment>
      <div className="modal__content">
        <div className="modal__close" onClick={() => dispatch(close())}>
          <IconModalClose />
        </div>
        <div className="modal__title">Удалить запись</div>

        <div className="d-flex justify-content-center">
          <Button title="Удалить" loading={loading.removeGuide} onClick={() => dispatch(removeGuide(guide))} />
        </div>
      </div>
    </React.Fragment>
  );
};
