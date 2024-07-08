"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
import {  PencilSquareIcon,  InformationCircleIcon, ChartBarIcon  } from '@heroicons/react/24/solid'
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline'
import { ThirdwebProvider } from '@thirdweb-dev/react'
import { ConnectWallet } from '@thirdweb-dev/react'
import { db } from "../firebase";
import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import { useAddress } from '@thirdweb-dev/react';



const activeChain = "ethereum"


export default function Home() {

  const address = useAddress(); // This will get the connected wallet address


  const [count, setCount] = useState(0);
  const [totalClaimed, setTotalClaimed] = useState(0);
  const [lastClaimTime, setLastClaimTime] = useState<number | null>(null);
  const [totalMined, setTotalMined] = useState(0);
  const [maxClicks, setMaxClicks] = useState(0);



  


  useEffect(() => {
    const fetchUserData = async () => {
      if (address) {
        const docRef = doc(db, "users", address);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setCount(data.count || 0);
          setTotalClaimed(data.totalClaimed || 0);
          setLastClaimTime(data.lastClaimTime || null);
          setTotalMined(data.totalMined || 0);
          setMaxClicks(data.maxClicks || getRandomMaxClicks());
        }
      }
    };

    fetchUserData();
  }, [address]);


  useEffect(() => {
    const saveUserData = async () => {
      if (address) {
        const userDocRef = doc(db, "users", address);

        await updateDoc(userDocRef, {
          count,
          totalClaimed,
          lastClaimTime,
          totalMined,
          maxClicks
        });
      }
    };

    saveUserData();
  }, [count, totalClaimed, lastClaimTime, totalMined, maxClicks, address]);

 
  const cooldownTime = 24 * 60 * 60 * 1000;  // 24 hours in milliseconds

  const getRandomMaxClicks = () => Math.floor(Math.random() * (489000 - 250000 + 1)) + 250000;
  const getRandomClickCount = () => Math.floor(Math.random() * (50 - 25 + 1)) + 25;

  const canClick = () => {
    if (!lastClaimTime) return true;
    const now = new Date().getTime();
    return now - lastClaimTime >= cooldownTime;
  };


  useEffect(() => {
    const checkCooldownAndSetMaxClicks = () => {
      if (canClick()) {
        setMaxClicks(getRandomMaxClicks());
      }
    };
    checkCooldownAndSetMaxClicks();
  }, [lastClaimTime]);

  const handleButtonClick = () => {
    if (canClick()) {
      const randomClicks = getRandomClickCount();
      setCount((prevCount) => {
        if (prevCount + randomClicks >= maxClicks) {
          setLastClaimTime(new Date().getTime());
          setTotalClaimed((prevTotal) => prevTotal + 1);
          setTotalMined((prevTotal) => prevTotal + maxClicks);
          setMaxClicks(getRandomMaxClicks());
          return 0;

        }
        setTotalMined((prevTotal) => prevTotal + randomClicks);
        return prevCount + randomClicks;
      });
    }
  };

  const percentage = (count / maxClicks) * 100;
  const totalPercentage = totalClaimed;

  useEffect(() => {
    const storedCount = localStorage.getItem('count');
    const storedTotalClaimed = localStorage.getItem('totalClaimed');
    const storedLastClaimTime = localStorage.getItem('lastClaimTime');
    const storedTotalMined = localStorage.getItem('totalMined');
    const storedMaxClicks = localStorage.getItem('maxClicks');

    if (storedCount) setCount(Number(storedCount));
    if (storedTotalClaimed) setTotalClaimed(Number(storedTotalClaimed));
    if (storedLastClaimTime) setLastClaimTime(Number(storedLastClaimTime));
    if (storedTotalMined) setTotalMined(Number(storedTotalMined));
    if (storedMaxClicks) setMaxClicks(Number(storedMaxClicks));
  }, []);

  useEffect(() => {
    localStorage.setItem('count', count.toString());
    localStorage.setItem('totalClaimed', totalClaimed.toString());
    localStorage.setItem('lastClaimTime', lastClaimTime?.toString() || '');
    localStorage.setItem('totalMined', totalMined.toString());
    localStorage.setItem('maxClicks', maxClicks.toString());
  }, [count, totalClaimed, lastClaimTime, totalMined, maxClicks]);

  const scrollToMiningButton = () => {
    const element = document.getElementById('mining-button');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error('Element with ID "mining-button" not found.');
    }
  };



  return (
    <ThirdwebProvider activeChain={activeChain}>
   
  <main>
      <div className="flex h-screen flex-col bg-gradient-to-br from-black via-blue-950 to-black lg:grid lg:grid-col-10">
      <div className="lg:col-span-4 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800">
        <div className="flex flex-col items-center justify-center py-2 lg:min-h-screen">
          <div className="p-2 border border-blue-900 rounded-xl shadow-lg">
          <Image className="object-cover rounded-xl lg:w-72 lg:h-96 "
            src="/tco.png"
            width={200}
            height={200}
            alt="Picture of the author"
          />
          </div>
          

          <div className="space-y-2 text-center p-5">
            <h1 className="text-4xl font-bold text-white">DN-COIN</h1>
            <h2 className="text-xl text-gray-300">A Token Developed to Bridge the Gap Between Cryptocurrency and Artificial Intelligence</h2>

            <div className="flex justify-center">
              <ArrowDownCircleIcon
                className="mt-4 h-12 w-12 bg-gray-200 rounded-full animate-bounce text-gray-800"
                onClick={scrollToMiningButton}
              />
            </div>
            <p className="text-gray-300" id="mining-button">Press the Arrow to go to the mining button</p>
          </div>

        </div>

        
      </div>
          {/* Right*/}
      </div>

      <div className=" bg-gradient-to-br from-black via-blue-950 to-black flex flex-1 flex-col p-12 lg:col-span-6">
        {/* header*/}
        <header className="flex items-center justify-between">
          <h1 className="w-52 cursor-pointer text-xl text-white font-extralight sm:w-80">With{' '}
          <span className="font-extrabold underline decoration-slate-400">
            AI
            </span>{' '}
            We built Together
            </h1>

            <ConnectWallet className=" h-10 w-10 cursor-pointer" />
            
        </header>
        <hr className="my-2 border"/>

        {/* Content*/}
        <div className="mt-10 flex flex-1 flex-col items-center space-y-6 text-center">
          <button className="py-2" onClick={handleButtonClick} id="mining-button">
            <h2 className="text-white text-bold text-2xl">Total DNC Mined: {totalMined}</h2>
          
          <Image className="object-cover pb-10 lg:h-100 py-4"
            src="/tlogo.png"
            width={500}
            height={500}
            alt="Picture of the author"
          />
          <p className="pt-2 text-xl text-gray-600">{totalPercentage}% of 100% claimed</p>

          </button>

          <div className="w-full max-w-md">
              <div className="bg-gray-200 h-8 rounded-full overflow-hidden">
                <div
                  className="bg-blue-500 h-full"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <p className="mt-2 text-center text-white">
                {Math.round(percentage)}%
              </p>
            </div>

            <div className="flex bg-gradient-to-br from-gray-700 via-blue-600 to-gray-800 h-16 w-full text-gray-300 items-center justify-between rounded-full shadow-lg cursor-pointer">
                <div className="flex-1 flex items-center justify-center relative ">
                    <PencilSquareIcon className="h-12 w-12" />
                    <div className="vertical-line"></div>
                </div>
                <div className="flex-1 flex items-center justify-center relative border-l border-white/20">
                    <ChartBarIcon className="h-12 w-12" />
                    <div className="vertical-line"></div>
                </div>
                <div className="flex-1 flex items-center justify-center relative border-l border-white/20">
                    <InformationCircleIcon className="h-12 w-12" />
            </div>
</div>
          
        </div>

        

        {/* button*/}
      </div>
      

  
    </main>
    </ThirdwebProvider>
    

  );
}
