import axios from "axios";
import React, { useEffect, useState ,useRef} from "react";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";

function Listproduit(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    listP();
  }, []);

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
  const timeOut = useRef(0);
  const search = async (text) => {
     clearTimeout(timeOut.current);
     timeOut.current = setTimeout(async ()=>{
  
        try{
           if(!text){
              listP();
           }else{
              const response= await axios.get(`http://localhost:5000/produit/rech/${text}`);
              setData(response.data);
           }
        }catch (e){
           toast.error("error");
        }
  
     },100)
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
        <div className="row justify-content-center">
          {data.map((item, index) => (
            <div key={index} className="col-md-3 mb-4">
              <div className="card shadow small-card">
                <img
                  className="card-img-top"
                  src={process.env.PUBLIC_URL + "/images/" + item.img}
                  alt="Product"
                />
                <div className="card-body">
                  <h5 className="card-title">Nom: {item.nom}</h5>
                  <p className="card-text">Quantite: {item.quantite}</p>
                  <p className="card-text">Prix: {item.prix}</p>
                  <Link to={`/up/${item._id}`} className="btn btn-primary">
                    modifier
                  </Link>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => confirmDelete(item._id)}
                  >
                    supprime
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Listproduit;