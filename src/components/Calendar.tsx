import { useEffect, useState } from "react";
import AddEvents from "./AddEvents";
import { IoCalendarNumberSharp } from "react-icons/io5";

const Calendar = () => {
  const [dates, setDates] = useState([]);
  const [currentDate, setCurrentDate] = useState([]);

  useEffect(() => {
    fetch("https://calendar-events-backend-ruby.vercel.app/api/v1/dates")
      .then((res) => res.json())
      .then((data) => {
        setDates(data);
      });
  }, []);

  const handleEvent = (day: any) => {
    setCurrentDate(day);
  };

  return (
    <div>
      <div className="flex gap-1 items-center my-6 border-b-2">
        <IoCalendarNumberSharp className="text-3xl" />
        <h1 className="font-medium">Calendar</h1>
        <h1 className="font-medium py-4 ml-24">August 2024</h1>
      </div>

      <div className="grid grid-cols-5 gap-6">
        <div className="md:col-span-3 col-span-5">
          <div className="grid grid-cols-7 text-center pb-1 font-medium">
            <h1>SUN</h1>
            <h1>MON</h1>
            <h1>TUE</h1>
            <h1>WED</h1>
            <h1>THU</h1>
            <h1>FRI</h1>
            <h1>SAT</h1>
          </div>
          <div className="grid grid-cols-7">
            {dates?.slice(0, 31).map((date: any) => (
              <p
                onClick={() => handleEvent(date)}
                className={`border text-center py-2 font-medium hover:cursor-pointer ${
                  date?.events?.length > 0
                    ? "bg-blue-300 text-white"
                    : "bg-white"
                } hover:bg-gray-200`}
                key={date._id}
              >
                {date.number}
              </p>
            ))}
          </div>
        </div>
        <div className="md:col-span-2 col-span-5">
          <AddEvents currentDate={currentDate}></AddEvents>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
