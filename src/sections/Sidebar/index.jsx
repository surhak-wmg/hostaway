import React, { useMemo, memo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import logo from '../../assets/hostaway_logo.svg';
import sidebarData from './data';

const Sidebar = () => {
    const classes = useStyles();
    const [activeIndex, setActiveIndex] = useState(0);

    return useMemo(() => (
        <div className={classes.sidebar}>
            <img src={logo} alt={'logo'} className={classes.logoImg}/>
            <div className={classes.sidebarItems}>
                {sidebarData.map((item, index) => (
                    <div
                        key={`sidebar-icon-${item.id}`}
                        className={classes.sidebarItem}
                        style={{ background: activeIndex === index ? '#E7EAF3' : ''}}
                        onClick={() => setActiveIndex(index)}
                    >
                        <img
                            src={item.icon}
                            alt={'oval'}
                            className={classes.sidebarIcon}
                        />
                    </div>

                ))}
            </div>
        </div>
    ), [classes, activeIndex]);
};

const useStyles = createUseStyles({
    sidebar: {
        background: '#F8F9FC',
        height: '100vh',
        width: 60,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    sidebarItems: {
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 297px)',
        justifyContent: 'space-evenly',
        marginTop: 29,
    },
    sidebarItem: {
        width: 36,
        height: 36,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center'
    },
    logoImg: {
        width: 28,
        marginTop: 15
    },
    sidebarIcon: {
        width: 18,
    }
});

export default memo(Sidebar);
