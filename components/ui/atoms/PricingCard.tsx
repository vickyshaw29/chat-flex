import React, { FC } from 'react';
import { Button } from '../button';

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  onClick: () => void;
}

const PricingCard: FC<PricingCardProps> = ({ title, description, price, onClick }) => {
  return (
    <div className='flex flex-col'>

    </div>
  );
};

export default PricingCard;
