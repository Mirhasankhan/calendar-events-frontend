import { MdOutlineEdit } from "react-icons/md";
import { TEvent } from "./DeleteEvent";
import { useState } from "react";
import { toast } from "sonner";

const UpdateEvent = ({
  currentDate,
  eventId,
}: {
  currentDate: TEvent;
  eventId: string;
}) => {
  const [eventType, setEventType] = useState("");
  const [eventTitle, setEventTitle] = useState("");

  const handleUpdateEvent = async (dateId: string, eventId: string) => {
    const updatedEvent = {
      title: eventTitle,
      category: "personal",
    };
    try {
      const response = await fetch(
        `https://calendar-events-backend-ruby.vercel.app/api/v1/dates/${dateId}/events/${eventId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedEvent),
        }
      );

      if (response.ok) {
        const result = await response.json();
        toast.success("event updated successfully");
        return result;
      } else {
        console.error("Failed to update event:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };
  return (
    <div>
      <MdOutlineEdit
        onClick={(e) => {
          e.preventDefault();
          const dialog = document.getElementById(
            "my_modal_3"
          ) as HTMLDialogElement;
          dialog?.showModal();
        }}
      ></MdOutlineEdit>
      <dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg"></h3>
          <form
            method="dialog"
            onSubmit={() => {
              handleUpdateEvent(currentDate._id, eventId);
            }}
          >
            <input
              onChange={(e) => setEventTitle(e.target.value)}
              type="text"
              required
              placeholder="Add Title"
              className="border-b-2 border-blue-400 outline-none p-1 w-full"
            />
            <div className="flex gap-3 pt-3">
              <p
                onClick={() => setEventType("work")}
                className={`cursor-pointer ${
                  eventType === "work"
                    ? "bg-blue-200 text-blue-600 px-3 rounded-md"
                    : ""
                }`}
              >
                work
              </p>
              <p
                onClick={() => setEventType("personal")}
                className={`cursor-pointer ${
                  eventType === "personal"
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
              Save
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

export default UpdateEvent;
