import React, { useState } from 'react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Simulate submitting data to a server
    try {
      // Here you can put your actual submission logic
      // For now, let's just set subscription status to success after a short delay
      // Replace this with actual submission logic using fetch or any other method
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubscriptionStatus('success');
    } catch (error) {
      setSubscriptionStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full ">
        <div className="container flex flex-col flex-wrap content-center justify-center p-4 py-20 mx-auto md:p-10">
          <h1 className="text-5xl antialiased font-semibold leading-none text-center ">Get Our Updates</h1>
          <p className="pt-2 pb-8 text-xl antialiased text-center ">Find out about events and other news</p>
          <div className="flex flex-row space-x-2">
            <input aria-label="Your first name"
              name="fields[first_name]"
              placeholder="Your first name"
              type="text"
              onChange={handleNameChange}
              value={name}
              className="w-3/5 p-3 rounded-lg sm:w-2/3" />
            <input aria-label="Your email address"
              name="email_address"
              placeholder="Your email address"
              required
              type="email"
              onChange={handleEmailChange}
              value={email}
              className="w-3/5 p-3 rounded-lg sm:w-2/3" />
            <button type="submit" className="w-2/5 p-3 font-semibold rounded-lg sm:w-1/3 bg-violet-400 dark:bg-violet-600 text-gray-900 dark:text-gray-50">Subscribe</button>
          </div>
          {subscriptionStatus === 'success' && <p className="text-green-500">Subscription successful!</p>}
          {subscriptionStatus === 'error' && <p className="text-red-500">Failed to subscribe. Please try again later.</p>}
        </div>
      </div>
    </form>
  );
};

export default NewsletterSignup;
