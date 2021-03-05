import React, { useMemo } from 'react';
import { Table } from '../../components/ui/table';
import { TableCell } from '../../components/ui/table';


export const List = () => {

  const columns = useMemo(
    () => [
      {
        Header: 'ФИО сотрудника',
        accessor: 'OfferID',
        disableSortBy: true,
      },
      {
        Header: 'Наименование',
        accessor: 'title',
        disableSortBy: true,
      },
      {
        Header: 'Вендор',
        accessor: 'vendor',
        disableSortBy: true,
      },
      {
        Header: 'Тип',
        accessor: 'type',
        disableSortBy: true,
      },
      {
        Header: 'Затраты',
        accessor: 'spendings',
      },
      {
        Header: 'Дата начала',
        accessor: 'validFrom',
        disableSortBy: true,
        Cell: TableCell.Datetime,
      },
      {
        Header: 'Дата окончания',
        accessor: 'validTo',
        disableSortBy: true,
        Cell: TableCell.Datetime,
      },
      {
        Header: 'Статус',
        accessor: 'status',
        disableSortBy: true,
        Cell: TableCell.Status,
      },
    ],
    []
  );

  return <React.Fragment>
    <Table
      columns={columns}
      // menuOptions={[
      //   {
      //     onSelect: (row) => {
      //       // history.push(`/manager/${path}/view/${row.original.OfferID}`);
      //     },
      //     label: 'View',
      //   },
      //   {
      //     onSelect: (row) => {},
      //     label: 'Remove',
      //   },
      // ]}
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
      checkbox
    />
  </React.Fragment>;
};