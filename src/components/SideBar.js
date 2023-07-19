import React from "react";
import { Link } from "react-router-dom";
function SideBar(props) {
  return (
    <div class="iq-sidebar">
      <div id="sidebar-scrollbar">
        <nav class="iq-sidebar-menu">
          <ul id="iq-sidebar-toggle" class="iq-menu">
           

            <li class="">
              <Link class="-waves-effect" to="/listproduit">
                <i class="bi bi-journal-richtext"></i>
                <span>produit</span>
              </Link>
            </li>
            <ul id="tables" class="iq-submenu collapse show" data-parent="#ui-elements">
              <li>
                <Link to="/addproduit">
                  {" "}
                  <i class="bi bi-cloud-plus"></i>
                  Ajouter Produit
                </Link>
              </li>
              <li>
                <Link to="/tab">
                  <i class="bi bi-card-text"></i>
                  Affichage produit
                </Link>
              </li>
              
            </ul>
            
            <li></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default SideBar;
