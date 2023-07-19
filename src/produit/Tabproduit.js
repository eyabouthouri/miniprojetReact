import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";

function Tabproduit(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    listP();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const totalItems = data.length;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const listP = async () => {
    try {
      const response = await axios.get("http://localhost:5000/produit/listp");
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      // Handle the error here
      if (error.response) {
        console.log("Error status:", error.response.status);
        console.log("Error data:", error.response.data);
      } else {
        console.log("Error message:", error.message);
      }
    }
  };

  const timeOut = useRef(0);
  const search = async (text) => {
    clearTimeout(timeOut.current);
    timeOut.current = setTimeout(async () => {
      try {
        if (!text) {
          listP();
        } else {
          const response = await axios.get(`http://localhost:5000/produit/rech/${text}`);
          setData(response.data);
        }
      } catch (e) {
        toast.error("error");
      }
    }, 100);
  };

  const deleteP = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/produit/deletep/${id}`, { withCredentials: true });
      if (response.status === 200) {
        toast.success("Item deleted successfully!");
        listP();
      } else {
        toast.error("Failed to delete item."); // Display an error toast notification
      }
    } catch (error) {
      // Handle the error here
      if (error.response) {
        console.log("Error status:", error.response.status);
        console.log("Error data:", error.response.data);
      } else {
        console.log("Error message:", error.message);
      }
      toast.error("Failed to delete item."); // Display an error toast notification
    }
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Confirm delete",
      message: "Are you sure you want to delete this item?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteP(id),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <div id="content-page" className="content-page">
      <Navbar />
      <SideBar />
      <div className="container">
        <div className="iq-search-bar">
          <form action="#" className="searchbox">
            <input
              type="text"
              className="text search-input"
              placeholder="Type here to search..."
              onChange={(e) => search(e.target.value)}
            />
            <a className="search-link" href="#">
              <i className="ri-search-line" />
            </a>
          </form>
        </div>
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Nom</th>
                <th>Quantite</th>
                <th>Prix</th>
                <th>Actions</th>
              </tr>
            </thead>
                
            {currentItems.map((item, index)  => {
  return (
    <tr key={index}>
                     <td>
        
                 
                         <img
                      src={process.env.PUBLIC_URL + "/images/" + item.img}
                      alt="Product"
                      width={100} 
                      height={100} 
                             />
                     </td>

                  <td>{item.nom}</td>
                  <td>{item.quantite}</td>
                  <td>{item.prix}</td>
                  <td>
                    <Link to={`/up/${item._id}`} className="btn btn-primary">
                      modifié
                    </Link>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => confirmDelete(item._id)}
                    >
                      supprimé
                    </button>
                    </td>        
    </tr> 
  )
})}

    <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
      />


    
                               </table>

                           
                           
                           
                           
                           </div> 
                           
                           
                           </div>
                           
                           </div>
  )
      
}

 

export default Tabproduit;