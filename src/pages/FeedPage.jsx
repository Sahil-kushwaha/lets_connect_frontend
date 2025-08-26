import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useEffect, useRef } from "react";
import FeedProfileCard from "../components/FeedProfileCard";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeFeed } from "../store/feedSlice";
import { toast } from "react-toastify";

function FeedPage() {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);

  // const [isLoadeing, setIsLoading] = useState("false");

  const fetchFeeds = async () => {
    if (feed.length > 0) {
      return;
    }
    try {
      const res = await axios.get(BASE_URL + "/api/v1/user/feeds", {
        withCredentials: true,
      });
      // feed fetch from backend
      if (res.data?.data) {
        const feed = res.data.data;
        console.log(feed);
        dispatch(addFeed(feed));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toastId = useRef(null);

  const handleIgnore = async (id) => {
    try {
      toastId.current = toast(
        <span className="text-blue-500">Loading...</span>,
        { type: "info", autoClose: false, isLoading: true }
      );
      await axios.post(
        BASE_URL + "/api/v1/user/request/send/ignored/" + id,
        {},
        { withCredentials: true }
      );

      dispatch(removeFeed(id));
      toast.update(toastId.current, {
        render: "Done ",
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

  const handleInterest = async (id) => {
    try {
      toastId.current = toast(
        <span className="text-green-500">Loading...</span>,
        { type: "info", autoClose: false, isLoading: true }
      );
      await axios.post(
        BASE_URL + "/api/v1/user/request/send/interested/" + id,
        {},
        { withCredentials: true }
      );

      dispatch(removeFeed(id));
      toast.update(toastId.current, {
        render: "Done ",
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
    fetchFeeds();
  }, []);

  return feed.length <= 0 ? (
    <div className="text-neutral-400 text-xl flex justify-center my-5">
      No New User Found <span className="animate-pulse block">🔍</span>
    </div>
  ) : (
    <div className="flex flex-wrap gap-3 m-4 justify-center items-center relative">
      {feed.map((item) => (
        <div key={item._id}>
          <FeedProfileCard
            firstName={item.firstName}
            lastName={item.lastName}
            avatarUrl={item.avatarUrl}
            gender={item.gender}
            skills={item.skills}
            about={item.about}
            handleIgnore={() => handleIgnore(item._id)}
            handleInterest={() => handleInterest(item._id)}
            className={""}
          />
        </div>
      ))}
    </div>
  );
}

export default FeedPage;
