import React, { useMemo, memo, Suspense } from 'react';
import Loader from './components/Loader';
import Header from './sections/Header';
import Sidebar from './sections/Sidebar';
import Main from './sections/Main';
import NewTaskModal from './components/Modals/NewTaskModal';
import CancelAddTaskModal from './components/Modals/CancelAddTaskModal';
import { createUseStyles } from 'react-jss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './styles/app.scss';
import RemoveTaskModal from './components/Modals/RemoveTaskModal';
import TaskModal from './components/Modals/TaskModal';

function App () {
    const classes = useStyles();

    return useMemo(() => (
        <Suspense fallback={Loader}>
            <div className={classes.app}>
                <Sidebar/>
                <div className={classes.sidebarAndMainSection}>
                    <Router>
                        <Header/>
                        <Main/>
                        <Route path={'/'} component={NewTaskModal}/>
                        <Route path={'/'} component={RemoveTaskModal}/>
                        <Route path={'/'} component={TaskModal} />
                        <Route path={'/add'} component={CancelAddTaskModal}/>
                    </Router>
                </div>
            </div>
        </Suspense>
    ), [classes]);
}

const useStyles = createUseStyles({
    app: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sidebarAndMainSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
});

export default memo(App);
