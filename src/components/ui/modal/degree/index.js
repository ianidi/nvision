import React, { forwardRef } from "react";
import { compose } from '@bem-react/core'
import {
  Modal as ModalDesktop,
  withThemeNormal,
} from '@yandex/ui/Modal/desktop'
import { withZIndex } from '@yandex/ui/withZIndex'

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Uploady from "@rpldy/uploady";

import { TextInput, Select } from '../../../ui/input';
import { Button, Upload } from '../../../ui/button';
import { Datepicker } from '../../../ui/date';
import { ReactComponent as IconModalClose } from '../../../../assets/icons/modal_close.svg';
import './style.scoped.scss';

const Modal = compose(
  withThemeNormal,
  withZIndex,
)(ModalDesktop);

const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    borderRadius: 4,
    width: 20,
    height: 20,
    boxShadow: '0px 0px 5px rgba(19, 19, 19, 0.25)',
    backgroundColor: '#f5f8fa',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#E6BE00',
    '&:before': {
      display: 'block',
      width: 20,
      height: 20,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23000'/%3E%3C/svg%3E\")",
      content: '""',
    },
  },
});

const options = [{label: 'Значение 1', value: 'a'}, {label: 'Значение 2', value: 'b'}]

export const ModalDegree = ({visible, setVisible}) => {
  const classes = useStyles();

  return <React.Fragment>
  <Modal
  theme="normal"
  onClose={() => setVisible(false)}
  visible={visible}
  zIndexGroupLevel={2000}
  >
  <div className="modal__content">
    <div className="modal__close" onClick={() => setVisible(false)}><IconModalClose /></div>
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
        <Button title="Отправить" onClick={() => setVisible(false)} />
      </div>
    </div>
  </Modal>
</React.Fragment>
}