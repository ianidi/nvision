import React from "react";

export const Spinner = ({ loading, color, size }) => {

    if (!color) {
      color = "#fff";
    }

    if (!size) {
      size = 30;
    }

    if (loading !== true) {
      return null;
    }

    return (
      <React.Fragment>
        <div className="spinner-container">
          <div className="spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>

        <style jsx>{`
          .spinner-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: ${size}px;
            height: ${size}px;
          }
          .spinner {
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            width: ${size}px;
            height: ${size}px;
          }
          .spinner div {
            box-sizing: border-box;
            display: block;
            position: absolute;
            width: ${size - 8}px;
            height: ${size - 8}px;
            border: 2px solid ${color};
            border-radius: 50%;
            animation: spinner 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
            border-color: ${color} transparent transparent transparent;
          }
          .spinner div:nth-child(1) {
            animation-delay: -0.45s;
          }
          .spinner div:nth-child(2) {
            animation-delay: -0.3s;
          }
          .spinner div:nth-child(3) {
            animation-delay: -0.15s;
          }
          @keyframes spinner {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </React.Fragment>
    );
  }
