import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { LoaderCircle, HomeIcon } from "lucide-react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Premium() {
  const [planDuration, setPlanDuration] = useState("Monthly");
  const [isPlusLoading, setIsPlusLoading] = useState(false);
  const [isPrimeLoading, setIsPrimeLoading] = useState(false);
  const [error, setError] = useState("");
  const user = useSelector((state) => state.user);

  const price = {
    free: 0,
    plus: planDuration === "Monthly" ? 50 : 300,
    prime: planDuration === "Monthly" ? 100 : 500,
  };

  const verifyPayment = async (razorRes) => {
    try {
      console.log(razorRes);
      const paymentDetail = await axios.post(
        BASE_URL + "/api/v1/payment/verify",
        {
          paymentId: razorRes.razorpay_payment_id,
          orderId: razorRes.razorpay_order_id,
        },
        {
          withCredentials: true,
        }
      );
      const data = paymentDetail.data.data;
      if (data.status === "captured") {
        toast.success(
          `Congratulation ${data.notes.firstName},You are ${data.notes.membershipType} Member`
        );
        window.location.reload();
        return;
      }

      toast.info(
        "Paymet has not been caputred if amount has been deducted please connect to our support team "
      );
      setError(
        "Paymet has not been caputred if an amount has been deducted please connect to our support team "
      );
    } catch (error) {
      toast.error(error.response.data?.message);
      setError(error.response.data?.message);
      console.log("Error: " + error);
    }
  };

  const handlePayNow = async (membershipType) => {
    try {
      membershipType === "plus"
        ? setIsPlusLoading(true)
        : setIsPrimeLoading(true);

      const order = await axios.post(
        BASE_URL + "/api/v1/payment/create/order",
        {
          membershipType,
          duration: planDuration,
        },
        { withCredentials: true }
      );
      // open razorpay checkout page dialog for payment
      const { keyId, amount, currency, orderId, notes } = order.data.data;
      const options = {
        key: keyId,
        amount,
        currency,
        name: "Let's Connect",
        description: "Let's Connect to other developer with premium pass",
        image: "https://example.com/your_logo",
        order_id: orderId,
        prefill: {
          name: notes?.firstName + (notes?.lastName ?? ""),
          email: notes?.emailId,
          number: 6343001349,
        },
        notes: {
          name: notes?.firstName + (notes?.lastName ?? ""),
          email: notes?.emailId,
        },
        theme: {
          color: "#3399cc",
        },
        handler: (response) => verifyPayment(response),
      };
      const rz = new window.Razorpay(options);
      // listen error (handle error if any from razorpay)
      rz.on("payment.failed", function (response) {
        toast.error(response.error.description);
        toast.error(response.error.source);
      });
      setIsPlusLoading(false);
      setIsPrimeLoading(false);
      rz.open();
    } catch (error) {
      setIsPlusLoading(false);
      setIsPrimeLoading(false);
      toast.error(error.message);
      console.error(error);
    }
  };
  return user.isPremium ? (
    <div className="flex flex-col items-center gap-8 p-6 md:p-12">
      <p className="text-neutral-300 text-center text-lg md:text-xl">
        You have already Plus Membership 😎
      </p>
      <Link to={"/"}>
        <button className="flex items-center gap-1.5 bg-blue-400 text-neutral-800 animate-bounce cursor-pointer rounded-full p-3 text-sm md:text-base shadow-md shadow-blue-300">
          <HomeIcon className="w-4 h-4" />
          <span>Home</span>
        </button>
      </Link>
    </div>
  ) : (
    <div className="p-4 md:p-8">
      <p className="text-xl text-yellow-400 text-center">{error}</p>
      <div className="flex justify-center my-6">
        <div className="bg-neutral-500 p-1 shadow-inner inline-block rounded-full">
          <button
            className={`${planDuration === "Monthly" ? "bg-blue-400 text-neutral-800 transition duration-500" : "bg-transparent "} rounded-full p-2 px-4 text-xs md:text-sm`}
            onClick={() => setPlanDuration("Monthly")}
          >
            Monthly
          </button>
          <button
            className={`${planDuration === "Yearly" ? "bg-blue-400 text-neutral-800  transition duration-500" : "bg-transparent "} rounded-full p-2 px-4 text-xs md:text-sm`}
            onClick={() => setPlanDuration("Yearly")}
          >
            Yearly
          </button>
        </div>
      </div>
      <p className="text-center mb-4 text-sm md:text-base text-neutral-400">
        100% Secure payment plan with money back guarantee
      </p>

      {/* card container */}
      <div className="flex flex-col items-center gap-y-6 md:flex-row md:flex-wrap md:justify-center md:gap-x-8 lg:flex-nowrap lg:gap-x-12">
        {/* free */}
        <div className="flex flex-col rounded-2xl bg-base-300 p-4 min-w-[300px] max-w-sm w-full md:w-auto border border-neutral-300 shadow-lg shadow-neutral-300">
          <h2 className="text-xl font-semibold mb-2">Connect</h2>
          <div className="h-0.5 bg-neutral-600 my-2"></div>
          <div className="flex flex-col gap-y-3 p-3 text-neutral-400">
            <div className="flex items-start">
              <span className="text-green-400">&#10003;</span>&nbsp;
              <span>Send and accept connection requests without limits</span>
            </div>
            <div className="flex items-start">
              <span className="text-green-400">&#10003;</span>&nbsp;
              <span>Create a standard profile to showcase your profession</span>
            </div>
            <div className="flex items-start">
              <span className="text-green-400">&#10003;</span>&nbsp;
              <span>Chat with your connections instantly</span>
            </div>
            <div className="flex items-start">
              <span className="text-green-400">&#10003;</span>&nbsp;
              <span>
                Use basic filters to find people by name or general interests
              </span>
            </div>
            <div className="flex items-start">
              <span className="text-green-400">&#10003;</span>&nbsp;
              <span>
                Share updates and engage with content on the public feed of
                let'sconnect
              </span>
            </div>
          </div>
          <div className="h-0.5 bg-neutral-600 my-2"></div>
          <div className="flex justify-start items-end mt-auto">
            <p className="text-2xl font-bold">
              <span>&#8377; {price.free}/</span>
              <span className="text-neutral-400 text-sm font-normal">
                {planDuration === "Monthly" ? "Month" : "Year"}
              </span>{" "}
            </p>
          </div>
        </div>

        {/* plus */}
        <div className="flex flex-col rounded-2xl bg-base-300 p-4 min-w-[300px] max-w-sm w-full md:w-auto border border-neutral-300 shadow-lg shadow-neutral-300">
          <h2 className="text-xl font-semibold mb-2">Connect Plus</h2>
          <div className="h-0.5 bg-neutral-600 my-2"></div>
          <div className="flex flex-col gap-y-3 p-3 text-neutral-400">
            <div className="flex items-start">
              <span className="text-green-400">&#10003;</span>&nbsp;
              <span>Browse and connect without interruption</span>
            </div>
            <div className="flex items-start">
              <span className="text-green-400">&#10003;</span>&nbsp;
              <span>
                See who viewed your profile and how many times your content was
                seen
              </span>
            </div>
            <div className="flex items-start">
              <span className="text-green-400">&#10003;</span>&nbsp;
              <span>
                Filter searches by location, industry, and skills to find the
                perfect connections
              </span>
            </div>
            <div className="flex items-start">
              <span className="text-green-400">&#10003;</span>&nbsp;
              <span>Get faster responses from our support team</span>
            </div>
            <div className="flex items-start">
              <span className="text-green-400">&#10003;</span>&nbsp;
              <span>Share high-resolution photos on your profile</span>
            </div>
          </div>
          <div className="h-0.5 bg-neutral-600 my-2"></div>
          <div className="flex justify-between items-center mt-auto">
            <p className="text-2xl font-bold">
              <span>&#8377; {price.plus}/</span>
              <span className="text-neutral-400 text-sm font-normal">
                {planDuration === "Monthly" ? "Month" : "Year"}
              </span>
            </p>
            <button
              className={`p-2 px-6 border min-w-18 text-neutral-800 rounded-full text-sm font-semibold hover:bg-blue-600 transition-colors ${isPlusLoading ? "bg-blue-200 hover:bg-cyan-100" : "bg-blue-500"}`}
              onClick={() => handlePayNow("plus")}
              disabled={isPlusLoading}
            >
              {isPlusLoading ? (
                <LoaderCircle className="animate-spin text-blue-400 mx-auto" />
              ) : (
                "Pay Now"
              )}
            </button>
          </div>
        </div>

        {/* prime */}
        <div className="flex flex-col rounded-2xl bg-base-300 p-4 min-w-[300px] max-w-sm w-full md:w-auto border border-neutral-300 shadow-lg shadow-neutral-300">
          <h2 className="text-xl font-semibold mb-2">ConnectPrime</h2>
          <div className="h-0.5 bg-neutral-600 my-2"></div>
          <div className="flex flex-col gap-y-3 p-3 text-neutral-400">
            <div className="flex items-start">
              <span className="text-green-400">&#10003;</span>&nbsp;
              <span>All Plus Features and more</span>
            </div>
            <div className="flex items-start">
              <span className="text-green-400">&#10003;</span>&nbsp;
              <span>
                Be the first to try out and give feedback on new tools
              </span>
            </div>
            <div className="flex items-start">
              <span className="text-green-400">&#10003;</span>&nbsp;
              <span>
                Get one-on-one chat sessions with a peer without any
                interruption
              </span>
            </div>
            <div className="flex items-start">
              <span className="text-green-400">&#10003;</span>&nbsp;
              <span>Get verified with a blue tick</span>
            </div>
            <div className="flex items-start">
              <span className="text-green-400">&#10003;</span>&nbsp;
              <span>Get popularity among developers</span>
            </div>
          </div>
          <div className="h-0.5 bg-neutral-600 my-2"></div>
          <div className="flex justify-between items-center mt-auto">
            <p className="text-2xl font-bold">
              <span>&#8377; {price.prime}/</span>
              <span className="text-neutral-400 text-sm font-normal">
                {planDuration === "Monthly" ? "Month" : "Year"}
              </span>
            </p>
            <button
              className={`p-2 px-6 border min-w-18 text-neutral-800 rounded-full text-sm font-semibold hover:bg-blue-600 transition-colors ${isPrimeLoading ? "bg-blue-200 hover:bg-cyan-100" : "bg-blue-500"}`}
              onClick={() => handlePayNow("prime")}
              disabled={isPrimeLoading}
            >
              {isPrimeLoading ? (
                <LoaderCircle className="animate-spin text-blue-400 mx-auto" />
              ) : (
                "Pay Now"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Premium;
