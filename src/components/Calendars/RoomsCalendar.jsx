import React, { useState, useEffect } from 'react';
import Timeline from 'react-calendar-timeline';
import "@/app/lib/Timeline.css"
import moment from 'moment'; // Importe Moment.js

export default function RoomsCalendar({ rooms, bookings, setBookings }) {
  const [items, setItems] = useState([]);



//   useEffect(() => {


//     setItems(mappedItems);

//   }, [events]);

  function convertDateToMiliseconds(date) {
    var dateObj = new Date(date);

    var miliseconds = dateObj.getTime();

    return miliseconds;
  }

  useEffect(() => {
    const events = bookings.map(booking => ({
      id: booking.reservationID,
      group: booking.roomNumber,
      title: booking.guestNumber,
      start_time: convertDateToMiliseconds(booking.checkInDate),
      end_time: convertDateToMiliseconds(booking.checkOutDate),
    }));
    setItems(events);
  }, [bookings]);

  const groups = rooms.map(room => ({
      id: room.roomID,
      title: "" + room.label + " - " + room.roomtypes.desc,
  }))

  const handleItemMove = (itemId, dragTime, newGroupOrder) => {

    console.log(itemId)
    console.log(dragTime)
    console.log(newGroupOrder)
    console.log(groups[newGroupOrder].id)

    const updatedItems = items.map(item =>
      item.id === itemId ? { ...item, start_time: dragTime, end_time: dragTime + (item.end_time - item.start_time), group: groups[newGroupOrder].id } : item
    );

    setItems(updatedItems.map(item => ({
      id: item.id,
      title: item.title,
      group: item.group,
      start_time: item.start_time,
      end_time: item.end_time
    })));


    // setBookings(updatedItems.map(item => ({
    //   id: item.id,
    //   start: item.start_time,
    //   end: item.end_time
    // })));

    // console.log(items)

  };

  const handleItemResize = (itemId, time, edge) => {
    const updatedItems = items.map(item => {
      if (item.id === itemId) {
        return edge === "left"
          ? { ...item, start_time: time }
          : { ...item, end_time: time };
      }
      return item;
    });

    setItems(updatedItems.map(item => ({
      id: item.id,
      title: item.title,
      group: item.group,
      start_time: item.start_time,
      end_time: item.end_time
    })));
  };


  const handleCanvasDoubleClick = (groupId, time, e) => {
    const newEvent = {
      id: Math.random().toString(),
      group: groupId,
      title: 'New Event',
      start_time: time,
      end_time: time + (32 * 60 * 60 * 1000), // default duration 2 hours
    };
    const updatedItems = [...items, newEvent];
    setItems(updatedItems);
    setBookings(updatedItems.map(item => ({
      id: item.id,
      start: new Date(item.start_time),
      end: new Date(item.end_time)
    })));
  };

  const timelineGroups = (groups && groups.length > 0) ? groups : [{ id: 0, title: 'There are no rooms' }];


  return (
    <Timeline
      groups={timelineGroups}
      items={items}
      defaultTimeStart={new Date()}
      defaultTimeEnd={new Date().setHours(new Date().getHours() + 24)}
      canMove={true}
      canResize={"both"}
      onItemMove={handleItemMove}
      onItemResize={handleItemResize}
      // onCanvasDoubleClick={handleCanvasDoubleClick}
    />
  );
}
