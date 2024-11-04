'use client';


import React, { useState, useEffect } from 'react';
import { Slider } from './ui/slider';
import { ChevronDown, ChevronUp } from 'lucide-react';

const CoffeeSavingsCalculator = () => {
  const [coffeePrice, setCoffeePrice] = useState(3);
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [inflationRate, setInflationRate] = useState(0);
  const [returnRate, setReturnRate] = useState(5);
  const [daysPerWeek, setDaysPerWeek] = useState(7);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [savings, setSavings] = useState(0);

  const calculateSavings = () => {
    const yearsUntilRetirement = retirementAge - currentAge;
    let totalSavings = 0;

    const daysPerYear = daysPerWeek * 52;
    
    // Calculate year by year to account for inflation
    for (let year = 0; year < yearsUntilRetirement; year++) {
      // Calculate coffee price for this year with compound inflation
      const inflatedCoffeePrice = coffeePrice * Math.pow(1 + inflationRate / 100, year);
      const yearlyContribution = inflatedCoffeePrice * daysPerYear;
      
      // Add this year's savings with compound returns
      if (year === 0) {
        totalSavings = yearlyContribution;
      } else {
        // Grow existing savings at return rate
        totalSavings = totalSavings * (1 + returnRate / 100) + yearlyContribution;
      }
    }
    
    setSavings(Math.round(totalSavings));
  };

  useEffect(() => {
    calculateSavings();
  }, [coffeePrice, currentAge, retirementAge, inflationRate, returnRate, daysPerWeek]);

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
        
        <div className="pt-2">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center text-sm text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            Advanced Settings
            {showAdvanced ? <ChevronUp className="ml-1 w-4 h-4" /> : <ChevronDown className="ml-1 w-4 h-4" />}
          </button>

          <div className={`mt-4 space-y-4 transition-all duration-300 ease-in-out ${showAdvanced ? 'block' : 'hidden'}`}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Days Per Week: {daysPerWeek}
              </label>
              <Slider
                value={[daysPerWeek]}
                onValueChange={(value) => setDaysPerWeek(value[0])}
                min={1}
                max={7}
                step={1}
                className="w-full h-6"
              />
              <p className="text-xs text-gray-500 mt-1">
                {daysPerWeek === 7 ? 'Every day' : 
                 daysPerWeek === 5 ? 'Typical work week' :
                 `${daysPerWeek} days per week`}
              </p>
            </div>
          </div>

          <div className={`mt-4 space-y-4 transition-all duration-300 ease-in-out ${showAdvanced ? 'block' : 'hidden'}`}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Average Annual Inflation: {inflationRate.toFixed(1)}%
              </label>
              <Slider
                value={[inflationRate]}
                onValueChange={(value) => setInflationRate(value[0])}
                min={0}
                max={10}
                step={0.1}
                className="w-full h-6"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Average Annual Return: {returnRate.toFixed(1)}%
              </label>
              <Slider
                value={[returnRate]}
                onValueChange={(value) => setReturnRate(value[0])}
                min={0}
                max={15}
                step={0.1}
                className="w-full h-6"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900">Potential Savings at Retirement</h3>
          <p className="text-3xl font-bold text-gray-900">£{savings.toLocaleString()}</p>
          {showAdvanced && (
            <div className="mt-2 text-sm text-gray-600">
              <p>Based on {daysPerWeek} days per week</p>
              <p>Assuming {inflationRate}% average annual inflation and {returnRate}% average annual return</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoffeeSavingsCalculator;