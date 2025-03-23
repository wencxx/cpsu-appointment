import React from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useEffect } from "react";
import endpoint from "@/connection/connection";
import axios from "axios";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const localizer = momentLocalizer(moment);

function Calendar() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);

  const getRequests = async () => {
    try {
      const res = await axios.get(`${endpoint()}/pending-requests`);

      if (res.data !== "No requests found") {
        const mappRequest = res.data.map((req) => ({
            title: `Good moral request`,
            start: req.selectedDate,
            end: req.selectedDate,
            student: req.fullName,
            time: moment(req.selectedDate).format('LTS')
        }));

        setEvents((prev) => ([...prev, ...mappRequest]));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getApplications = async () => {
    try {
      const res = await axios.get(`${endpoint()}/pending-application`)

      if(res.data !== 'No applications found'){
        const mappRequest = res.data.map((req) => ({
            title: `student id card application`,
            start: req.scheduleDate,
            end: req.scheduleDate,
            student: req.fullName,
            time: moment(req.scheduleDate).format('LTS')
        }));

        setEvents((prev) => ([...prev, ...mappRequest]));
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getRequests();
    getApplications();
  }, []);

  const handleSelect = (event) => {
    const dateEvents = events
      .filter(e => moment(e.start).isSame(event.start, 'day'))
      .sort((a, b) => moment(a.time, 'LTS').diff(moment(b.time, 'LTS')));
    setSelectedDate(event.start);
    setSelectedEvents(dateEvents);
  };

  return (
    <>
      <h1 className="text-lg font-medium uppercase">Calendar</h1>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 700 }}
        defaultView="month"
        views={["month"]}
        onSelectEvent={handleSelect}
      />
      <Dialog open={!!selectedDate} onOpenChange={() => setSelectedDate(null)}>
        <DialogTrigger asChild>
          <button style={{ display: 'none' }}></button>
        </DialogTrigger>
        <DialogContent className='max-h-[90dvh] overflow-y-auto'>
          <DialogTitle>Events on {selectedDate && moment(selectedDate).format('MMMM Do YYYY')}</DialogTitle>
          <DialogDescription className='px-5'>
            <ol className="list-decimal space-y-2">
              {selectedEvents.map((event, index) => (
                <li key={index} className="text-gray-800 uppercase"><strong>Purpose:</strong> {event.title} <br/><strong>Name:</strong> {event.student}<br/><strong>Time:</strong> {event.time}</li>
              ))}
            </ol>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Calendar;
