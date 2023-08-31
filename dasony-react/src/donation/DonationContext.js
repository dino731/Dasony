
import { createContext, useContext, useState } from 'react';

const DonationContext = createContext();

export const DonationProvider = ({ children }) => {
  const [donationAmounts, setDonationAmounts] = useState({});

  const updateDonationAmount = (postId, amount) => {
    setDonationAmounts((prevAmounts) => ({
      ...prevAmounts,
      [postId]: amount,
    }));
  };

  return (
    <DonationContext.Provider value={{ donationAmounts, updateDonationAmount }}>
      {children}
    </DonationContext.Provider>
  );
};

export const useDonationContext = () => {
  return useContext(DonationContext);
};
