import React, { useMemo } from 'react';
import Table from '../../components/ui/table';


export const List = () => {

  const columns = useMemo(
    () => [
      {
        Header: 'OfferID',
        accessor: 'OfferID',
      },
      {
        Header: 'MemberID',
        accessor: 'MemberID',
      },
      {
        Header: 'InvestID',
        accessor: 'InvestID',
      },
      {
        Header: 'Status',
        accessor: 'Status',
      },
    ],
    []
  );

  return <React.Fragment><Table
    columns={columns}
    menuOptions={[
      {
        onSelect: (row) => {
        // history.push(`/manager/${path}/view/${row.original.OfferID}`);
        },
        label: 'View',
      },
      {
        onSelect: (row) => {},
        label: 'Remove',
      },
    ]}
    query={async () => {
    // try {
    //   const { data, error } = await ManagerOfferList();

      //   if (!error) {
      //     return { data: data.ManagerOfferList, error };
      //   }

    //   return { data: [], error };
    // } catch (err) {
    //   return { data: [], error: "NETWORK_ERROR" };
    // }
    }}
  /></React.Fragment>;
};