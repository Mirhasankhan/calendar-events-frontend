import DeleteEvent from "./DeleteEvent";
import NewEvent from "./NewEvent";
import UpdateEvent from "./UpdateEvent";

const AddEvents = ({
  currentDate,
  setRefetch,
}: {
  currentDate: any;
  setRefetch: any;
}) => {
  return (
    <div>
      <div>
        {currentDate?.number ? (
          <div>
            <h1 className="font-medium py-2">
              {currentDate.day}, {currentDate.number} August
            </h1>
            <div className="grid grid-cols-2 gap-4">
              {currentDate?.events?.map((event: any) => (
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
            <NewEvent
              setRefetch={setRefetch}
              currentDate={currentDate}
            ></NewEvent>
          </div>
        ) : (
          <p className="pt-6 font-medium">Click On Date To Add New Events</p>
        )}
      </div>
    </div>
  );
};

export default AddEvents;
