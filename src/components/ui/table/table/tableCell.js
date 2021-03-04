import React from 'react';
import { Datetime as DatetimeComponent } from "../../date"
var classNames = require('classnames');

const Company = ({ row }) => {
  return (
    <React.Fragment>
      {row.original.company}
      <br />
      {row.original.department}
      <br />
      {row.original.team}
      <br />
      {row.original.type}
    </React.Fragment>
  );
};

const DeviceStatus = ({ cell: { value } }) => {
  return (
    <React.Fragment>
      <span
        className={classNames({
          status: true,
          in: value === true,
          out: value === false,
        })}
      >
        {value === true ? 'online' : 'offline'}
      </span>

      <style jsx>{`
        .status {
          padding: 4px 9px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 700;
          color: #fff;
        }
        .status.in {
          background: #05ab8e;
        }
        .status.out {
          background: #f73d34;
        }
      `}</style>
    </React.Fragment>
  );
};


const Status = ({ cell: { value } }) => {
  return (
    <React.Fragment>
      <span
        className={classNames({
          status: true,
          active: value == true,
          noactive: value == false,
        })}
      >
        {value === true ? 'Действует' : 'Истек'}
      </span>

      <style jsx>{`
        .status {
          font-size: 14px;
        }
        .status.active {
          color: #009A50;
        }
        .status.noactive {
          color: #f73d34;
        }
      `}</style>
    </React.Fragment>
  );
};

const Datetime = ({ cell: { value } }) => {
  return (
    <React.Fragment>
      <span className="date">
        <DatetimeComponent date={value} />
      </span>

      <style jsx>{`
        .date {
        }
      `}</style>
    </React.Fragment>
  );
};

export const TableCell = {
  Company,
  DeviceStatus,
  Status,
  Datetime
};
