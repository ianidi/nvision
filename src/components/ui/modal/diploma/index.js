import React, { forwardRef } from "react";
import { compose } from '@bem-react/core'
import {
  Modal as ModalDesktop,
  withThemeNormal,
} from '@yandex/ui/Modal/desktop'
import { withZIndex } from '@yandex/ui/withZIndex'

import Uploady from "@rpldy/uploady";

import { TextInput, Select } from '../../../ui/input';
import { Button, Upload } from '../../../ui/button';
import { ReactComponent as IconModalClose } from '../../../../assets/icons/modal_close.svg';
import './style.scoped.scss';

const Modal = compose(
  withThemeNormal,
  withZIndex,
)(ModalDesktop)

const options = [{label: 'Значение 1', value: 'a'}, {label: 'Значение 2', value: 'b'}]

export const ModalDiploma = ({visible, setVisible}) => {
  return <React.Fragment>
  <Modal
  theme="normal"
  onClose={() => setVisible(false)}
  visible={visible}
  zIndexGroupLevel={2000}
  >
  <div className="modal__content">
    <div className="modal__close" onClick={() => setVisible(false)}><IconModalClose /></div>
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
        <Button title="Отправить" onClick={() => setVisible(false)} />
      </div>
    </div>
  </Modal>
</React.Fragment>
}