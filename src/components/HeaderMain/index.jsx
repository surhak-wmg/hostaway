import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import search from '../../assets/search.svg';
import headerData from '../../sections/Header/data';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import isEqual from 'react-fast-compare';
import { SET_ACTIVE_TASK, SET_IS_OPEN_TASK_MODAL, SET_SAVE_TASK_SUCCESS } from '../../store/actions';
import { apiBaseUrl } from '../../helpers/constants';

const HeaderMain = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const saveTaskSuccess = useSelector(state => state.saveTaskSuccess, isEqual);
    const [searchResult, setSearchResult] = useState('');
    const [showDropDown, setShowSearchDropDown] = useState(false);

    useEffect(() => {
        if (!saveTaskSuccess) {
            return;
        }

        setTimeout(() => {
            dispatch({ type: SET_SAVE_TASK_SUCCESS, saveTaskSuccess: false });
        }, 1500);
    }, [saveTaskSuccess, dispatch]);

    const onChangeSearch = useCallback(async e => {
        const searchItems = await fetch(`${apiBaseUrl}tasks?q=${e.target.value}`);
        const res = await searchItems.json();

        setSearchResult(res);
        setShowSearchDropDown(true);
    }, []);

    const openTask = useCallback(task => {
        dispatch({ type: SET_ACTIVE_TASK, activeTask: task })
        dispatch({ type: SET_IS_OPEN_TASK_MODAL, isOpenTaskModal: true });
    }, [dispatch]);

    return useMemo(() => (
        <div className={classes.headerMain}>
            <div className={classes.search}>
                <img src={search} alt={'search'} className={classes.searchIcon}/>
                <input className={classes.searchInp} type={'text'} placeholder={'Search...'} onChange={onChangeSearch}/>
                <div style={{display: showDropDown ? 'flex' : 'none'}} className={classes.searchResults}>
                    {searchResult && searchResult.map(task => (
                        <div key={`seatch-${task.id}`} className={classes.searchItem} onClick={() => openTask(task)}>{task.task_title}</div>
                    ))}
                </div>
            </div>
            <div className={classes.messageSuccess} hidden={!saveTaskSuccess}>Task added successfully</div>
            <div className={classes.headerItems}>
                {headerData.map(item => (
                    <img key={`header-icon-${item.id}`} src={item.icon} alt='oval' className={classes.headerIcon}/>
                ))}
            </div>
        </div>
    ), [classes, saveTaskSuccess, onChangeSearch, showDropDown, openTask, searchResult]);
};

const useStyles = createUseStyles({
    headerMain: {
        height: 38,
        display: 'flex',
        justifyContent: 'space-between',
        padding: '4px 30px'
    },
    search: {
        width: 200,
        borderBottom: '1px solid #E7EAF3',
        display: 'flex'
    },
    searchInp: {
        width: 188,
        border: 'none',
        fontSize: 14,
        color: '#2F4858',
        paddingLeft: 4,

        '&::placeholder': {
            color: '#2F4858'
        },

        '&:focus': {
            outline: 'none'
        }
    },
    searchIcon: {
        width: 12
    },
    headerItems: {
        display: 'flex',
        width: 178,
        justifyContent: 'space-around'
    },
    headerIcon: {
        width: 18,
        cursor: 'pointer'
    },
    messageSuccess: {
        width: 146,
        height: 24,
        textAlign: 'center',
        userSelect: 'none',
        fontSize: 12,
        color: '#FFFFFF',
        backgroundColor: '#19B385',
        borderRadius: 3,
    },
    searchResults: {
        position: 'absolute',
        flexDirection: 'column',
        backgroundColor: 'white',
        width: 200,
        height: 100,
        border: '1px solid #E7EAF3',
        borderRadius: 3,
        top: 50,
        padding: 20,
        zIndex: 3,
    },
    searchItem: {
        userSelect: 'none',
        color: '#2F4858',
        cursor: 'pointer',
        fontSize: 16,
    }
});

export default memo(HeaderMain);
