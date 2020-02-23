import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { apiBaseUrl } from '../../helpers/constants';
import { taskItems } from '../MainAdd/data';
import Table from '../Table';
import { useDispatch, useSelector } from 'react-redux';
import { SET_REMOVED } from '../../store/actions';
import Calendar from '../Calendar';

const MainHome = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(new Date());
    const [dueDate, setDueDate] = useState(new Date());
    const [tasks, setTasks] = useState(null);

    const removed = useSelector(state => state.removed);

    const getTasks = useCallback(async () => {
        let tasksFromApi;

        try {
            const getTasksFromApi = await fetch(`${apiBaseUrl}tasks`);
            tasksFromApi = await getTasksFromApi.json();
        } catch (err) {
            // handle error
            console.log(err.message);
        }

        if (!tasksFromApi) {
            // handle if no tasks
            return;
        }

        setTasks(tasksFromApi);
    }, []);

    useEffect(() => {
        getTasks();
    }, [getTasks]);

    useEffect(() => {
        if (!removed) {
            return;
        }

        dispatch({ type: SET_REMOVED, removed: false });
        getTasks();
    }, [removed, getTasks, dispatch]);

    return useMemo(() => tasks && (
        <>
            <div className={classes.dateAndAssignee}>
                <div>
                    <div className={classes.mainHomeTitle}>Assignee</div>
                    <div className={classes.selectUser}>No assignee selected</div>
                </div>
                <div>
                    <div className={classes.mainHomeTitle}>Starting Date</div>
                    <Calendar selectedDate={startDate} setDate={setStartDate}/>
                </div>
                <div>
                    <div className={classes.mainHomeTitle}>Due Date</div>
                    <Calendar selectedDate={dueDate} setDate={setDueDate}/>
                </div>
            </div>
            <div className={classes.mainHome}>
                <Table className={classes.mainHome} columns={taskItems} data={tasks}/>
            </div>
        </>
    ), [classes, tasks, dueDate, startDate]);
};

const useStyles = createUseStyles({
    mainHome: {
        width: 'calc(100vw / 1.3)',
        height: 454,
        left: 0,
        right: 0,
        margin: 'auto',
        marginTop: 130,
        textAlign: 'center',
        borderRadius: 3,
        border: '1px solid #E7EAF3',
        userSelect: 'none',

        '& table': {
            borderCollapse: 'collapse',
            width: '100%'
        },

        '& th': {
            fontSize: 12,
            color: '#2F4858',
            backgroundColor: '#E7EAF3',
            height: 50,
        },

        '& tr': {
            fontSize: 14,
            color: '#31343A',
            height: 55,
            cursor: 'pointer'
        },

        '& tr:nth-child(even)': {
            backgroundColor: '#E7EAF3'
        }
    },
    dateAndAssignee: {
        position: 'absolute',
        display: 'flex',
        width: 'calc(100vw / 1.3)',
        marginTop: 50,
        justifyContent: 'space-evenly',
        marginLeft: 25,
    },
    mainHomeTitle: {
        fontSize: 14,
        color: '#788999',
        userSelect: 'none'
    },
    selectUser: {
        width: 240,
        height: 36,
        border: '1px solid #E7EAF3',
        borderRadius: 3,
        color: '#788999',
        fontSize: 12,
        textAlign: 'center'
    }
});

export default memo(MainHome);
