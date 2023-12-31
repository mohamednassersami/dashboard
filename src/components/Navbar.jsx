import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { HiOutlineSearch } from 'react-icons/hi';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import avatar from '../data/avatar.jpg';
import { Cart, Chat, Notification, UserProfile } from '.';
import { useStateContext } from '../contexts/ContextProvider';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} positon="BottomCenter">
    <button
      type="button"
      onClick={customFunc}
      style={{ color, position: dotColor ? 'relative' : '' }}
      className={`rounded-full p-3 ${
        title !== 'Chat' ? 'text-xl' : 'text-lg'
      } hover:bg-light-gray`}
    >
      {dotColor && (
        <span
          style={{ background: dotColor }}
          className="absolute right-2 top-2 inline-flex h-2 w-2 rounded-full"
        />
      )}
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const {
    setActiveMenu,
    isClicked,
    handleClick,
    screenSize,
    setScreenSize,
    currentColor,
  } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="relative flex justify-between p-2 md:mx-6">
      <div className="flex">
        <NavButton
          title="Menu"
          customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
          color={currentColor}
          icon={<AiOutlineMenu />}
        />
        <NavButton
          HiOutlineSearch
          title="Search"
          color={currentColor}
          icon={<HiOutlineSearch />}
        />
      </div>

      <div className="flex">
        <NavButton
          title="Cart"
          customFunc={() => handleClick('cart')}
          color={currentColor}
          icon={<FiShoppingCart />}
        />

        <NavButton
          title="Chat"
          dotColor="#03C9D7"
          customFunc={() => handleClick('chat')}
          color={currentColor}
          icon={<BsChatLeft />}
        />

        <NavButton
          title="Notifications"
          dotColor="#03C9D7"
          customFunc={() => handleClick('notification')}
          color={currentColor}
          icon={<RiNotification3Line />}
        />

        <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex cursor-pointer items-center gap-2 rounded-lg p-1 hover:bg-light-gray"
            onClick={() => handleClick('userProfile')}
          >
            <img
              className="h-8 w-8 rounded-full"
              src={avatar}
              alt="userProfile"
            />
            <p>
              <span className="text-14 text-gray-400">Hi, </span>{' '}
              <span className="ml-1 text-14 font-bold text-gray-400">
                Nasser
              </span>
            </p>
            <MdKeyboardArrowDown className="text-14 text-gray-400" />
          </div>
        </TooltipComponent>

        {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
