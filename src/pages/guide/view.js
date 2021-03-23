import React from "react";
import { useParams } from "react-router-dom";
import "./style.scss";

export const GuideView = () => {
  const { category } = useParams();

  return <React.Fragment>{category}</React.Fragment>;
};
