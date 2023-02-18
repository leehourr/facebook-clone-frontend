import { useRef } from "react";
import { Link } from "react-router-dom";

const SearchFacebook = ({ setShowSearchMenu }) => {
  const menu = useRef(null);

  return (
    <div
      className="flex items-center gap-[10px] py-[5px] px-[1rem] search_area scrollbar"
      ref={menu}
    >
      <div className="search_wrap">
        <div className="header_logo">
          <div className="circle hover1"></div>
        </div>
      </div>
      <div className="search_history_header">
        <span>Recent searches</span>
        <Link>Edit</Link>
      </div>
      <div className=""></div>
      <div className="search_results scrollbar"></div>
    </div>
  );
};

export default SearchFacebook;
