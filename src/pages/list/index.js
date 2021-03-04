import React, { useMemo } from 'react';
import { Table } from '../../components/ui/table';
import { TableCell } from '../../components/ui/table';


export const List = () => {

  const columns = useMemo(
    () => [
      {
        Header: 'ФИО сотрудника',
        accessor: 'OfferID',
      },
      {
        Header: 'Наименование',
        accessor: 'title',
      },
      {
        Header: 'Вендор',
        accessor: 'vendor',
      },
      {
        Header: 'Тип',
        accessor: 'type',
      },
      {
        Header: 'Затраты',
        accessor: 'a',
      },
      {
        Header: 'Дата начала',
        accessor: 'validFrom',
        Cell: TableCell.Datetime,
      },
      {
        Header: 'Бессрочный',
        accessor: 'd',
      },
      {
        Header: 'Дата окончания',
        accessor: 'validTo',
        Cell: TableCell.Datetime,
      },
      {
        Header: 'Статус',
        accessor: 'status',
        Cell: TableCell.Status,
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