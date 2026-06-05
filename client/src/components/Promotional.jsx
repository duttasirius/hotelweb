import React from "react";

const Promotional = () => {
  return (
    <div className="flex items-center justify-center mb-6">
      <div className="bg-white text-sm border border-gray-300/60 p-8 rounded-md m-2 max-w-xl w-full ">
        <p className="font-medium text-blue-600 mb-1">Download Now!</p>
        <h2 className="text-2xl font-semibold text-gray-800">
          Download our mobile app.
        </h2>
        <p className="text-gray-500 mt-1">
          Mobile banking app for IOS & Android to
          <br />
          manage your online money.
        </p>
        <div className="flex items-center gap-4 mt-6">
          <button className="active:scale-95 transition-all" type="button">
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/appDownload/googlePlayBtnBlue.svg"
              alt="googlePlayBtnBlue"
            />
          </button>
          <button className="active:scale-95 transition-all" type="button">
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/appDownload/appleStoreBtnBlue.svg"
              alt="appleStoreBtnBlue"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Promotional;
