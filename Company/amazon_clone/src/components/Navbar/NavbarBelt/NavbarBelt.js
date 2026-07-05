import React from "react";
import "./NavbarBelt.css";
import amazonLogo from "../../../assets/amazonLogo.png";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import SearchIcon from "@mui/icons-material/Search";
import india from "../../../assets/india.png";
import SvgIcon from "@mui/material/SvgIcon";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

// or
const NavbarBelt = () => {
  return (
    <div className="navbarBelt">
      <div className="leftNavBelt">
        <div className="leftNavBeltLogo">
          <img className="amazonLogoNavbar" src={amazonLogo} alt="amazonLogo" />
          <span className="navbar_inLogo">.in</span>
        </div>
        <div className="navbarBeltLocation">
          <div className="navbarbeltLocationImg">
            <LocationOnOutlinedIcon
              sx={{ fontSize: "22px" }}
              className="navbarBeltLocationImgIcon"
            />
          </div>
          <div className="navbarBeltLocationPlace">
            <div className="navbarBeltLocationTop">
              Delivering to Abohar 152116
            </div>
            <div className="navbarBeltLocationBottom">Update Location</div>
          </div>
        </div>
      </div>
      <div className="navbarBeltSearchBox">
        <div className="navbarBeltSearchDiv">
          <div className="navbarBeltSearchBoxAll">
            <div className="navbarBeltSearchBoxAllText">All</div>
            <ArrowDropDownOutlinedIcon sx={{ fontSize: "20px" }} />
          </div>
          <input
            type="text"
            className="navbarBeltInputSearchBox"
            placeholder="Search Amazon.in"
          />
          <div className="searchIconNavbarBelt">
            <SearchIcon
              sx={{ fontSize: "26px" }}
              className="searchIconNavbarBeltIcon"
            />
          </div>
        </div>
      </div>
      <div className="rightSideNavbarBelt">
        <div className="indiaFlagCode">
          <img src={india} alt="" className="indiaFlag" />
          <div className="indiaCodeNavbarBelt">
            EN
            <ArrowDropDownOutlinedIcon
              className="indiaCodeNavbarBeltDrp"
              sx={{ fontSize: "14px", marginTop: "1px" , marginTop:"7px"}}
            />
            {console.log(SvgIcon.propTypes.sx)}
          </div>
        </div>
        <div className="helloSigninNavbarBelt">
          <div className="helloTopNavbarBelt">Hello, User</div>
          <div className="indiaCodeNavbarBelt">
            <div className="indiaCodeNavbarBelt">Accounts & Lists</div>
            <ArrowDropDownOutlinedIcon
              className="indiaCodeNavbarBeltDrp"
              sx={{ fontSize: "14px"}}
            />
        
          </div>
        </div>
        <div className="helloSigninNavbarBelt">
          <div className="helloTopNavbarBelt">Returns</div>
          <div className="indiaCodeNavbarBelt">& Orders</div>
        </div>

        <div className="helloSigninNavbarBelt">
          <span className="cartItemNumberNavbarBelt">0</span>
          <div className="helloTopNavbarBelt"><ShoppingCartOutlinedIcon/><span className="cartTitle">Cart</span></div>
        </div>
      </div>
    </div>
  );
};

export default NavbarBelt;
