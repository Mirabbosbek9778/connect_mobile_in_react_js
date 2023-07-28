import { useEffect, useState } from "react";
import Close from "./funct";
// import Navbar from "../Navbar";

export default function Main() {
  const [data, setData] = useState("");
  const [geros, setGeros] = useState();
  const [sslika, setSsilka] = useState();
  const [lan, setlan] = useState();
  const [lct, setlct] = useState({ lng: "", ltd: "" });
  // const [locat, setLocat] = useState({
  //   lat: 41,
  //   lng: 64,
  // });
  // const [show, setShow] = useState({
  //   lng: false,
  //   grc: false,
  //   time: false,
  //   lct: false,
  // });
  const getLocationIos = () => {
    window?.webkit?.messageHandlers?.buttonPressed.postMessage("getLocation");
  };
  useEffect(() => {
    window.addEventListener("message", handleReceivedData);
    return () => {
      window.removeEventListener("message", handleReceivedData);
    };
  }, []);

  const handleReceivedData = (event) => {
    const receivedData = event.data;
    // console.log(receivedData);
    if (event?.data?.code) {
      // console.log(receivedData?.code);
      setSsilka(receivedData?.code);
    }
    if (event?.data?.currentDateString) {
      setData(receivedData?.currentDateString);
    }
    if (receivedData?.latitude || receivedData?.longitude) {
      setlct({ ltd: receivedData.latitude, lng: receivedData.longitude });
    }
    if (receivedData?.languageCode) {
      setlan(receivedData?.languageCode);
    }
  };
  useEffect(() => {
    const sendOrientationData = () => {
      var orientation = "";
      if (window.matchMedia("(orientation:landscape)").matches) {
        if (window.orientation === 90) {
          orientation = "landscapeleft";
          setGeros(orientation);
        } else {
          orientation = "landscapeRight";
          setGeros(orientation);
        }
      } else {
        orientation = "portrait";
        setGeros(orientation);
      }
      // if (event?.data?.latitude || event?.data?.longitude) {
      //   setlct({ ltd: event?.data?.latitude, lng: event?.data?.longitude });
      // }
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
    window?.webkit?.messageHandlers?.buttonPressed.postMessage("QrCode");
  };

  const getDeep = () => {
    window?.webkit?.messageHandlers?.buttonPressed.postMessage("deeplink1");
  };
  const getLanguage = () => {
    window?.webkit?.messageHandlers?.buttonPressed.postMessage("getLanguage");
  };
  const sendDataToAndroid = () => {
    window?.JSBridge?.showMessageInNative("getTime");
  };
  const sendDataToAndroidClose = () => {
    window?.JSBridge?.showMessageInNative("close");
  };

  return (
    <>
      <div className="flex min-h-full  flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <Close />
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
            <div>
              <button
                className="mt-2 flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-lime-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={getLocationIos}
              >
                getlocation
                {/* <p>{locat}</p> */}
              </button>
            </div>
          </div>
          <div>
            <button
              onClick={getDeep}
              className="mt-2 flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-lime-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              DeepLink
            </button>
            <button
              onClick={getLanguage}
              className="mt-2 flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-lime-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Language
            </button>
            <button
              onClick={() => {
                handleClick2();
                sendDataToAndroidClose();
              }}
              id="webButton2"
              className="mt-2 flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-lime-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              qr code
            </button>
            <a href={sslika}>
              <button
                className="mt-2 flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-lime-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                style={{ marginTop: "5px" }}
              >
                {sslika}
              </button>
            </a>
          </div>
          <p className="mt-10 text-center text-sm text-gray-500">{geros}</p>
          <p>{sslika}</p>
          <p>{data}</p>
          {/* <p>{lct}</p> */}
          <p>{lct.lng}</p>
          <p>{lct.ltd}</p>
          <p>{lan}</p>
        </div>
      </div>
    </>
  );
}
