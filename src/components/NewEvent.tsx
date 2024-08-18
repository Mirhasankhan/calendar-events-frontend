import { useState } from "react";
import { toast } from "sonner";
import { TEvent } from "./DeleteEvent";

const NewEvent = ({ currentDate }: { currentDate: TEvent }) => {
  const [eventType, setEventType] = useState("work");
  const [eventTitle, setEventTitle] = useState("");

  const addNewEvent = async (eventId: string) => {
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    const newEvent = {
      id: randomNumber,
      title: eventTitle,
      category: eventType,
    };
    try {
      const response = await fetch(
        `https://calendar-events-backend-ruby.vercel.app/api/v1/dates/${eventId}/addEvent`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ event: newEvent }),
        }
      );
      toast.success("Event Added Successfully");

      if (!response.ok) {
        toast.error("something went wrong");
      }

      const result = await response.json();
      console.log("Event updated successfully:", result);
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };
  return (
    <div>
      <button
        className="btn"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("my_modal_4")?.showModal();
        }}
      >
        Add Event
      </button>
      <dialog id="my_modal_4" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg"></h3>
          <form onSubmit={() => addNewEvent(currentDate._id)}>
            <input
              onChange={(e) => setEventTitle(e.target.value)}
              type="text"
              placeholder="Add Title"
              className="border-b-2 border-blue-400 outline-none p-1 w-full"
              id=""
            />
            <div className="flex gap-3 pt-3">
              <p
                onClick={() => setEventType("work")}
                className={`${
                  eventType == "work"
                    ? "bg-blue-200 text-blue-600 px-3 rounded-md"
                    : ""
                }`}
              >
                work
              </p>
              <p
                onClick={() => setEventType("personal")}
                className={`${
                  eventType == "personal"
                    ? "bg-blue-200 text-blue-600 px-3 rounded-md"
                    : ""
                }`}
              >
                personal
              </p>
            </div>
            <button
              className="bg-blue-500 mt-6 p-2 rounded-md text-white"
              type="submit"
            >
              Submit
            </button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default NewEvent;
