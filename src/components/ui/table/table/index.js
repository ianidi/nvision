import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-form';
import { useTable, useResizeColumns, useFlexLayout, useRowSelect, useSortBy, usePagination } from 'react-table';
import { Overlay } from 'react-bootstrap';
import TablePagination from '@material-ui/core/TablePagination';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import { Button } from '@yandex/ui/Button/desktop/bundle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Textinput } from '@yandex/ui/Textinput/desktop/bundle';
import Field from './field';
import Spinner from './spinner';
import makeData from './makeData';
var classNames = require('classnames');

const Styles = styled.div`
  /* padding: 1rem; */
  ${'' /* These styles are suggested for the table fill all available space in its containing element */}
  display: block;
  ${'' /* These styles are required for a horizontaly scrollable table overflow */}
  overflow: auto;
  border-radius: 10px;
  box-shadow: 0 0 16px 0 rgba(242, 242, 247, 1);
  background: #fff;

  .table {
    border-spacing: 0;
    position: relative;
    /* border: 1px solid #ebeef2; */
    background: #fff;

    .thead {
      ${'' /* These styles are required for a scrollable body to align with the header properly */}
      overflow-y: auto;
      overflow-x: hidden;
    }

    .table-head {
      padding-top: 18px;
      padding-bottom: 18px;
      padding-left: 8px;
      padding-right: 20px;
      /* border-top-left-radius: 6px; */
      /* border-top-right-radius: 6px; */
      /* background-color: #f7f8f9; */
      font-size: 14px;
      font-weight: 500;
      color: #4e4e4e;
      user-select: none;
      width: calc(100% + 40px);
    }

    .tr_head {
      :last-child {
        .td_head {
          border-bottom: 0;
        }
      }
      border-bottom: 0;
    }

    .tr_body {
      :last-child {
        .td_body {
          border-bottom: 0;
        }
      }
      border-bottom: 0;
    }

    .tr_body {
      position: relative;
      align-items: center;
      padding-top: 18px;
      padding-bottom: 18px;
      padding-left: 8px;
      padding-right: 20px;
      /* border-bottom: 1px solid #f1f2f4; */
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      -webkit-transition: box-shadow 250ms ease;
      transition: box-shadow 250ms ease;
      color: #555a61;
      font-size: 14px;
    }

    .tr_body:hover,
    .tr_body:focus,
    .tr_body:active {
      box-shadow: 0 1px 30px 1px #e4e9ef;
      z-index: 20;
    }

    .tr_body_highlighted {
      background: #f8fafc;
    }

    .th_head {
      align-items: center;
    }

    .th_head,
    .td_head {
      margin: 0;
      padding: 0.5rem;

      ${'' /* In this example we use an absolutely position resizer,
   so this is required. */}
      position: relative;

      :last-child {
        border-right: 0;
      }

      .resizer {
        display: none;
        right: 0;
        background: #eaeaea;
        width: 2px;
        height: 80%;
        transform: translateY(20%);
        position: absolute;
        top: 0;
        z-index: 1;
        ${'' /* prevents from scrolling while dragging on touch devices */}
        touch-action :none;

        &.isResizing {
          background: red;
        }
      }
    }

    .th_body,
    .td_body {
      margin: 0;
      padding: 0.5rem;

      ${'' /* In this example we use an absolutely position resizer,
   so this is required. */}
      position: relative;

      :last-child {
        border-right: 0;
      }

      .resizer {
        right: 0;
        background: blue;
        width: 10px;
        height: 100%;
        position: absolute;
        top: 0;
        z-index: 1;
        ${'' /* prevents from scrolling while dragging on touch devices */}
        touch-action :none;

        &.isResizing {
          background: red;
        }
      }
    }
    .th_control,
    td_control {
      padding-left: 0;
    }

    .table-bottom {
      display: flex;
      padding-top: 10px;
      padding-bottom: 10px;
      padding-left: 10px;
      padding-right: 24px;
      -webkit-box-pack: justify;
      -webkit-justify-content: space-between;
      -ms-flex-pack: justify;
      justify-content: space-between;
      -webkit-box-align: center;
      -webkit-align-items: center;
      -ms-flex-align: center;
      align-items: center;
      /* border-top-left-radius: 6px;
      border-top-right-radius: 6px; */
      color: #8a94a6;
      font-size: 14px;
    }

    .pagination {
      padding: 0.5rem;
    }
  }
  .tbody {
    width: calc(100% + 40px);
  }
`;

