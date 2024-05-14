import React from 'react';
import { Link } from 'react-router-dom';

const CookieModal = ({ acceptCookies, rejectCookies }) => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 bg-white mx-auto justify-center items-center">
      <div className="max-w-lg mx-auto justify-between items-center">
        <p className="text-gray-700 text-md">This website uses cookies to ensure you get the best experience.</p>
        <div className='mx-auto flex flex-row justify-center items-center gap-2 py-4'>
          <Link className="  text-white px-3 py-2 text-xs rounded-lg  hover:bg-blue-700 bg-blue-500" onClick={acceptCookies}>Accept Cookies</Link>
          <Link className="text-gray-50 px-3 py-2 text-xs rounded-lg hover:text-blue-200 bg-gray-500 " onClick={rejectCookies}>Reject Cookies</Link>
        </div>
      </div>
    </div>
  );
};

export default CookieModal;
