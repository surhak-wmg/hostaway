import React, { memo, useCallback, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import back from '../../assets/back.svg';
import { useDispatch, useSelector } from 'react-redux';
import isEqual from 'react-fast-compare';
import { SET_IS_OPEN_CANCEL_ADD_TASK_MODAL, SET_SAVE_TASK, SET_TASK_TITLE } from '../../store/actions';

const HeaderAdd = ({ history }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const taskTitle = useSelector(state => state.taskTitle, isEqual);
    const [taskName, setTaskName] = useState('');

    const backToTasks = useCallback(() => {
        history.replace('/');
    }, [history]);

    const onBlurTaskTitle = useCallback(() => {
        dispatch({ type: SET_TASK_TITLE, taskTitle: taskName });
    }, [taskName, dispatch]);

    const cancelAdd = useCallback(() => {
        dispatch({ type: SET_IS_OPEN_CANCEL_ADD_TASK_MODAL, isOpenCancelAddTaskModal: true });
    }, [dispatch]);

    const saveTask = useCallback(() => {
        dispatch({ type: SET_SAVE_TASK, saveTask: true });
    }, [dispatch]);

    return useMemo(() => (
        <div className={classes.headerAdd}>
            <div className={classes.backAndInp}>
                <div className={classes.back} onClick={backToTasks}>
                    <img src={back} alt={'back'}/>
                    <p>Back To Tasks</p>
                </div>
                <input
                    type={'text'} className={classes.taskTitleInp}
                    value={taskName || taskTitle}
                    onChange={e => setTaskName(e.target.value)}
                    onBlur={onBlurTaskTitle}
                />
            </div>
            <div className={classes.saveAndCancel}>
                <button className={classes.save} onClick={saveTask}>SAVE</button>
                <button className={classes.cancel} onClick={cancelAdd}>CANCEL</button>
            </div>
        </div>
    ), [classes, backToTasks, taskTitle, onBlurTaskTitle, taskName, cancelAdd, saveTask]);
};

const useStyles = createUseStyles({
    headerAdd: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 90,
    },
    taskTitleInp: {
        height: 44,
        width: 600,
        fontSize: 26,
        color: '#31343A',
        border: '1px solid #E7EAF3',
        paddingLeft: 12,

        '&::placeholder': {
            color: '#31343A',
        },

        '&:focus': {
            outline: 'none'
        }
    },
    backAndInp: {},
    back: {
        display: 'flex',
        justifyContent: 'space-evenly',
        width: 115,
        height: 28,
        alignItems: 'center',
        cursor: 'pointer',

        '& img': {
            width: 6
        },

        '& p': {
            fontSize: 14,
            userSelect: 'none',
            margin: 0,
        }
    },
    saveAndCancel: {
        width: 158,
        height: 36,
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 32,

        '& button': {
            fontSize: 13,
            borderRadius: 3,
            cursor: 'pointer',
            border: 'none',

            '&:focus': {
                outline: 'none'
            }
        }
    },
    save: {
        width: 63,
        color: '#ffffff',
        backgroundColor: '#19B385',
    },
    cancel: {
        width: 84,
        color: '#2F4858',
        backgroundColor: '#E7EAF3',
    }
});

export default memo(HeaderAdd);
