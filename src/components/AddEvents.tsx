import { useEffect, useState } from "react";
import DeleteEvent from "./DeleteEvent";
import NewEvent from "./NewEvent";
import UpdateEvent from "./UpdateEvent";

const AddEvents = ({ currentDate }: { currentDate: any }) => {
  const [date, setDate] = useState("");

  useEffect(() => {
    if (currentDate._id) {
      fetch(
        `https://calendar-events-backend-ruby.vercel.app/api/v1/dates/${currentDate._id}`
      )
        .then((res) => res.json())
        .then((data) => {
          setDate(data);
        });
    }
  }, [currentDate, date]);

  return (
    <div>
      <div>
        {currentDate?.number ? (
          <div>
            <h1 className="font-medium py-2">
              {currentDate.day}, {currentDate.number} August
            </h1>
            <div className="grid grid-cols-2 gap-4">
              {date["0"]?.events?.map((event: any) => (
                <div
                  key={event.id}
                  className="flex justify-between border rounded-md p-2 border-blue-500 text-blue-400 cursor-pointer"
                >
                  <div>
                    <p>{event.title}</p>
                    <p>{event.category}</p>
                  </div>
                  <div>
                    <DeleteEvent
                      currentDate={currentDate}
                      eventId={event.id}
                    ></DeleteEvent>
                    <UpdateEvent
                      currentDate={currentDate}
                      eventId={event.id}
                    ></UpdateEvent>
                  </div>
                </div>
              ))}
            </div>
            <NewEvent currentDate={currentDate}></NewEvent>
          </div>
        ) : (
          <p className="pt-6 font-medium">Click On Date To Add New Events</p>
        )}
      </div>
    </div>
  );
};

export default AddEvents;
