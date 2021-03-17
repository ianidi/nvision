import React, { useState } from 'react';
import { compose } from '@bem-react/core'
import {
  Modal as ModalDesktop,
  withThemeNormal,
} from '@yandex/ui/Modal/desktop'
import { withZIndex } from '@yandex/ui/withZIndex'
import './style.scoped.scss'

import { ReactComponent as IconModalClose } from '../../../../assets/icons/modal_close.svg';

const Modal = compose(
  withThemeNormal,
  withZIndex,
)(ModalDesktop)

export const PD = ({visible, setVisible}) => {
  return <React.Fragment><Modal
theme="normal"
onClose={() => setVisible(false)}
visible={visible}
zIndexGroupLevel={2000}
>
<div className="modal__content">
<div className="modal__close" onClick={() => setVisible(false)}><IconModalClose /></div>
<div className="modal__title">Запрос о ПД</div>
</div>
</Modal></React.Fragment>
}