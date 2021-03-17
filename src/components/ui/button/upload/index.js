import React, { forwardRef } from 'react';
import { asUploadButton } from "@rpldy/upload-button";
import './style.scoped.scss'

import { ReactComponent as IconAttachment } from '../../../../assets/icons/attachment.svg';

export const Upload = asUploadButton(forwardRef((props, ref) => {
  console.log(ref)
       return (
        <React.Fragment>
          <div {...props}>
            <div className="d-flex align-items-center">
              <div className="button">
                <div className="icon"><IconAttachment /></div>
                Прикрепить файл*
              </div>
              <div className="extensions">*jpg, pdf, doc, docx</div>
            </div>
          </div>
        </React.Fragment>
        )
}));