import React, { useState } from 'react';
import Swal from 'sweetalert2';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() !== '') {
      // You might want to add a logic here to actually subscribe the email
      // For demonstration purpose, I'm just setting subscribed state to true
      setSubscribed(true);
      Swal.fire({
        title: "Good job!",
        text: "Thanks for subscribing!",
        icon: "success"
      });
    
    } else {
      Swal.fire({
        title: "Oops!",
        text: "Please enter a valid email address!",
        icon: "warning"
      });
      
    }
  };

  return (
    <div className='mx-auto justify-center text-center my-10 w-3/5 pt-5'>
      <h1 className='text-3xl font-bold py-3'>Stay Updated with Exclusive Offers</h1>
      <p className='text-gray-500 py-4 w-4/5 mx-auto text-center'>
        Be the first to know about our latest promotions, special deals, and exclusive offers by subscribing to our newsletter.
      </p>
      <form onSubmit={handleSubscribe} className="flex flex-row w-3/6 mx-auto justify-center py-7">
        <input
          name="email"
          type="email"
          placeholder="example@email.com"
          className="w-3/5 p-3 rounded-l-lg sm:w-2/3 bg-gray-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="p-3 font-semibold rounded-r-lg sm:w-1/3 dark:bg-violet-600 dark:text-gray-50"
        >
          {subscribed ? 'Subscribed' : 'Subscribe'}
        </button>
      </form>
    </div>
  );
};

export default NewsletterSignup;
