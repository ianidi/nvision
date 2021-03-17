import React, { useState } from 'react';
import { compose } from '@bem-react/core'
import {
  Modal as ModalDesktop,
  withViewDefault,
} from '@yandex/ui/Modal/desktop'
import { withZIndex } from '@yandex/ui/withZIndex'

const Modal = compose(
  withViewDefault,
  withZIndex,
)(ModalDesktop)

export const PD = ({visible, setVisible}) => {
  return <React.Fragment><Modal
theme="normal"
onClose={() => setVisible(false)}
visible={visible}
zIndexGroupLevel={20}
>
<div className="modal"></div>
</Modal></React.Fragment>
}