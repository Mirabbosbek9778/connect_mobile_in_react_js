import { useEffect, useState } from "react";
import Navbar from "../Navbar";

export default function Main() {
  const [data, setData] = useState("");
  const [geros, setGeros] = useState("");
  const [locat, setLocat] = useState({
    lat: 41,
    lng: 64,
  });
  const [show, setShow] = useState({
    lng: false,
    grc: false,
    time: false,
    lct: false,
  });

  const getLocationIos = () => {
    window?.webkit?.messageHandlers?.buttonPressed.postMessage("getLocation");
  };
  useEffect(() => {
    window.addEventListener("message", handleReceivedData);
    return () => {
      window.removeEventListener("message", handleReceivedData);
    };
  }, []);

  if (event?.data?.latitude || event?.data?.longitude) {
    setLocat({ ltd: event?.data?.latitude, lng: event?.data?.longitude });
    setShow({ ...show, lct: true });
  }

  const handleReceivedData = (event) => {
    const receivedData = event.data;
    console.log(receivedData);
    if (event?.data?.currentDateString)
      setData(receivedData?.currentDateString);
    setShow({ ...show, time: true });
  };
  useEffect(() => {
    const sendOrientationData = () => {
      var orientation = "";
      if (window.matchMedia("(orientation:landscape)").matches) {
        if (window.orientation === 90) {
          orientation = "landscapeleft";
          setGeros(orientation);
          setShow({ ...show, grc: true });
        } else {
          orientation = "landscapeRight";
          setGeros(orientation);
        }
      } else {
        orientation = "portrait";
        setGeros(orientation);
      }
    };
    window.addEventListener("orientationchange", sendOrientationData);
    return () => {
      window.removeEventListener("orientationchange", sendOrientationData);
    };
  }, []);

  const handleClick = () => {
    window?.webkit?.messageHandlers?.buttonPressed?.postMessage("getTime");
  };
  const handleClick2 = () => {
    window?.webkit?.messageHandlers?.buttonPressed.postMessage("close");
  };
  const sendDataToAndroid = () => {
    window?.JSBridge?.showMessageInNative("getTime");
  };
  const sendDataToAndroidClose = () => {
    window?.JSBridge?.showMessageInNative("close");
  };
  return (
    <>
      <div>
        <Navbar locat={locat} />
      </div>
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 p-5"></div>
      <div className="flex min-h-full  flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {/* {`Received message from mobile app: ${data}`} */}
        </h1>
        <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"></h1>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <button
              onClick={() => {
                handleClick();
                sendDataToAndroid();
              }}
              id="webButton"
              className=" mt-2 flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-lime-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              get Time
            </button>
            {show.time && <p>{data}</p>}
            <div>
              <button
                className="mt-2 flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-lime-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={getLocationIos}
              >
                getlocation
                {show.lct && <p>{locat}</p>}
              </button>
            </div>
          </div>
          <div>
            <button
              onClick={() => {
                handleClick2();
                sendDataToAndroidClose();
              }}
              id="webButton2"
              className="mt-2 flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-lime-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Close
            </button>
          </div>
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
          </p>
          {show.grc && <p>{geros}</p>}
        </div>
      </div>
    </>
  );
}
