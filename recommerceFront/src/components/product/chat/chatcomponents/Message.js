import React, { useEffect, useState } from "react";

export const Message = (props) => {
  const messageContent = props.messageContent;
  const username = props.username;
  const [who, setWho] = useState("me");
  useEffect(() => {
    username === messageContent.author ? setWho("me") : setWho("other");
  }, [props]);

  return (
    <div className={`flex justify-${who === "me" ? "end" : "start"} px-10`}>
      <div>
        <div
          className={`min-h-40 max-w-550 rounded-md text-white flex items-center m-3 p-2 overflow-wrap break-word word-break-all justify-${
            who === "me" ? "end" : "start"
          } ${who === "me" ? "bg-blue-500" : "bg-blue-700"}`}
        >
          <p className="m-5">{messageContent.message}</p>
        </div>
        <div
          className={`flex text-sm justify-${who === "me" ? "end" : "start"} ${
            who === "me" ? "mr-10" : "ml-10"
          }`}
        >
          <p className="m-1">{messageContent.time}</p>
          <p className="m-1 font-bold">{messageContent.author}</p>
        </div>
      </div>
    </div>
  );
};
