import React from 'react';
import { compose } from '@bem-react/core'
import {
  Modal as ModalDesktop,
  withThemeNormal,
} from '@yandex/ui/Modal/desktop'
import { withZIndex } from '@yandex/ui/withZIndex'

import { TextInput } from '../../input';
import { Button } from '../../button';
import { ReactComponent as IconModalClose } from '../../../../assets/icons/modal_close.svg';
import './style.scoped.scss';

const Modal = compose(
  withThemeNormal,
  withZIndex,
)(ModalDesktop)

export const ModalCert = ({visible, setVisible}) => {
  return <React.Fragment>
  <Modal
  theme="normal"
  onClose={() => setVisible(false)}
  visible={visible}
  zIndexGroupLevel={2000}
  >
  <div className="modal__content">
    <div className="modal__close" onClick={() => setVisible(false)}><IconModalClose /></div>
      <div className="modal__title">Запрос о ПД</div>
      <TextInput title="Email" style={{marginBottom: 20}} />
      <div className="description" style={{marginBottom: 20}}>Согласие на использование персональных данных</div>
      <div className="description" style={{marginBottom: 40}}>Просим вас предоставить согласие на использование ваших персональных данных в тендерах: данные о дипломах, сертификатах, удостоверениях, учёных степенях.</div>
      <div className="d-flex justify-content-center">
        <Button title="Отправить" onClick={() => setVisible(false)} />
      </div>
    </div>
  </Modal>
</React.Fragment>
}