import React, {useState} from "react";
import {
  //ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  //SortingState,
  useReactTable,
  
} from '@tanstack/react-table'

export function getGini(gini) {
  return gini[Object.keys(gini)[0]];
}

const GenCountriesTable = ({ data }) => {

  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnOrder, setColumnOrder] = useState([]);
  const [sorting, setSorting] = useState([])

  const columns = [
    {
      header: 'Country',
      id: 'countryGroup',
      columns: [
        { accessorKey: 'cca2',        header: 'cca2',       id: 'cca2'  },
        { accessorKey: 'cca3',        header: 'cca3',       id: 'cca3'  },
        { accessorKey: 'flag',        header: 'Flag',       id: 'flag'  },
        { 
          accessorFn: row => `${row.translations.fra.common}`,
          header: 'Country',
          id: 'country'
        },
        { accessorKey: 'capital',     header: 'Capital'                 }
      ]
    },
    {
      header: 'Region',
      id: 'region',
      columns: [
        { accessorKey: 'region',      header: 'Region'                  },
        { accessorKey: 'subregion',   header: 'Sub-Region'              },
        { accessorKey: 'independent', header: 'Indep.'                  }
      ]
    },
    {
      header: 'Data',
      id: 'data',
      columns: [
        { accessorKey: 'population',  header: 'Population'              },
        { accessorKey: 'area',        header: 'Area'                    },
        { 
          accessorFn: (row) => (row.gini ? row.gini[Object.keys(row.gini)[0]] : ''),
          header: 'Gini',
          id: 'gini'
        }
      ]
    },
    {
      header: 'Currency',
      id: 'currency',
      columns: [
        { 
          accessorFn: (row) => (row.currencies ? Object.keys(row.currencies)[0] : ''),
          header: 'Code',
          id: 'curCode'
        },
        { 
          accessorFn: (row) => (row.currencies ? row.currencies[Object.keys(row.currencies)[0]].symbol : ''),
          header: 'Symbol',
          id: 'curSymbol'
        },
        { 
          accessorFn: (row) => (row.currencies ? row.currencies[Object.keys(row.currencies)[0]].name : ''),
          header: 'Name',
          id: 'curName'
        },
      ]
    }
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
      columnOrder,
      sorting,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  return (
    <div className="w-100 p-2">
      {/* Display Columns' Selector  */}
      <div className="inline-block border border-black shadow rounded">
        <div className="px-1 border-b border-black">
          <label>
            <input
              {...{
                type: 'checkbox',
                checked: table.getIsAllColumnsVisible(),
                onChange: table.getToggleAllColumnsVisibilityHandler(),
              }}
            />{' '}
            Toggle All
          </label>
        </div>
        {table.getAllLeafColumns().map(column => {
          return (
            <div key={column.id} className="px-1">
              <label>
                <input
                  {...{
                    type: 'checkbox',
                    checked: column.getIsVisible(),
                    onChange: column.getToggleVisibilityHandler(),
                  }}
                />{' '}
                {column.columnDef.header}
              </label>
            </div>
          )
        })}
      </div>

      {/* Main Table */}
      <table className="w-100">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} colSpan={header.colSpan}>
                {header.isPlaceholder ? null : (
                  <div
                    {...{
                      className: header.column.getCanSort()
                        ? 'cursor-pointer select-none'
                        : '',
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: ' 🔼',
                      desc: ' 🔽',
                    }[header.column.getIsSorted()] ?? null}
                  </div>
                )}
              </th>
            ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {
            table
            .getRowModel()
            .rows
            .map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )
                })}
              </tr>
            ))
          }
        </tbody>
        <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
}

export default GenCountriesTable;
