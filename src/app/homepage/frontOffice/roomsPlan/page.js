"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoomsCalendar from '@/components/Calendars/RoomsCalendar';
import Loader from '@/components/Loader/Loader';

export default function Bookings() {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/api/v1/hotel/rooms");
      setRooms(res.data.response);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/api/v1/frontOffice/reservations");
      setBookings(res.data.response);
    };
    getData();

  }, []);

  return (
    <div className='h-screen'>
      {isClient ?
        <RoomsCalendar rooms={rooms} bookings={bookings} setBookings={setBookings} /> : <Loader />}
    </div>
  );
}


