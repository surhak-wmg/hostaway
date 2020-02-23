import React, { useMemo, memo, useCallback } from 'react';
import close from '../../assets/close.svg';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

const ModalTitle = ({ modalTitle, closeType, actionType }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const closeModal = useCallback(() => {
        dispatch({ type: closeType, [actionType]: false });
    }, [dispatch, closeType, actionType]);

    return useMemo(() => (
        <div className={classes.modalTitle}>
            <p>{modalTitle}</p>
            <img src={close} alt={'close'} onClick={closeModal}/>
        </div>
    ), [classes, closeModal, modalTitle]);
};

const useStyles = createUseStyles({
    modalTitle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 22,
        width: '100%',

        '& p': {
            fontSize: 20,
            userSelect: 'none',
            color: '#31343A',
            margin: 0,
        },
        '& img': {
            width: 14,
            cursor: 'pointer',
        }
    }
});
export default memo(ModalTitle);
