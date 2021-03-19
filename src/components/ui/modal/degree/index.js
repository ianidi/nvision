import React from "react";
import { useDispatch } from "react-redux";
import { close } from "../../../../store/modalSlice";

import Uploady from "@rpldy/uploady";

import { TextInput, Select } from '../../../ui/input';
import { Button, Upload } from '../../../ui/button';
import { ReactComponent as IconModalClose } from '../../../../assets/icons/modal_close.svg';
import './style.scoped.scss';

const options = [{label: 'Значение 1', value: 'a'}, {label: 'Значение 2', value: 'b'}]

export const ModalDegree = () => {
  const dispatch = useDispatch();

  return <React.Fragment>
  <div className="modal__content">
    <div className="modal__close" onClick={() => dispatch(close())}><IconModalClose /></div>
      <div className="modal__title">Добавить ученую степень</div>

      <Select
        // value={options[0].value}
        options={options}
        label="Выберите учёную степень"
        placeholder="Выберите учёную степень"
        name="a"
        setValue={()=>{}}
        style={{marginBottom: 20}}
      />

      <div className="d-flex align-items-center justify-content-between" style={{marginBottom: 10}}>
        <TextInput title="Укажите научную область" style={{marginBottom: 20}} />
      </div>

      <Uploady destination={{ url: "https://my-server/upload" }}>
        <Upload />
      </Uploady>

      <div className="d-flex justify-content-end" style={{marginTop: 20}}>
        <Button title="Отправить" onClick={() => dispatch(close())} />
      </div>
    </div>
</React.Fragment>
}