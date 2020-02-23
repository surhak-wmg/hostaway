import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import 'react-datepicker/dist/react-datepicker.css';
import Calendar from '../Calendar';
import TimePicker from '../TimePicker';
import { useDispatch, useSelector } from 'react-redux';
import isEqual from 'react-fast-compare';
import { apiBaseUrl } from '../../helpers/constants';
import { SET_SAVE_TASK, SET_SAVE_TASK_SUCCESS } from '../../store/actions';
import { months } from '../Calendar/data';

const Task = ({ selectedUser, history }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const saveTask = useSelector(state => state.saveTask, isEqual);
    const taskTitle = useSelector(state => state.taskTitle, isEqual);

    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [dueDate, setDueDate] = useState(new Date());
    const [dueTime, setDueTime] = useState(new Date());
    const [text, setText] = useState('');

    const postTask = useCallback(async () => {
        const startAt = `${startDate.getDate()} ${months[startDate.getMonth()]} ${startDate.getFullYear()} - ${startTime.getHours()}: ${startTime.getMinutes() || '00'}`;
        const dueAt = `${dueDate.getDate()} ${months[dueDate.getMonth()]} ${dueDate.getFullYear()} - ${dueTime.getHours()}: ${dueTime.getMinutes() || '00'}`;
        const userName = `${selectedUser.first_name} ${selectedUser.last_name}`;

        const task = {
            user: userName,
            user_id: selectedUser.id,
            start_at: startAt,
            due_at: dueAt,
            text,
            task_title: taskTitle,
        };

        try {
            await fetch(`${apiBaseUrl}tasks`, {
                method: 'POST',
                body: JSON.stringify({
                    ...task
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (err) {
            // handle error
            console.log(err.message);
        }

        dispatch({ type: SET_SAVE_TASK_SUCCESS, saveTaskSuccess: true });
    }, [selectedUser, startDate, startTime, dueDate, dueTime, text, taskTitle, dispatch]);

    useEffect(() => {
        if (!saveTask) {
            return;
        }

        postTask();
        history.replace('./');

        return () => {
            dispatch({ type: SET_SAVE_TASK, saveTask: false });
        };
    }, [saveTask, postTask, dispatch, history]);

    return useMemo(() => (
        <div className={classes.task}>
            <div className={classes.taskMain}>
                <div className={classes.schedule}>Schedule</div>
                <div className={classes.chooseTime}>
                    <div>
                        <div className={classes.dateName}>Starting Date</div>
                        <Calendar selectedDate={startDate} setDate={setStartDate}/>
                    </div>
                    <div>
                        <div className={classes.dateName}>Starting Time</div>
                        <TimePicker selectedDate={startTime} setDate={setStartTime}/>
                    </div>
                    <div>
                        <div className={classes.dateName}>Due Date</div>
                        <Calendar selectedDate={dueDate} setDate={setDueDate}/>
                    </div>
                    <div>
                        <div className={classes.dateName}>Due Time</div>
                        <TimePicker selectedDate={dueTime} setDate={setDueTime}/>
                    </div>
                </div>
                <div className={classes.details}>Details</div>
                <div className={classes.description}>Description</div>
                <textarea className={classes.text} cols={'30'} rows={'10'} onBlur={e => setText(e.target.value)}/>
            </div>
        </div>
    ), [classes, startDate, startTime, dueDate, dueTime]);
};

const useStyles = createUseStyles({
    task: {
        width: 'calc(100vw / 1.6)'
    },
    taskMain: {
        marginTop: 30,
        height: 327,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    chooseTime: {
        display: 'flex',
        justifyContent: 'space-between',
        width: 'calc(100vw / 1.8)'
    },
    schedule: {
        fontSize: 20,
        color: '#31343A',
        userSelect: 'none'
    },
    dateName: {
        fontSize: 14,
        color: '#788999',
        userSelect: 'none'
    },
    details: {
        fontSize: 20,
        color: '#31343A',
        userSelect: 'none'
    },
    description: {
        fontSize: 14,
        color: '#788999',
        userSelect: 'none'
    },
    text: {
        fontSize: 16,
        color: '#4E525D',
        width: 'calc(100vw / 1.8)',
        border: '1px solid #E7EAF3',
        borderRadius: 3,
        resize: 'none',
    }
});

export default memo(Task);
