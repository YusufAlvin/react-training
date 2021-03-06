import PropTypes from 'prop-types';
import { useTable, useSortBy } from 'react-table';
import './ReusableTable.scss';

const ReusableTable = ({ columns, data, onRowClick, selectedIndex }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
  );

  return (
    <table {...getTableProps()} className="reusable-table">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                style={column.headerStyle}
              >
                <span>{column.isSorted ? (column.isSortedDesc ? '🔽' : '🔼') : ''}</span>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              onClick={() => onRowClick(i)}
              className={selectedIndex === i ? 'selected' : ''}
            >
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

ReusableTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  onRowClick: PropTypes.func,
  selectedIndex: PropTypes.number,
};

ReusableTable.defaultProps = {
  columns: [],
  data: [],
  onRowClick: () => {},
  selectedIndex: null,
};

export default ReusableTable;
