import React, { useMemo } from 'react';
import { Table } from '../../components/ui/table';


export const List = () => {

  const columns = useMemo(
    () => [
      {
        Header: 'ФИО сотрудника',
        accessor: 'OfferID',
      },
      {
        Header: 'Наименование',
        accessor: 'MemberID',
      },
      {
        Header: 'Вендор',
        accessor: 'InvestID',
      },
      {
        Header: 'Тип',
        accessor: 'Status',
      },
      {
        Header: 'Затраты',
        accessor: 'a',
      },
      {
        Header: 'Дата начала',
        accessor: 's',
      },
      {
        Header: 'Бессрочный',
        accessor: 'd',
      },
      {
        Header: 'Дата окончания',
        accessor: 'f',
      },
      {
        Header: 'Статус',
        accessor: 'g',
      },
    ],
    []
  );

  return <React.Fragment>
    <Table
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
        return { data: [], error: "" };
      }}
    />
  </React.Fragment>;
};