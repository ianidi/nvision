import React from 'react';
import {useDropzone} from 'react-dropzone';
import { ReactComponent as IconUpload } from '../../../../assets/icons/upload.svg';
import "./style.scoped.scss"

export const Dropzone = () => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({accept: 'image/*'});
  
  return (
      <div className="d__dropzone" {...getRootProps({isDragActive, isDragAccept, isDragReject})}>
        <input {...getInputProps()} />
        <IconUpload />
        <div className="d__dropzone__text">Добавьте сертификат или перетащите сюда скан документа (pdf, jpg, doc, docx)</div>
      </div>
  );
}