// .tbody {
//   ${"" /* These styles are required for a scrollable table body */}
//   overflow-y: scroll;
//   overflow-x: hidden;
// }

// Add the sorting props into the header props to control sorting
const headerProps = (props, { column }) => [...getStyles(props, column.align)]; //, column.getSortByToggleProps()

const cellProps = (props, { cell }) => getStyles(props, cell.column.align);

const getStyles = (props, align = 'left') => [
  props,
  {
    style: {
      justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
      // alignItems: "flex-start",
      display: 'flex',
    },
  },
];

const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = React.useRef();
  const resolvedRef = ref || defaultRef;

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <React.Fragment>
      <Checkbox
        style={{ padding: 0, marginRight: 10 }}
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'primary checkbox' }}
        ref={resolvedRef}
        indeterminate={indeterminate}
        {...rest}
      />
    </React.Fragment>
  );
});

const ITEM_HEIGHT = 64;

function DotMenu({ options, row }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (onSelect) => {
    onSelect(row);
    handleClose();
  };

  return (
    <div>
      <IconButton aria-label="more" aria-controls="long-menu" aria-haspopup="true" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={isOpen}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option, index) => (
          <MenuItem key={index} onClick={() => handleSelect(option.onSelect)}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

async function sendToFakeServer(values) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return values;
}

const Filter = ({ column }) => {
  const [show, setShow] = React.useState(false);
  const [target, setTarget] = React.useState(null);
  const ref = React.useRef(null);

  const {
    Form,
    meta: { isSubmitting, canSubmit },
  } = useForm({
    onSubmit: async (values, instance) => {
      await sendToFakeServer(values);
      console.log('Huzzah!');
    },
  });

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  return (
    <React.Fragment>
      <div ref={ref}>
        <div className="filter__icon" onClick={handleClick}>
          <svg width="13px" height="13px" viewBox="0 0 13 13" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="filter" transform="translate(0.000000, -1.000000)" fill="#E1E4E8" fillRule="nonzero">
                <path
                  d="M12.4400791,1.00000098 L0.560052952,1.00000098 C0.350389101,0.999614318 0.158296349,1.11380769 0.062514164,1.29566642 C-0.034589136,1.47997398 -0.0175464922,1.70191639 0.106507926,1.87024203 L4.45884921,7.8517315 C4.46030243,7.85379368 4.46188778,7.85572699 4.46334105,7.85778917 C4.62148067,8.06606961 4.70709012,8.31842922 4.70748646,8.57761977 L4.70748646,13.4542949 C4.70656165,13.5986477 4.76469152,13.7374584 4.86892896,13.8399231 C4.97329847,13.942259 5.11518818,14 5.26315511,14 C5.33832758,13.9998711 5.41283949,13.9853069 5.48233109,13.9570809 L7.9280129,13.0474005 C8.14705682,12.9820552 8.29251357,12.7803479 8.29251357,12.5375259 L8.29251357,8.57761977 C8.29290991,8.31842922 8.37851935,8.06606961 8.53652689,7.85778917 C8.5379801,7.85572699 8.5395655,7.85379368 8.54101872,7.8517315 L12.8934922,1.87011315 C13.0175465,1.70191639 13.0345891,1.48010285 12.9374859,1.2957953 C12.8418358,1.11380769 12.6496109,0.999614318 12.4400791,1.00000098 Z"
                  id="Path"
                ></path>
              </g>
            </g>
          </svg>
        </div>

        <Overlay
          show={show}
          target={target}
          rootClose={true}
          rootCloseEvent="click"
          placement="bottom"
          container={ref.current}
          containerPadding={40}
          onHide={() => {}}
        >
          <div className="filter">
            <div className="d-flex align-items-center justify-content-between filter__head">
              <div className="filter__title">{column.Header} filter</div>
              <div className="filter__reset">Reset filter</div>
            </div>

            <Form>
              <div className="d-flex flex-column form">
                <div className="field">
                  <Field.Input field="Filter" label={`Filter by ${column.Header}`} />
                </div>

                <div className="button">
                  <Button disabled={!canSubmit} type="submit" view="default" size="l" width="max">
                    <div className="button__title">Filter</div>
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </Overlay>
      </div>

      <style jsx>{`
        .filter__head {
          margin-bottom: 30px;
        }
        .filter__icon {
          margin-left: 10px;
          cursor: pointer;
        }
        .filter {
          z-index: 100;
          min-width: 320px;
          padding: 24px 24px 24px;
          border-radius: 4px;
          background: #fff;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 40px;
          margin-top: 26px;
          opacity: 1;
          visibility: visible;
          transition-timing-function: ease;
          transition-duration: 0.2s;
          transition-property: opacity, visibility;
        }
        .filter__title {
          font-size: 20px;
          font-weight: 600;
          color: #000;
        }
        .filter__reset {
          font-size: 14px;
          font-weight: 400;
          color: #60686c;
          cursor: pointer;
        }
      `}</style>
    </React.Fragment>
  );
};

function TableComponent({ columns, data, fetchData, loading, pageCount: controlledPageCount, checkbox, menuOptions }) {
  const defaultColumn = React.useMemo(
    () => ({
      // When using the useFlexLayout:
      minWidth: 30, // minWidth is only used as a limit for resizing
      width: 130, // width is used for both the flex-basis and flex-grow
      maxWidth: 200, // maxWidth is only used as a limit for resizing
    }),
    []
  );

  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,

    // getTableBodyProps,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // Get the state from the instance
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageIndex: 0 }, // Pass our hoisted table state
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: controlledPageCount,
    },
    useResizeColumns,
    useFlexLayout,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      // Let's make a column for selection
      if (checkbox) {
        hooks.allColumns.push((columns) => [
          {
            id: 'selection',
            disableResizing: true,
            minWidth: 45,
            width: 45,
            maxWidth: 45,
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ]);
        hooks.useInstanceBeforeDimensions.push(({ headerGroups }) => {
          // fix the parent group of the selection button to not be resizable
          const selectionGroupHeader = headerGroups[0].headers[0];
          selectionGroupHeader.canResize = false;
        });
      }

      if (menuOptions) {
        //Dot menu
        hooks.allColumns.push((columns) => [
          {
            id: 'dotmenu',
            disableResizing: true,
            minWidth: 64,
            width: 64,
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllRowsSelectedProps }) => <div></div>,
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => (
              <div>
                <DotMenu options={menuOptions} row={row} />
              </div>
            ),
          },
          ...columns,
        ]);
        hooks.useInstanceBeforeDimensions.push(({ headerGroups }) => {
          // fix the parent group of the selection button to not be resizable
          const selectionGroupHeader = headerGroups[0].headers[0];
          selectionGroupHeader.canResize = false;
        });
      }
    }
  );

  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  return (
    <React.Fragment>
      <div {...getTableProps()} className="table">
        <div className="table-head">
          {headerGroups.map((headerGroup) => (
            <div
              {...headerGroup.getHeaderGroupProps({
                // style: { paddingRight: '15px' },
              })}
              className="tr_head"
            >
              {headerGroup.headers.map((column) => (
                <div
                  {...column.getHeaderProps(headerProps)}
                  className={classNames({
                    th_head: true,
                    th_control: column.id === 'dotmenu' || column.id === 'selection',
                  })}
                >
                  {column.render('Header')}

                  {column.id !== 'dotmenu' && column.id !== 'selection' && column.disableSortBy !== true && (
                    <div className="d-flex align-items-center">
                      <Filter column={column} />
                      <div onClick={() => column.toggleSortBy(column.isSortedDesc === false)}>
                        <svg
                          className={classNames({
                            table__sort: true,
                            table__sort_desc: column.isSortedDesc,
                            table__sort_asc: column.isSortedDesc === false,
                          })}
                          width="10px"
                          height="14px"
                          viewBox="0 0 10 14"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g transform="translate(-142.000000, -302.000000)">
                              <g transform="translate(142.000000, 302.000000)">
                                <polygon className="table__sort_desc" fill="#E1E4E8" points="5 0 10 6 0 6"></polygon>
                                <polygon
                                  className="table__sort_asc"
                                  fill="#E1E4E8"
                                  transform="translate(5.000000, 11.000000) scale(1, -1) translate(-5.000000, -11.000000) "
                                  points="5 8 10 14 0 14"
                                ></polygon>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Use column.getResizerProps to hook up the events correctly */}
                  {column.canResize && <div {...column.getResizerProps()} className={`resizer ${column.isResizing ? 'isResizing' : ''}`} />}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="tbody">
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <div
                {...row.getRowProps()}
                className={classNames({
                  tr_body: true,
                  tr_body_highlighted: index % 2 == 0,
                })}
              >
                {row.cells.map((cell) => {
                  return (
                    <div
                      {...cell.getCellProps(cellProps)}
                      className={classNames({ td_body: true, td_control: cell.column.id === 'dotmenu' || cell.column.id === 'selection' })}
                    >
                      {cell.render('Cell')}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="table-bottom">
          <div>
            {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
            <div className="pagination d-flex align-items-center">
              <TablePagination
                component="div"
                count={pageOptions.length}
                page={page.length}
                onChangePage={(e, newPage) => gotoPage(newPage)}
                rowsPerPage={pageSize}
                onChangeRowsPerPage={(e) => {
                  const newPage = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(newPage);
                }}
              />
              <Textinput
                size="s"
                view="default"
                // value={pageIndex + 1}
                onChange={(e) => {
                  const newPage = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(newPage);
                }}
                placeholder="Go to page"
                style={{ width: '150px', marginLeft: 6, marginRight: 6 }}
              />
            </div>
          </div>
          <div>
            <Spinner color="black" loading={loading} />
          </div>

          <div>
            {page.length > 0 && (
              <React.Fragment>
                Showing {page.length} of {controlledPageCount * pageSize} results
              </React.Fragment>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        // TODO:
        .table__sort {
          display: none;
          margin-left: 4px;
          cursor: pointer;
        }

        .table__sort.table__sort_desc .table__sort_desc {
          fill: #051d39;
        }

        .table__sort.table__sort_asc .table__sort_asc {
          fill: #051d39;
        }

        .table-row-link {
          color: #3d7ab6;
          cursor: pointer;
        }

        .table-row-link:hover {
          color: #369;
        }

        .table-row-status-pending {
          color: #007ebd;
        }

        .table-row-status-complete {
          color: #28bb87; /*#50a92f*/
        }

        .table-row-status-declined {
          color: #f25a71;
        }

        .table-row-number {
          color: #8a94a6;
        }

        .table-row:hover .table-row-number {
          color: #0377e7;
        }

        .table-row:focus .table-row-number {
          color: #0377e7;
        }

        .table-row:active .table-row-number {
          color: #0377e7;
        }
      `}</style>
    </React.Fragment>
  );
}

// Let's simulate a large dataset on the server (outside of our component)
const serverData = makeData(10000);

export const Table = ({ columns, checkbox, menuOptions, query }) => {
  const columnsMemo = React.useMemo(() => columns, []);

  // const data = React.useMemo(() => makeData(20), []);

  // We'll start our table without any data
  const [data, setData] = React.useState([]);
  const [queryError, setQueryError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const fetchIdRef = React.useRef(0);

  const fetchData = React.useCallback(async ({ pageSize, pageIndex }) => {
    // This will get called when the table needs new data
    // You could fetch your data from literally anywhere,
    // even a server. But for this example, we'll just fake it.

    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current;

    if (query) {
      setLoading(true);

      const { data, error } = await query();

      setLoading(false);

      if (error) {
        setQueryError(error);
        return;
      }

      setData(data);
    }

    // // We'll even set a delay to simulate a server here
    // setTimeout(() => {
    //   // Only update the data if this is the latest fetch
    //   if (fetchId === fetchIdRef.current) {
    //     const startRow = pageSize * pageIndex;
    //     const endRow = startRow + pageSize;
    //     setData(serverData.slice(startRow, endRow));

    //     // Your server could send back total page count.
    //     // For now we'll just fake it, too
    //     setPageCount(Math.ceil(serverData.length / pageSize));

    //     setLoading(false);
    //   }
    // }, 1000);
  }, []);

  return (
    <Styles>
      <TableComponent
        columns={columnsMemo}
        data={data}
        fetchData={fetchData}
        loading={loading}
        pageCount={pageCount}
        checkbox={checkbox}
        menuOptions={menuOptions}
      />
    </Styles>
  );
};

// <Select
//               baseline
//               size="s"
//               view="default"
//               onChange={(e) => setPageSize(Number(e.target.value))}
//               value={pageSize}
//               options={[10, 20, 30, 40, 50].map((pageSize) => {
//                 return { value: pageSize, content: `${pageSize}` };
//               })}
//               style={{ marginLeft: 4, marginRight: 4 }}
//             />
