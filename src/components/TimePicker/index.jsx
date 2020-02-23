import React, { memo, useMemo } from 'react';
import DatePicker from 'react-datepicker/es';
import { createUseStyles } from 'react-jss';
import arrowDown from '../../assets/arrow_down.svg';

const TimePicker = ({ selectedDate, setDate }) => {
    const classes = useStyles();

    return useMemo(() => (
        <div className={classes.timePicker}>
            <DatePicker
                className={classes.timePickerInp}
                selected={selectedDate}
                onChange={date => setDate(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption={'Time'}
                dateFormat={'h:mm aa'}
            />
            <div className={classes.arrowIcon}>
                <img src={arrowDown} alt='arrow-down'/>
            </div>
        </div>
    ), [selectedDate, classes, setDate]);
};

const useStyles = createUseStyles({
    timePicker: {
        width: 150,
        height: 36,
        backgroundColor: '#ffffff',
        borderRadius: 3,
        border: '1px solid #E7EAF3',
        display: 'flex',
        alignItems: 'center',

        '& .react-datepicker__triangle': {
            display: 'none',
        },

        '& .react-datepicker__header--time': {
            display: 'none'
        },

        '& .react-datepicker': {
            width: 150,
            height: 253,
            boxShadow: '0px 0px 20px rgba(4, 75, 120, 0.1)',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E7EAF3',
            borderRadius: 3,
        },

        '& .react-datepicker__time-container ': {
            width: 150,
            height: 253,
        },

        '& .react-datepicker__time-box': {
            width: '150px !important',
            height: 253,
        },

        '& .react-datepicker__time-list': {
            height: '100% !important'
        },

        '& .react-datepicker__time-list-item--selected': {
            backgroundColor: '#F8F9FC !important',
            color: '#595959 !important',
            fontWeight: 'normal !important',
            border: '1px solid #E7EAF3',
            borderRadius: 3
        },

        '& .react-datepicker__time-list-item:hover': {
            backgroundColor: '#F8F9FC !important',
            color: '#595959 !important',
            fontWeight: 'normal !important',
            borderRadius: 3
        }
    },
    arrowIcon: {
        cursor: 'pointer',
        marginLeft: -36,
        width: 34,
        height: 36,
        borderRadius: '0px 2px 2px 0px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        '& img': {
            width: 10,
        }
    },
    timePickerInp: {
        width: 143,
        fontSize: 14,
        backgroundColor: 'transparent',
        borderRadius: 3,
        border: 'none',
        padding: '6px 0 6px 10px',
        cursor: 'pointer',
        zIndex: 100,
        color: '#2F4858',

        '&:focus': {
            outline: 'none'
        }
    }
});

export default memo(TimePicker);
