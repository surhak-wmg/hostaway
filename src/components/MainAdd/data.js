import React from 'react';
import pencil from '../../assets/pencil.svg';
import remove from '../../assets/remove.svg';

export const taskItems = [
    {
        id: 1,
        Header: 'Task name',
        accessor: 'task_title'
    },
    {
        id: 2,
        Header: 'Assignee',
        accessor: 'user',
    },
    {
        id: 3,
        Header: 'Starts at',
        accessor: 'start_at'
    },
    {
        id: 4,
        Header: 'Due at',
        accessor: 'due_at'
    },
    {
        id: 5,
        Header: '',
        Cell: (<img src={pencil} alt={'pencil'} width={18} id={'pencil'}/>)
    },
    {
        id: 6,
        Header: '',
        Cell: (<img src={remove} alt={'remove'} id={'remove'}/>)
    }
];
