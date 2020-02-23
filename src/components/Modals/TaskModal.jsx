import React, { memo, useCallback, useMemo, useState } from 'react';
import Modal from 'react-modal';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import isEqual from 'react-fast-compare';
import pencil from '../../assets/pencil.svg';
import remove from '../../assets/remove.svg';
import close from '../../assets/close.svg';
import { SET_IS_OPEN_REMOVE_TASK_MODAL, SET_IS_OPEN_TASK_MODAL, SET_REMOVED } from '../../store/actions';
import { apiBaseUrl } from '../../helpers/constants';


const TaskModal = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    Modal.setAppElement('#root');

    const [text, setText] = useState('');

    const isOpenTaskModal = useSelector(state => state.isOpenTaskModal, isEqual);
    const activeTask = useSelector(state => state.activeTask, isEqual);

    const closeModal = useCallback(() => {
        dispatch({type: SET_IS_OPEN_TASK_MODAL, isOpenTaskModal: false})
    }, [dispatch]);

    const deleteTask = useCallback(async () => {
        try {
            await fetch(`${apiBaseUrl}tasks/${activeTask.id}`, {
                method: 'DELETE'
            });

            dispatch({ type: SET_IS_OPEN_REMOVE_TASK_MODAL, isOpenRemoveTaskModal: false });
            dispatch({type: SET_IS_OPEN_TASK_MODAL, isOpenTaskModal: false})
            dispatch({ type: SET_REMOVED, removed: true });
        } catch (err) {
            // handle error
            console.log(err.message);
        }
    }, [activeTask, dispatch]);

    return useMemo(() => activeTask && (
        <Modal isOpen={isOpenTaskModal} className={classes.portraitModal} overlayClassName={classes.portraitModalOverlay}>
            <div className={classes.portraitModalWrapper}>
                <div className={classes.titleAndIcons}>
                    <div className={classes.taskModalTitle}>{activeTask.task_title}</div>
                    <div className={classes.taskModalIcons}>
                        <img src={pencil} alt='pencil'/>
                        <img src={remove} alt='remove' onClick={deleteTask}/>
                        <img src={close} alt='close' onClick={closeModal}/>
                    </div>
                </div>
                <div className={classes.scheduleAndUser}>
                    <div>
                        <div className={classes.taskModalSchedule}>Schedule</div>
                        <div className={classes.taskModalDate}>{`${activeTask.start_at} - ${activeTask.due_at}`}</div>
                        <div className={classes.taskModalDescription}>Description</div>
                        <textarea className={classes.taskModalText} cols={'30'} rows={'10'} value={activeTask.text || text}
                            onChange={e => setText(e.target.value)}/>
                    </div>
                    <div>
                        <div className={classes.taskModalAssigned}>Assigned to</div>
                        <div className={classes.taskModalUser}>{activeTask.user}</div>
                    </div>
                </div>
            </div>
        </Modal>
    ), [classes, isOpenTaskModal, activeTask, closeModal, deleteTask, text]);
};

const useStyles = createUseStyles({
    portraitModalWrapper: {
        display: 'flex',
        width: 640,
        height: 182,
        flexDirection: 'column',
        justifyContent: 'space-around',
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
        width: 700,
        height: 240,
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
    titleAndIcons: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    taskModalTitle: {
        fontSize: 20,
        color: '#31343A',
        userSelect: 'none'
    },
    taskModalIcons: {
        width: 80,
        display: 'flex',
        justifyContent: 'space-around',

        '& img': {
            width: 15,
            cursor: 'pointer',
        }
    },
    scheduleAndUser: {
        display: 'flex'
    },
    taskModalSchedule: {
        fontSize: 14,
        color: '#788999',
        userSelect: 'none'
    },
    taskModalDate: {
        fontSize: 16,
        color: '#4E525D',
        userSelect: 'none'
    },
    taskModalDescription: {
        fontSize: 14,
        color: '#788999',
        userSelect: 'none'
    },
    taskModalText: {
        fontSize: 16,
        color: '#4E525D',
        resize: 'none',
        width: 469,
        height: 60,
        border: '1px solid #E7EAF3',
        borderRadius: 3,
    },
    taskModalAssigned: {
        fontSize: 14,
        color: '#788999',
        userSelect: 'none'
    },
    taskModalUser: {
        fontSize: 16,
        color: '#4E525D',
        userSelect: 'none'
    }
});

export default memo(TaskModal);
