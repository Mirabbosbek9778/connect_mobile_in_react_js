const Close = () => {
  const handleClick3 = () => {
    window?.webkit?.messageHandlers?.buttonPressed.postMessage("close1");
  };
  return (
    <div>
      <button
        onClick={() => {
          handleClick3();
        }}
        className=" mt-2 flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-lime-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        close
      </button>
    </div>
  );
};

export default Close;
