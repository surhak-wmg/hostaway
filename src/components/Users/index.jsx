import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { apiBaseUrl } from '../../helpers/constants';
import arrowDown from '../../assets/arrow_down.svg';
import arrowUp from '../../assets/arrow_up.svg';
import check from '../../assets/check.svg';

const Users = ({ selectedUser, setSelectedUser }) => {
    const classes = useStyles();
    const [users, setUsers] = useState(null);
    const [visibilityDropDown, setVisibilityDropDown] = useState(true);

    const getUsers = useCallback(async () => {
        let usersFromApi;

        try {
            const getUsersFromApi = await fetch(`${apiBaseUrl}users`);
            usersFromApi = await getUsersFromApi.json();
        } catch (err) {
            // handle error
            console.log(err.message);
        }

        if (!usersFromApi) {
            // handle if no users
            return;
        }

        setUsers(usersFromApi);
        setSelectedUser(usersFromApi[0]);
    }, [setSelectedUser]);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    return useMemo(() => (
        <div className={classes.users}>
            <div className={classes.usersMain}>
                <p className={classes.usersTitle}>Users</p>
                <p className={classes.usersAssignee}>Assignee</p>
                <div className={classes.selectedUser} onClick={() => setVisibilityDropDown(!visibilityDropDown)}>
                    <p>{selectedUser && `${selectedUser.first_name} ${selectedUser.last_name}`}</p>
                    <img src={visibilityDropDown ? arrowDown : arrowUp} alt={'arrow_down'}/>
                </div>
                <div className={classes.usersDropDown} style={{display: visibilityDropDown ? 'none' : 'flex'}}>
                    {users && users.map(user => (
                        <div key={user.id} onClick={() => setSelectedUser(user)}>
                            <p>{`${user.first_name} ${user.last_name}`}</p>
                            {user && selectedUser && user.id === selectedUser.id && <img src={check} alt={'check'}/>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ), [classes, users, visibilityDropDown, selectedUser, setSelectedUser]);
};

const useStyles = createUseStyles({
    users: {
        width: 'calc(100vw / 2.65)',
        backgroundColor: '#F8F9FC',

        '& p': {
            userSelect: 'none',
            margin: 0,
        }
    },
    usersMain: {
        padding: '30px 30px',
    },
    usersTitle: {
        fontSize: 20,
        color: '#31343A',
    },
    usersAssignee: {
        fontSize: 14,
        color: '#788999',
        marginTop: '14px !important',
    },
    selectedUser: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 230,
        height: 36,
        backgroundColor: '#FFFFFF',
        borderRadius: 3,
        border: '1px solid #E7EAF3',
        cursor: 'pointer',
        marginTop: 2,
        paddingLeft: 50,

        '& p': {
            fontSize: 16,
            color: '#4E525D'
        },
        '& img': {
            userSelect: 'none',
            width: 10,
            marginRight: 20,
        }
    },
    usersDropDown: {
        width: 280,
        height: 180,
        backgroundColor: '#FFFFFF',
        borderRadius: 3,
        border: '1px solid #E7EAF3',
        marginTop: 10,
        flexDirection: 'column',
        justifyContent: 'space-around',

        '& div': {
            userSelect: 'none',
            marginLeft: 50,
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            color: '#4E525D',

            '& img': {
                width: 10,
                marginRight: 20,
            }
        }
    }
});
export default memo(Users);
