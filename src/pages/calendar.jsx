import React from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function Calendar() {
    const events = [
        {
            title: 'Meeting',
            start: new Date(),
            end: new Date(moment().add(1, "hours").toDate()),
        },
    ];

    return ( 
        <>
            <h1 className="text-lg font-medium">Calendar</h1>
            <BigCalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                defaultView="week"
                views={['week']}
            />
        </>
     );
}

export default Calendar;