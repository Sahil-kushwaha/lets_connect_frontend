import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { addRequests, removeRequests } from "../store/requestsSlice";
import { LoaderCircle } from "lucide-react";
import { toast } from "react-toastify";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests);
  const [isLoading, setIsLoading] = useState(false);

  const fetchrequests = async () => {
    if (requests.length > 0) return;
    try {
      setIsLoading(true);
      const res = await axios.get(BASE_URL + "/api/v1/user/requests/received", {
        withCredentials: true,
      });

      if (res.data?.data) {
        dispatch(addRequests(res.data.data));
        console.log(res.data.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const toastId = useRef(null);
  const handleReject = async (id) => {
    try {
      toastId.current = toast(
        <span className="text-blue-500">Loading...</span>,
        { type: "info", autoClose: false, isLoading: true }
      );
      await axios.post(
        BASE_URL + "/api/v1/user/request/review/rejected/" + id,
        {},
        { withCredentials: true }
      );

      dispatch(removeRequests(id));
      toast.update(toastId.current, {
        render: "Rejected ",
        type: "success",
        autoClose: "3000",
        isLoading: false,
      });
    } catch (error) {
      console.error(error);
      toast.update(toastId.current, {
        render: error.message,
        type: "error",
        autoClose: 3000,
        isLoading: false,
      });
    }
  };
  const handleAccept = async (id) => {
    try {
      toastId.current = toast(
        <span className="text-pink-500">Loading...</span>,
        { type: "info", autoClose: false, isLoading: true }
      );
      await axios.post(
        BASE_URL + "/api/v1/user/request/review/accepted/" + id,
        {},
        { withCredentials: true }
      );

      dispatch(removeRequests(id));
      toast.update(toastId.current, {
        render: "Accepted ",
        type: "success",
        autoClose: "3000",
        isLoading: false,
      });
    } catch (error) {
      console.error(error);
      toast.update(toastId.current, {
        render: error.message,
        type: "error",
        autoClose: 3000,
        isLoading: false,
      });
    }
  };

  useEffect(() => {
    fetchrequests();
  }, []);

  const captalizeFirst = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
  return isLoading ? (
    <div className="h-full flex justify-center items-center">
      <LoaderCircle className="animate-spin my-9" color="blue" />
    </div>
  ) : (
    <div className="flex flex-col items-center">
      <h1 className="font-semibold text-2xl text-blue-400 gap-6">Requests</h1>
      <div className="flex gap-3 flex-col  m-6 ">
        {requests.length === 0 ? (
          <div className="text-neutral-400 text-xl flex gap-y-2">
            No Requests Found <span className="animate-bounce block">🧐</span>
          </div>
        ) : (
          requests.map((request) => (
            <div
              key={request.fromUserId._id}
              className="flex gap-x-6 justify-between  bg-base-300 rounded-3xl p-2 shadow shadow-neutral-500"
            >
              {/* user dp */}
              <div className="self-center">
                <img
                  className=" max-w-15 max-h-15 md:max-w-20 md:max-h-20  lg:max-w-25 lg:max-h-25 rounded-full object-center"
                  src={request.fromUserId.avatarUrl}
                  alt="DP"
                  loading="lazy"
                />
              </div>
              {/* user description */}
              <div className="text-[12px] self-center lg:text-sm text-neutral-400">
                <p className="text-blue-300">
                  {captalizeFirst(request.fromUserId.firstName)}&nbsp;
                  {captalizeFirst(request.fromUserId?.lastName)}
                </p>
                <p>{request.fromUserId?.age}</p>
                <p className="">{request.fromUserId?.about}</p>
                <p>{request.fromUserId?.skills?.join(", ")}</p>
              </div>
              <div className="flex flex-col gap-3 m-2 ">
                <button
                  className=" max-md:text-[12px]  btn text-neutral-200 bg-pink-500 hover:bg-pink-700 "
                  onClick={() => handleAccept(request._id)}
                >
                  Accept
                </button>
                <button
                  className="max-md:text-[12px]   btn text-neutral-200 bg-blue-500 hover:bg-blue-700"
                  onClick={() => handleReject(request._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Requests;
