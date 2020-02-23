import React, { useMemo, memo } from 'react';
import { createUseStyles } from 'react-jss';
import HeaderMain from '../../components/HeaderMain';
import { Switch, Route, Redirect } from 'react-router-dom';
import HeaderAdd from '../../components/HeaderAdd';
import HeaderHome from '../../components/HeaderHome';

const Header = () => {
    const classes = useStyles();

    return useMemo(() => (
        <div className={classes.header}>
            <HeaderMain/>
            <div className={classes.headerComponent}>
                <Switch>
                    <Route exact path={'/'} component={HeaderHome}/>
                    <Route path={'/add'} component={HeaderAdd}/>
                    <Route path={'*'} component={() => <Redirect to={'/'}/>}/>
                </Switch>
            </div>
        </div>
    ), [classes]);
};

const useStyles = createUseStyles({
    header: {
        width: 'calc(100vw - 60px)',
        height: 128,
    },
    headerComponent: {
        height: 90,
        borderBottom: '1px solid #EAECF4',
        padding: '4px 30px'
    }

});

export default memo(Header);
