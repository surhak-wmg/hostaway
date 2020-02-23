import React, { memo, useMemo, useState } from 'react';
import Task from '../Task';
import Users from '../Users';
import { createUseStyles } from 'react-jss';

const MainAdd = ({ history }) => {
    const classes = useStyles();
    const [selectedUser, setSelectedUser] = useState(null);

    return useMemo(() => (
        <div className={classes.mainAdd}>
            <Task selectedUser={selectedUser} history={history}/>
            <Users selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
        </div>
    ), [classes, selectedUser, history]);
};

const useStyles = createUseStyles({
    mainAdd: {
        padding: '17px 0 0 30px',
        display: 'flex',
        height: 'calc(100vh - 158px)'
    }
});

export default memo(MainAdd);
