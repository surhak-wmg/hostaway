import React, { memo, useCallback, useMemo } from 'react';
import { useSortBy, useTable } from 'react-table';
import { useDispatch } from 'react-redux';
import {
    SET_ACTIVE_TASK,
    SET_IS_OPEN_REMOVE_TASK_MODAL,
    SET_IS_OPEN_TASK_MODAL, SET_REMOVED_TASK_ID
} from '../../store/actions';

const Table = ({ columns, data }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
        },
        useSortBy
    );

    const dispatch = useDispatch();

    const onClickCell = useCallback(cell => {
        // it's can be written with optional chaining
        if (cell && cell.column && cell.column.Cell && cell.column.Cell.props && cell.column.Cell.props.id === 'remove') {
            dispatch({ type: SET_REMOVED_TASK_ID, removedTaskId: cell.row.original.id });
            dispatch({ type: SET_IS_OPEN_REMOVE_TASK_MODAL, isOpenRemoveTaskModal: true });
        }

        dispatch({ type: SET_ACTIVE_TASK, activeTask: cell.row.original });
        dispatch({ type: SET_IS_OPEN_TASK_MODAL, isOpenTaskModal: true });
    }, [dispatch]);

    return useMemo(() => (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                        // Add the sorting props to control sorting. For this example
                        // we can add them into the header props
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                {column.render('Header')}
                                {/* Add a sort direction indicator */}
                                <span>
                                    {column.isSorted
                                        ? column.isSortedDesc
                                            ? ' 🔽'
                                            : ' 🔼'
                                        : ''}
                                </span>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(
                    (row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()} onClick={() => onClickCell(cell)}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    }
                )}
            </tbody>
        </table>
    ), [getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, onClickCell]);
};

export default memo(Table);
