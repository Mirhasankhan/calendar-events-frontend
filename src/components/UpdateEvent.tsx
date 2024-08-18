import { MdOutlineEdit } from "react-icons/md";
import { TEvent } from "./DeleteEvent";

const UpdateEvent = ({
  currentDate,
  eventId,
}: {
  currentDate: TEvent;
  eventId: string;
}) => {
  const handleUpdateEvent = async (dateId: string, eventId: string) => {
    const updatedEvent = {
      title: "updated",
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
        console.log(result.message);
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
        onClick={() => handleUpdateEvent(currentDate._id, eventId)}
      ></MdOutlineEdit>
    </div>
  );
};

export default UpdateEvent;
