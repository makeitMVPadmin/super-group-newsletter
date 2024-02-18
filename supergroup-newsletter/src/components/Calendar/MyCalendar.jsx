import React, { useState, useEffect  } from 'react';
import './MyCalendar.css'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useApiContext } from '../ApiContext/ApiContext';

const CustomToolbar = (toolbar) => {
  const { label } = toolbar;
  const goToPrevious = () => { toolbar.onNavigate('PREV') };
  const goToNext = () => { toolbar.onNavigate('NEXT') };

  return (
    <div className='calendarTitle'>
      <div className='calendar-arrow' onClick={goToPrevious}>{'<'}</div>
      {label}
      <div className='calendar-arrow' onClick={goToNext}>{'>'}</div>
    </div>
  );
};

const MyCalendar = () => {
  
  const localizer = momentLocalizer(moment);
  const events = []; // For future teams.
  const { selectedDate, setSelectedDate } = useApiContext();
  
  const dateCellWrapper = ({ value, children }) => {
    const isSameDay = selectedDate ? moment(value).isSame(selectedDate, 'day') : false;
    return React.cloneElement(children, {
      style: {
        ...(children.props.style || {}),
        backgroundColor: isSameDay ? `#0099ff` : null,
      }
    });
  };

  const handleSelectSlot = slotInfo => {
    setSelectedDate(slotInfo.start)
  };

  const handleSelectEvent = event => {
    // Future teams might want this code for handling events
  };
  
  return (
    <div className='calendarContainer'>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 450 }}
        views={['month']}
        components={{
          toolbar: CustomToolbar,
          dateCellWrapper: dateCellWrapper
        }}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
      />
      {/* Putting the Time Selection on the back burner. */}
      {/* <div>*** Space for Time Selection ***</div> */}
    </div>
  );
};

export default MyCalendar;
