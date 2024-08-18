import { useEffect, useState } from "react";
import AddEvents from "./AddEvents";
// import AddEvent from "./AddEvent";

// type TDates = {
//   _id: string;
//   number: number;
// };

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
      <h1>this is the calendar</h1>
      <h1 className="font-medium py-4 text-xl">August 2024</h1>
      <div className="grid grid-cols-5 gap-6">
        <div className="col-span-3">
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
                className={`border text-center py-2 ${
                  date?.events?.length > 0 ? "bg-blue-300" : "bg-white"
                } hover:bg-gray-200`}
                key={date._id}
              >
                {date.number}
              </p>
            ))}
          </div>
        </div>
        <div className="col-span-2">
          <AddEvents currentDate={currentDate}></AddEvents>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
