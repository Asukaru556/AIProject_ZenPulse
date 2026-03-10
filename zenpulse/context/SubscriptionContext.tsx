import React, { createContext, useState, useContext } from 'react';

const SubscriptionContext = createContext({
  isSubscribed: false,
  setSubscribed: (val: boolean) => {},
});

export const SubscriptionProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSubscribed, setSubscribed] = useState(false);
  return (
    <SubscriptionContext.Provider value={{ isSubscribed, setSubscribed }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => useContext(SubscriptionContext);