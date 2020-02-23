import React, { memo, useCallback, useMemo } from 'react';
import Modal from 'react-modal';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import isEqual from 'react-fast-compare';
import { SET_IS_OPEN_CANCEL_ADD_TASK_MODAL } from '../../store/actions';
import ModalTitle from './ModalTitle';

const CancelAddTaskModal = ({ history }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    Modal.setAppElement('#root');

    const isOpenCancelAddTaskModal = useSelector(state => state.isOpenCancelAddTaskModal, isEqual);

    const cancelModal = useCallback(() => {
        dispatch({type: SET_IS_OPEN_CANCEL_ADD_TASK_MODAL, isOpenCancelAddTaskModal: false });
    }, [dispatch]);

    const discardChanges = useCallback(() => {
        dispatch({ type: SET_IS_OPEN_CANCEL_ADD_TASK_MODAL, isOpenCancelAddTaskModal: false });
        history.replace('/');
    }, [history, dispatch]);

    return useMemo(() => (
        <Modal isOpen={isOpenCancelAddTaskModal} className={classes.portraitModal} overlayClassName={classes.portraitModalOverlay}>
            <div className={classes.portraitModalWrapper}>
                <ModalTitle modalTitle={'Discard unsaved changes'} closeType={SET_IS_OPEN_CANCEL_ADD_TASK_MODAL} actionType={isOpenCancelAddTaskModal}/>
                <div className={classes.cancelModalBtns}>
                    <button className={classes.cancelBtn} onClick={cancelModal}>CANCEL</button>
                    <button className={classes.discardBtn} onClick={discardChanges}>DISCARD</button>
                </div>
            </div>
        </Modal>
    ), [classes, isOpenCancelAddTaskModal, cancelModal, discardChanges]);
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
        height: 140,
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
        width: 80,
        backgroundColor: '#E7EAF3',
        marginRight: 10,
        color: '#2F4858',
    },
    discardBtn: {
        width: 82,
        color: '#ffffff',
        backgroundColor: '#0E6CC2',
    }
});

export default memo(CancelAddTaskModal);
