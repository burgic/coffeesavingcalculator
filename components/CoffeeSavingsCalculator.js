'use client';


import React, { useState, useEffect } from 'react';
import { Slider } from './ui/slider';

const CoffeeSavingsCalculator = () => {
  const [coffeePrice, setCoffeePrice] = useState(3);
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [savings, setSavings] = useState(0);

  const calculateSavings = () => {
    const yearsUntilRetirement = retirementAge - currentAge;
    const annualSavings = coffeePrice * 365;
    const futureValue = annualSavings * ((Math.pow(1.05, yearsUntilRetirement) - 1) / 0.05);
    setSavings(Math.round(futureValue));
  };

  useEffect(() => {
    calculateSavings();
  }, [coffeePrice, currentAge, retirementAge]);

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-4 text-gray-900">Coffee Savings Calculator</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Coffee Price: £{coffeePrice.toFixed(2)}</label>
          <Slider
            value={[coffeePrice]}
            onValueChange={(value) => setCoffeePrice(value[0])}
            min={1}
            max={10}
            step={0.1}
            className="w-full h-6"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Current Age: {currentAge}</label>
          <Slider
            value={[currentAge]}
            onValueChange={(value) => setCurrentAge(value[0])}
            min={18}
            max={80}
            step={1}
            className="w-full h-6"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Retirement Age: {retirementAge}</label>
          <Slider
            value={[retirementAge]}
            onValueChange={(value) => setRetirementAge(value[0])}
            min={currentAge + 1}
            max={100}
            step={1}
            className="w-full h-6"
          />
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900">Potential Savings at Retirement</h3>
          <p className="text-2xl font-bold text-gray-900">£{savings.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default CoffeeSavingsCalculator;