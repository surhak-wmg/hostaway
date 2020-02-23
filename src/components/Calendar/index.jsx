import React, { memo, useMemo } from 'react';
import DatePicker from 'react-datepicker/es';
import { createUseStyles } from 'react-jss';
import { months } from './data';
import arrowLeft from '../../assets/arrow_left.svg';
import arrowRight from '../../assets/arrow_right.svg';
import dateIcon from '../../assets/date.svg';

const Calendar = ({ selectedDate, setDate }) => {
    const classes = useStyles();

    return useMemo(() => (
        <div className={classes.datePickerMain}>
            <DatePicker
                renderCustomHeader={({
                    date,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled
                }) => (
                    <div className={classes.customCalendarHeader}>
                        <div className={classes.calendarTitle}>{months[date.getMonth()]} {date.getFullYear()}</div>
                        <div className={classes.calendarBtns}>
                            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled} className={classes.calendarBtn}>
                                <img src={arrowLeft} alt='arrow-left'/>
                            </button>
                            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled} className={classes.calendarBtn}>
                                <img src={arrowRight} alt='arrow-right'/>
                            </button>
                        </div>
                    </div>
                )}
                placeholderText={selectedDate}
                className={classes.datePicker}
                calendarClassName={classes.calendar}
                selected={selectedDate}
                dateFormat={'d MMMM, yyyy'}
                onChange={date => setDate(date)}
            />
            <div className={classes.dateIcon}>
                <img src={dateIcon} alt={'date-icon'}/>
            </div>
        </div>
    ), [classes, selectedDate, setDate]);
};

const useStyles = createUseStyles({
    customCalendarHeader: {
        margin: '0 0 10px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    datePickerMain: {
        width: 150,
        height: 36,
        backgroundColor: '#ffffff',
        borderRadius: 3,
        border: '1px solid #E7EAF3',
        display: 'flex',
        alignItems: 'center'
    },
    dateIcon: {
        cursor: 'pointer',
        marginLeft: -30,
        width: 34,
        height: 36,
        borderRadius: '0px 2px 2px 0px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F9FC'
    },
    datePicker: {
        width: 143,
        fontSize: 14,
        backgroundColor: 'transparent',
        borderRadius: 3,
        border: 'none',
        padding: '6px 0 6px 4px',
        cursor: 'pointer',
        zIndex: 100,
        color: '#2F4858',

        '&:focus': {
            outline: 'none'
        }
    },
    calendarTitle: {
        fontSize: 16,
        color: '#2F4858',
        userSelect: 'none',
    },
    calendar: {
        backgroundColor: '#FFFFFF',
        border: '1px solid #E7EAF3',
        borderRadius: 3,

        '& .react-datepicker__header': {
            backgroundColor: 'transparent',
            border: 'none',
        },

        '& .react-datepicker__triangle': {
            display: 'none'
        },

        '& .react-datepicker__day-name': {
            color: '#788999'
        },

        '& .react-datepicker__day--selected': {
            border: '1px solid #E7EAF3',
            backgroundColor: '#F8F9FC',
            borderRadius: 15,
            color: '#595959',
            fontWeight: 'normal'
        },

        '& .react-datepicker__day:hover': {
            backgroundColor: '#F8F9FC',
            borderRadius: 15,
            color: '#595959',
        }

    },
    calendarBtns: {
        width: 75,
        display: 'flex',
        justifyContent: 'space-between',
    },
    calendarBtn: {
        width: 35,
        height: 35,
        backgroundColor: '#F8F9FC',
        border: '1px solid #E7EAF3',
        borderRadius: 3,
        cursor: 'pointer'
    }
});

export default memo(Calendar);
