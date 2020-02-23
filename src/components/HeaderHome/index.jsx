import React, { memo, useCallback, useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import plus from '../../assets/plus.svg';
import { useDispatch } from 'react-redux';
import { SET_IS_OPEN_ADD_TASK_MODAL } from '../../store/actions';

const HeaderHome = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const addTask = useCallback(() => {
        dispatch({ type: SET_IS_OPEN_ADD_TASK_MODAL, isOpenAddTaskModal: true });
    }, [dispatch]);

    return useMemo(() => (
        <div className={classes.headerHome}>
            <div className={classes.headerHomeTasks}>Tasks</div>
            <div className={classes.addTask} onClick={addTask}>
                <img className={classes.addTaskIcon} src={plus} alt={'plus'}/>
                <div className={classes.addTaskBtn}>ADD TASK</div>
            </div>
        </div>
    ), [classes, addTask]);
};

const useStyles = createUseStyles({
    headerHome: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 90,
    },
    headerHomeTasks: {
        fontSize: 34,
        color: '#31343A',
        userSelect: 'none'
    },
    addTask: {
        backgroundColor: '#0E6CC2',
        borderRadius: 3,
        width: 110,
        height: 36,
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        cursor: 'pointer'
    },
    addTaskIcon: {
        width: 18,
    },
    addTaskBtn: {
        fontSize: 13,
        color: '#ffffff',
        userSelect: 'none',
    }
});

export default memo(HeaderHome);
