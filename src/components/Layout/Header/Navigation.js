import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Logo, Messenger, Notifications, Search } from "../../../svg";
import arrowDown from "../../../assets/arrowDown.png";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import SearchInput from "./SearchInput";

const Navigation = () => {
  const { user } = useSelector((user) => ({ ...user }));
  const [showFbSearch, setShowFbSearch] = useState(false);
  const desktopView = useMediaQuery({
    query: "(min-width: 880px)",
  });

  const openSearch = () => {
    if (showFbSearch) return;
    setShowFbSearch(true);
  };

  return (
    <header className="fixed top-0 h-14 z-50 w-full bg-white shadow-sm py-[5px] px-[1rem] shadow-black/10 flex items-center justify-between">
      <Link to="/" className="header_logo">
        <div className="w-[40px] h-[40px] rounded-[50%] cursor-pointer flex items-center justify-center">
          <Logo />
        </div>
      </Link>
      <div
        className={`relative flex items-center ${
          desktopView ? "w-[526px] xl:w-[42.25rem]" : "w-[42.25rem]"
        } pl-[0.4rem] rounded-3xl bg-[#f0f2f5] `}
      >
        {!desktopView ? (
          <div
            onClick={openSearch}
            className={` absolute h-10 ${
              showFbSearch
                ? "w-[312px] rounded-3xl pl-4 active:cursor-default"
                : "w-10 rounded-[50%] hover:bg-black/20 cursor-pointer"
            } flex items-center justify-center  bg-[#e4e6eb]`}
          >
            <Search color="#65676b" />
            {showFbSearch && (
              <>
                <SearchInput
                  showFbSearch={showFbSearch}
                  onFocus={() => setShowFbSearch(true)}
                  onBlurCapture={() => {
                    setShowFbSearch(false);
                  }}
                  className="py-[10px] pr-[32px] pl-2 outline-none w-full rounded-3xl  border-none bg-transparent text-[15px]"
                />
              </>
            )}
          </div>
        ) : (
          <>
            <div className="absolute left-2">
              <Search color="#65676b" />
            </div>
            <SearchInput
              showFbSearch={showFbSearch}
              onFocus={() => setShowFbSearch(true)}
              onBlurCapture={() => {
                setShowFbSearch(false);
              }}
              className="py-[10px] w-full pr-[32px] pl-[2rem] outline-none rounded-3xl hover:bg-white/40 border-none bg-transparent text-[15px]"
            />
          </>
        )}
      </div>
      <div className="flex">
        <div className="relative hover:bg-black/20 h-10 w-10 rounded-[50%] flex items-center justify-center mr-[8px] bg-[#e4e6eb] cursor-pointer">
          <Messenger />
        </div>
        <div className="relative h-10 hover:bg-black/20 w-10 rounded-[50%] flex items-center justify-center mr-[8px] bg-[#e4e6eb] cursor-pointer">
          <Notifications />
          <div className="absolute -top-[0.45rem] -right-1 bg-[#FF0000] text-white text-[13px] w-[1.3rem] h-[1.3rem] rounded-full text-center  ">
            5
          </div>
        </div>
        <Link
          to="/profile"
          className="relative h-10 hover:bg-black/20 w-10 rounded-[50%] flex items-center justify-center  bg-[#e4e6eb] cursor-pointer "
        >
          <img
            className="w-full h-full rounded-full"
            src={user?.picture}
            alt=""
          />
          <img
            className="absolute top-[1.6rem] right-0 outline-[2px] outline-double outline-white w-[0.8rem] h-[0.8rem]  rounded-full bg-[#e4e6eb] "
            src={arrowDown}
            alt=""
          />
        </Link>
      </div>
    </header>
  );
};

export default Navigation;