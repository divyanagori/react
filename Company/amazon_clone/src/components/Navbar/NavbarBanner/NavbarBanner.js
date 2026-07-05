// import React from "react";
// import "./NavbarBanner.css";
// import MenuIcon from "@mui/icons-material/Menu";
// import ads from "../../../assets/ads.jpg";

// const NavbarBanner = () => {
//   return (
//     <div className="NavbarBanner">
//       <div className="AllBoxCode">
//         <MenuIcon className="menuIcon" sx={{ fontSize: "25px" }} />
//         <div className="allCode">
//           <div className="allText">All</div>
//         </div>
//       </div>
//       <div className="allOptionBox">
//         <div className="allOptionOptions">Fresh</div>
//         <div className="allOptionOptions">MX Player</div>
//         <div className="allOptionOptions">Sell</div>
//         <div className="allOptionOptions">Bestsellers</div>
//         <div className="allOptionOptions">Today's Deals</div>
//         <div className="allOptionOptions">Mobiles</div>
//         <div className="allOptionOptions">New Releases</div>
//         <div className="allOptionOptions">Customer Service</div>
//         <div className="allOptionOptions">Prime</div>
//         <div className="allOptionOptions">Electronics</div>
//         <div className="allOptionOptions">Amazon Pay</div>
//         <div className="allOptionOptions">Fashion</div>
//       </div>
//       <div className="adsbox">
//         <img className="ads" src={ads} alt="" />
//       </div>
//     </div>
//   );
// };

// export default NavbarBanner;

import React from "react";
import "./NavbarBanner.css";
import MenuIcon from "@mui/icons-material/Menu";
import ads from "../../../assets/ads.jpg";

const NavbarBanner = () => {
  const options = [
    { name: "Fresh" },
    { name: "MX Player" },
    { name: "Sell" },
    { name: "Bestsellers" },
    { name: "Today's Deals" },
    { name: "Mobiles" },
    { name: "New Releases" },
    { name: "Customer Service" },
    { name: "Prime" },
    { name: "Electronics" },
    { name: "Amazon Pay" },
    { name: "Fashion" },
  ];
  return (
    <div className="navbarBanner">
      <div className="navbarBannerOptionsLeft">
        <div className="optionsNavbarBanner">
          <MenuIcon sx={{ fontSize: "24px" }} />
          <div className="allOptionsNavbarBanner">All</div>
        </div>
        {options.map((item, index) => {
          return(<div className="optionsNavbarBanner" key={index}>
            <div className="allOptionsNavbarBanner">{item.name}</div>
          </div>)
        })}
      </div>
      <div className="navbarBannerRightSide">
        <img 
          src="https://m.media-amazon.com/images/G/31/IN-Events/Shankhadip/JAN_ART26/MAY26_PC_SWM_Live-Now._CB781115806_.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default NavbarBanner;
