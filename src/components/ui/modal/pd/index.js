import React from 'react';
import { useDispatch } from "react-redux";
import { close } from "../../../../store/modalSlice";

import { TextInput } from '../../../ui/input';
import { Button } from '../../../ui/button';
import { ReactComponent as IconModalClose } from '../../../../assets/icons/modal_close.svg';
import './style.scoped.scss';

export const ModalPD = () => {
  const dispatch = useDispatch();
  
  return <React.Fragment>
  <div className="modal__content">
    <div className="modal__close" onClick={() => dispatch(close())}><IconModalClose /></div>
      <div className="modal__title">Запрос о ПД</div>
      <TextInput title="Email" style={{marginBottom: 20}} />
      <div className="pd__description" style={{marginBottom: 20}}>Согласие на использование персональных данных</div>
      <div className="pd__description" style={{marginBottom: 40}}>Просим вас предоставить согласие на использование ваших персональных данных в тендерах: данные о дипломах, сертификатах, удостоверениях, учёных степенях.</div>
      <div className="d-flex justify-content-center">
        <Button title="Отправить" onClick={() => dispatch(close())} />
      </div>
    </div>
</React.Fragment>
}