import React, { memo, useCallback, useMemo, useState } from 'react';
import Modal from 'react-modal';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import isEqual from 'react-fast-compare';
import { SET_IS_OPEN_ADD_TASK_MODAL, SET_TASK_TITLE } from '../../store/actions';
import ModalTitle from './ModalTitle';

const NewTaskModal = ({ history }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    Modal.setAppElement('#root');

    const isOpenAddTaskModal = useSelector(state => state.isOpenAddTaskModal, isEqual);
    const [taskName, setTaskName] = useState('');

    const createTask = useCallback(() => {
        if (!taskName) {
            return;
        }

        dispatch({ type: SET_TASK_TITLE, taskTitle: taskName });
        dispatch({ type: SET_IS_OPEN_ADD_TASK_MODAL, isOpenAddTaskModal: false });

        history.replace('/add');
    }, [taskName, dispatch, history]);

    return useMemo(() => (
        <Modal isOpen={isOpenAddTaskModal} className={classes.portraitModal} overlayClassName={classes.portraitModalOverlay}>
            <div className={classes.portraitModalWrapper}>
                <ModalTitle modalTitle={'Create a new task'} closeType={SET_IS_OPEN_ADD_TASK_MODAL} actionType={isOpenAddTaskModal}/>
                <div className={classes.taskName}>
                    <p>Task name</p>
                    <input type={'text'} onChange={e => setTaskName(e.target.value)}/>
                </div>
                <div className={classes.createTask}>
                    <button className={classes.createTaskBtn} onClick={createTask}>CREATE TASK</button>
                </div>
            </div>
        </Modal>
    ), [classes, isOpenAddTaskModal, createTask]);
};

const useStyles = createUseStyles({
    portraitModalWrapper: {
        display: 'flex',
        width: 280,
        height: 125,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    portraitModalOverlay: {
        overflowX: 'hidden',
        overflowY: 'auto',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
    },
    portraitModal: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        margin: 'auto',
        width: 340,
        height: 180,
        border: '1px solid #EAECF4',
        boxShadow: '0px 0px 20px rgba(4, 75, 120, 0.1)',
        borderRadius: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        '&:focus': {
            outline: 'none'
        }
    },
    taskName: {
        height: 56,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',

        '& p': {
            fontSize: 14,
            color: '#788999',
            margin: 0,
            userSelect: 'none'
        },

        '& input': {
            border: '1px solid #E7EAF3',
            width: 271,
            height: 31,
            borderRadius: 2,
            fontSize: 20,
            paddingLeft: 6,
            color: '#31343A',

            '&:focus': {
                outline: 'none'
            }
        }
    },
    createTask: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    createTaskBtn: {
        width: 92,
        height: 18,
        backgroundColor: 'transparent',
        fontSize: 12,
        color: '#0E6CC2',
        cursor: 'pointer',
        textAlign: 'end',
        userSelect: 'none',
        border: 'none',

        '&:focus': {
            outline: 'none'
        }
    }
});

export default memo(NewTaskModal);
