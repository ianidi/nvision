import React, { forwardRef } from "react";
import { useItemFinishListener } from "@rpldy/uploady";
import { asUploadButton } from "@rpldy/upload-button";
import "./style.scoped.scss";

import { ReactComponent as IconAttachment } from "../../../../assets/icons/attachment.svg";

export const Upload = asUploadButton(
  forwardRef((props, ref) => {
    useItemFinishListener((item) => {
      // console.log(`item ${item.id} finished uploading, response was: `, item.uploadResponse, item.uploadStatus);
      props.onComplete(item.uploadResponse.data.file);
    });

    return (
      <React.Fragment>
        <div {...props}>
          <div className="d-flex align-items-center">
            <div className="u__button">
              <div className="u__icon">
                <IconAttachment />
              </div>
              Прикрепить файл*
            </div>
            <div className="u__extensions">*jpg, pdf, doc, docx</div>
          </div>
        </div>
      </React.Fragment>
    );
  })
);
