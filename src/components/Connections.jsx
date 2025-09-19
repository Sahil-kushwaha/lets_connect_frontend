import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addConnections } from "../store/connectionsSlice";
import { LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connections);
  const [isLoading, setIsLoading] = useState(false);

  const fetchConnections = async () => {
    if (connections.length > 0) return;
    try {
      setIsLoading(true);
      const res = await axios.get(BASE_URL + "/api/v1/user/connections", {
        withCredentials: true,
      });

      if (res.data?.data) {
        dispatch(addConnections(res.data.data));
      }
      console.log(res.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  const captalizeFirst = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return isLoading ? (
    <div className="h-full flex justify-center items-center">
      <LoaderCircle className="animate-spin my-9" color="blue" />
    </div>
  ) : (
    <div className="flex flex-col items-center  overflow-hidden">
      <h1 className="font-semibold text-xl  md:text-2xl text-blue-400 gap-6">
        Connections
      </h1>
      <div className="flex gap-3 flex-col  m-6 ">
        {connections.length === 0 ? (
          <div className="text-neutral-400 text-xl flex gap-y-2">
            No Connection Found <span className="animate-bounce block">😔</span>
          </div>
        ) : (
          connections.map((connection) => (
            <div
              key={connection._id}
              className="flex justify-between gap-x-6  p-5  bg-base-300 rounded-3xl shadow shadow-neutral-500"
            >
              {/* user dp */}
              <div className="self-center-safe">
                <img
                  className=" max-w-15 max-h-15 md:max-w-20 md:max-h-20  lg:max-w-25 lg:max-h-25 rounded-full object-center"
                  src={connection.avatarUrl}
                  alt="DP"
                  loading="lazy"
                />
              </div>
              {/* user description */}
              <div className="text-[12px] lg:text-sm text-neutral-400 flex-1 ">
                <p className="text-blue-300">
                  {captalizeFirst(connection.firstName)}&nbsp;
                  {captalizeFirst(connection?.lastName)}
                </p>
                <p>{connection.age}</p>
                <p>{connection.about}</p>
                <p>{connection?.skills?.join(", ")}</p>
              </div>
              <div role="button" className="self-center">
                <Link
                  className="btn bg-green-500 hover:bg-green-700"
                  to={`/chat/${connection._id}`}
                >
                  Chat
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Connections;
