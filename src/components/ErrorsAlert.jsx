const ErrorsAlert = ({ errorMessage }) => {
  return (
    <div>
      <div className=" bg-red-300 rounded-xl py-5 px-4 fixed flex flex-col justify-center top-2/4 left-1/2 -translate-y-2/4 -translate-x-2/4 z-50">
        {errorMessage}
      </div>
    </div>
  );
};

export default ErrorsAlert;
