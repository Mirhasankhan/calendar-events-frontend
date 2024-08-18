import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "sonner";

export interface TEvent {
  _id: string;
  number: number;
  day: string;
  events?: Array<{
    title: string;
    number: number;
    id: string;
    category: string;
  }>;
}

const DeleteEvent = ({
  currentDate,
  eventId,
}: {
  currentDate: TEvent;
  eventId: string;
}) => {
  console.log(currentDate);
  const deleteEvent = async (dateId: string, eventId: string) => {
    try {
      const response = await fetch(
        `https://calendar-events-backend-ruby.vercel.app/api/v1/dates/${dateId}/events/${eventId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const result = await response.json();
        toast.success("event deleted");
        return result;
      } else {
        toast.error("Failed to delete event:");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };
  return (
    <div>
      <RiDeleteBin6Line
        onClick={() => deleteEvent(currentDate._id, eventId)}
      ></RiDeleteBin6Line>
    </div>
  );
};

export default DeleteEvent;
