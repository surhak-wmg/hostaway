import React, { useMemo, memo } from 'react';
import { createUseStyles } from 'react-jss';
import { Switch, Route, Redirect } from 'react-router-dom';
import MainAdd from '../../components/MainAdd';
import MainHome from '../../components/MainHome';

const Main = () => {
    const classes = useStyles();

    return useMemo(() => (
        <div className={classes.main}>
            <Switch>
                <Route exact path={'/'} component={MainHome}/>
                <Route path={'/add'} component={MainAdd}/>
                <Route path={'*'} component={() => <Redirect to={'/'}/>}/>
            </Switch>
        </div>
    ), [classes]);
};

const useStyles = createUseStyles({
    main: {
        display: 'flex',
        width: 'calc(100vw - 60px)',
        height: 'calc(100vh - 128px)'
    }
});

export default memo(Main);
