import React from "react";
import { useDispatch } from "react-redux";

import Uploady from "@rpldy/uploady";

import { close } from "../../../../store/modalSlice";
import { Select } from '../../../ui/input';
import { Button, Upload } from '../../../ui/button';
import { ReactComponent as IconModalClose } from '../../../../assets/icons/modal_close.svg';
import './style.scoped.scss';

const options = [{label: 'Значение 1', value: 'a'}, {label: 'Значение 2', value: 'b'}]

export const ModalDiploma = () => {
  const dispatch = useDispatch();

  return <React.Fragment>
  <div className="modal__content">
    <div className="modal__close" onClick={() => dispatch(close())}><IconModalClose /></div>
      <div className="modal__title">Добавить диплом</div>

      <Select
        // value={options[0].value}
        options={options}
        label="Выберите специальность"
        placeholder="Выберите специальность"
        name="a"
        setValue={()=>{}}
        style={{marginBottom: 20}}
      />

      <Uploady destination={{ url: "https://my-server/upload" }}>
        <Upload />
      </Uploady>

      <div className="d-flex justify-content-end" style={{marginTop: 20}}>
        <Button title="Отправить" onClick={() => dispatch(close())} />
      </div>
    </div>
</React.Fragment>
}