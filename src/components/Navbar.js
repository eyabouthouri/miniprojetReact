import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookMessenger } from "react-icons/fa";
function Navbar(props) {


  return (
    <div class="iq-top-navbar">
    <div class="iq-navbar-custom">
    <nav class="navbar navbar-expand-lg navbar-light p-0">
    <div class="iq-navbar-logo d-flex justify-content-between">
            <a href="#">
              <img src="images/yc.jfif"  width="150" height="300px"class="img-fluid" alt="" />
            </a>
            <div class="iq-menu-bt align-self-center">
              <div class="wrapper-menu">
                <div class="main-circle">
                  <i class="ri-menu-line"></i>
                </div>
              </div>
            </div>
          </div>

         
        </nav>  </div>
    </div>
  );
}

export default Navbar;
