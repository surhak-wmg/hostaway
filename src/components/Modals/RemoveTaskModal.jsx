import React, { memo, useCallback, useMemo } from 'react';
import Modal from 'react-modal';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import isEqual from 'react-fast-compare';
import ModalTitle from './ModalTitle';
import { SET_IS_OPEN_REMOVE_TASK_MODAL, SET_REMOVED, SET_REMOVED_TASK_ID } from '../../store/actions';
import { apiBaseUrl } from '../../helpers/constants';

const RemoveTaskModal = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    Modal.setAppElement('#root');

    const isOpenRemoveTaskModal = useSelector(state => state.isOpenRemoveTaskModal, isEqual);
    const removedTaskId = useSelector(state => state.removedTaskId, isEqual)

    const cancelModal = useCallback(() => {
        dispatch({ type: SET_REMOVED_TASK_ID, removedTaskId: null });
        dispatch({type: SET_IS_OPEN_REMOVE_TASK_MODAL, isOpenRemoveTaskModal: false });
    }, [dispatch]);

    const deleteTask = useCallback(async () => {
        try {
            await fetch(`${apiBaseUrl}tasks/${removedTaskId}`, {
                method: 'DELETE'
            });

            dispatch({ type: SET_IS_OPEN_REMOVE_TASK_MODAL, isOpenRemoveTaskModal: false });
            dispatch({ type: SET_REMOVED, removed: true });
        } catch (err) {
            // handle error
            console.log(err.message);
        }
    }, [removedTaskId, dispatch]);

    return useMemo(() => (
        <Modal isOpen={isOpenRemoveTaskModal} className={classes.portraitModal} overlayClassName={classes.portraitModalOverlay}>
            <div className={classes.portraitModalWrapper}>
                <ModalTitle modalTitle={'Discard unsaved changes'} closeType={SET_IS_OPEN_REMOVE_TASK_MODAL} actionType={isOpenRemoveTaskModal}/>
                <div className={classes.cancelModalBtns}>
                    <button className={classes.cancelBtn} onClick={cancelModal}>CANCEL</button>
                    <button className={classes.discardBtn} onClick={deleteTask}>OK</button>
                </div>
            </div>
        </Modal>
    ), [classes, cancelModal, deleteTask, isOpenRemoveTaskModal]);
};

const useStyles = createUseStyles({
    portraitModalWrapper: {
        display: 'flex',
        width: 280,
        height: 125,
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
        width: 340,
        height: 150,
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
    cancelModalBtns: {
        display: 'flex',
        justifyContent: 'flex-end',

        '& button': {
            cursor: 'pointer',
            borderRadius: 3,
            fontSize: 13,
            border: 'none',
            height: 36,

            '&:focus': {
                outline: 'none'
            }
        }
    },
    cancelBtn: {
        width: 82,
        backgroundColor: '#E7EAF3',
        marginRight: 10,
        color: '#2F4858',
    },
    discardBtn: {
        width: 49,
        color: '#ffffff',
        backgroundColor: '#0E6CC2',
    }
});

export default memo(RemoveTaskModal);
