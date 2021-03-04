import React from "react";
import { format, fromUnixTime } from "date-fns";

export const Datetime = ({ date, unix }) => {
  let dateObj;

  if (unix) {
    dateObj = new Date(fromUnixTime(date));
  } else {
    dateObj = new Date(date);
  }

  return <div>{format(dateObj, "do LLLL yyyy HH:ii:ss")}</div>;
}