import React from "react";

const ChatWindow = () => {
  return (
    <div className="flex flex-col justify-between p-4 border-l border-gray-300">
      <div>
        <div className="p-2 mb-2 bg-gray-100 rounded-lg">
          <p>
            Hello, I wanted to know more about the product design position
            opened at Atlassian
          </p>
        </div>
        <div className="p-2 mb-2 text-white bg-orange-500 rounded-lg">
          <p>Sure, tell us. what do you wanna know?</p>
        </div>
        <div className="p-2 mb-2 bg-gray-100 rounded-lg">
          <p>
            Take this part of your letter seriously because it's likely one of
            your first genuine opportunities to make a personal, positive
            impression on a prospective employer. You want your words to invite
            them to keep reading and to convey exactly why you're the best
            choice for their open position. Review your language to ensure it's
            concise and informative. If you're applying to multiple positions,
            take great care to edit your letter so that the first paragraph is
            personal and relevant to the exact position you want.
          </p>
        </div>
        <div className="p-2 mb-2 text-white bg-orange-500 rounded-lg">
          <p>You've a good folio</p>
        </div>
        <div className="p-2 mb-2 text-white bg-orange-500 rounded-lg">
          <p>
            However we're looking for someone with a little more experience!
          </p>
        </div>
      </div>
      <input
        type="text"
        placeholder="Type your message here"
        className="w-full p-2 mt-4 border rounded-lg focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};

export default ChatWindow;
