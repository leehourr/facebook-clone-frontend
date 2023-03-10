import React, { useState, useRef, useCallback, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { FriendsActive, HomeActive, Menu } from "../../../../svg";
import AllMenu from "./AllMenu";
import ReactDOM from "react-dom";
// import { modalActions } from "../../../store/modal-slice";
// import { useDispatch } from "react-redux";
import useClickOutside from "../../../../helpers/clickOutside";
import { Backdrop } from "../../../Ui/Backdrop";
import { useSelector } from "react-redux";

const LeftNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { name } = useParams();
  const { user, profile } = useSelector((state) => ({ ...state }));
  const [visitFri, setVisitFri] = useState(false);
  const { pathname } = useLocation();
  // const { user } = useSelector((state) => ({ ...state }));
  // console.log(user.data.username, name);
  const [homeIsActive, setHomeIsActive] = useState(true);
  // console.log("in left nav", user);
  const desktopView = useMediaQuery({
    query: "(min-width: 1120px)",
  });
  const openMenu = () => {
    // console.log("menu opend");
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const activeHome = (i) => {
    if (i !== "Home") {
      setHomeIsActive(false);
      return;
    }
    setHomeIsActive(true);
    // console.log("name", i);
  };

  useEffect(() => {
    if (profile?.visit) {
      setHomeIsActive(false);
    }
    if (name && user.data?.username !== name) {
      setVisitFri(true);
    } else {
      setVisitFri(false);
    }
  }, [profile, name, user]);
  const leftNavigation = [
    {
      name: "Home",
      to: "/",
      icon: (
        <HomeActive
          color={pathname === "/" || homeIsActive ? "#1b74e4" : "black"}
        />
      ),
      hoverState: "Home",
    },
    {
      name: `${user.data?.first_name} ${user.data?.last_name}`,
      to: `${user.data?.username}`,
      icon: user.data?.picture,
      hoverState: "Your profile",
    },
    visitFri && {
      name: "Others",
      to: `/${name}`,
      icon: <FriendsActive />,
      hoverState: "Others",
    },
    {
      name: "Watch",
      to: "/watch",
      icon: "../../left/watch.png",
      hoverState: "Watch",
    },
    {
      name: "Marketplace",
      to: "/marketplace",
      icon: "../../left/marketplace.png",
      hoverState: "Marketplace",
    },
    {
      name: "Group",
      to: "/groups",
      icon: "../../left/groups.png",
      hoverState: "Group",
    },
    {
      name: "Gaming",
      to: "/gaming",
      icon: "../../left/gaming.png",
      hoverState: "Gaming",
    },
  ];

  return (
    <nav
      className={`${
        desktopView
          ? desktopView && (isMenuOpen || profile?.visit)
            ? "w-[4rem] bg-white dark:bg-[#242526]"
            : "4xl:w-[20rem] xl:w-[19rem] bg-transparent"
          : "w-[4rem] bg-white dark:bg-[#242526]"
      } h-full fixed top-[3.5rem] select-none z-30 dark:text-white `}
    >
      <ul className="w-full">
        {leftNavigation.slice(0, 2).map((i, index) => (
          <Navlink
            onActiveHandler={activeHome.bind(null, i.name)}
            key={index}
            profile={i.profile}
            href={i.to}
            name={i.name}
            icon={i.icon}
            hoverText={i.hoverState}
            isMenuOpen={isMenuOpen}
          />
        ))}
        <div
          className={`${
            desktopView
              ? desktopView && (isMenuOpen || profile?.visit)
                ? "w-[50%]"
                : "w-[90%]"
              : "w-[50%]"
          } leftNav_border`}
        ></div>
        {leftNavigation.slice(visitFri ? 2 : 3, 7).map((i, index) => (
          <Navlink
            onActiveHandler={activeHome.bind(null, i.name)}
            key={index}
            href={i.to}
            name={i.name}
            icon={i.icon}
            hoverText={i.hoverState}
            isMenuOpen={isMenuOpen}
          />
        ))}
        <SeeAllButton
          onActiveHandler={activeHome}
          openMenu={openMenu}
          closeMenu={closeMenu}
        />
        <div
          className={`${
            desktopView
              ? desktopView && (isMenuOpen || profile?.visit)
                ? "w-[50%]"
                : "w-[90%]"
              : "w-[50%]"
          } leftNav_border`}
        ></div>
      </ul>
    </nav>
  );
};

export default LeftNav;

const Navlink = ({
  href,
  name,
  icon,
  hoverText,
  isMenuOpen,
  onActiveHandler,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const { profile } = useSelector((state) => ({ ...state }));

  const mobileView = useMediaQuery({
    query: "(max-width: 1120px)",
  });

  const desktopView = useMediaQuery({
    query: "(min-width: 1120px)",
  });

  const mouseHover = (i) => {
    // console.log(i);
    setIsHovering(true);
  };
  const mouseOut = () => {
    setIsHovering(false);
  };

  return (
    <li onClick={onActiveHandler} className="my-2 relative">
      <NavLink
        to={href}
        className={({ isActive }) =>
          isActive && !isMenuOpen
            ? "before:h-[2.75rem] before:rounded-r-lg before:border-[2px] before:border-[#056ADB] before:absolute before:top-0 before:left-0 "
            : "xl:w-full"
        }
        end
      >
        <div
          onMouseOver={mouseHover}
          onMouseOut={mouseOut}
          className={`${
            desktopView
              ? desktopView && (isMenuOpen || profile?.visit)
                ? "w-[80%] justify-center"
                : "w-[97%] justify-start"
              : "w-[80%] justify-center"
          } hover:bg-black/20 relative p-2 flex items-center text-center mx-auto rounded-lg `}
        >
          {typeof icon === "object" ? (
            icon
          ) : (
            <img src={`${icon}`} className="rounded-full w-7 h-7" alt="" />
          )}
          {mobileView || isMenuOpen || profile?.visit ? null : (
            <span className="ml-2">{name}</span>
          )}
          {((isMenuOpen || profile?.visit) && isHovering) ||
          (mobileView && isHovering) ? (
            <span className="absolute z-50 px-4 py-1 rounded-lg text-white text-[0.9rem] opacity-70 shadow-md shadow-black bg-black top-[20%] left-[3.55rem] whitespace-nowrap">
              {hoverText}
            </span>
          ) : null}
        </div>
        {/* {MenuComponent && isMenuOpen && <AllMenu />} */}
      </NavLink>
    </li>
  );
};

const SeeAllButton = ({ openMenu, closeMenu, onActiveHandler }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menu = useRef(null);
  const { profile } = useSelector((state) => ({ ...state }));

  const mobileView = useMediaQuery({
    query: "(max-width: 1120px)",
  });
  const desktopView = useMediaQuery({
    query: "(min-width: 1120px)",
  });

  useClickOutside(
    menu,
    useCallback(() => {
      // console.log("click in helper");
      closeMenu();
      setIsMenuOpen(false);
    }, [closeMenu])
  );

  const mouseHover = (i) => {
    // console.log(i);
    setIsHovering(true);
  };
  const mouseOut = () => {
    setIsHovering(false);
  };
  const toggleMenu = () => {
    openMenu();
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <li onClick={onActiveHandler} ref={menu} className="my-2 relative">
      <NavLink
        // onClick={closeMenu}
        className={
          isMenuOpen
            ? "before:h-[2.75rem] before:rounded-r-lg  before:border-[2px] before:border-[#056ADB] before:absolute before:top-0 before:left-0 "
            : "xl:w-full"
        }
      >
        <div
          onClick={toggleMenu}
          onMouseOver={mouseHover}
          onMouseOut={mouseOut}
          className={`${
            desktopView
              ? desktopView && (isMenuOpen || profile?.visit)
                ? "justify-center w-[80%]"
                : "w-[97%] justify-start"
              : "w-[80%] justify-center"
          } hover:bg-black/20 relative p-2 flex items-center mx-auto rounded-lg`}
        >
          <div className="w-7 flex items-center justify-center bg-[#dbe1e8] dark:bg-[#242526] p-2 rounded-full">
            <Menu />
          </div>
          {mobileView || isMenuOpen || profile?.visit ? null : (
            <span className="ml-2">See all</span>
          )}

          {((isMenuOpen || profile?.visit) && isHovering) ||
          (mobileView && isHovering) ? (
            <span className="absolute z-40 px-4 py-1 rounded-lg text-white text-[0.9rem] opacity-70 shadow-md shadow-black bg-black top-[20%] left-[3.55rem] whitespace-nowrap">
              See all
            </span>
          ) : null}
        </div>
      </NavLink>
      {isMenuOpen && <AllMenu />}
      {isMenuOpen &&
        ReactDOM.createPortal(
          <Backdrop className="bg-white/70 dark:bg-black/60 blur-sm left-24 " />,
          document.getElementById("backdrop")
        )}
    </li>
  );
};
