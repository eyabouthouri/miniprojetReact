import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
axios.defaults.withCredentials = true;
const initialState = {
  nom: "",
  prix: "",
  quantite: "",
  img: "",
};

function Addproduit(props) {
  const [state, setState] = useState(initialState);
  const navigate = useNavigate();

  const addP = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/produit/addP", data);
      toast.success("produit ajouté ");
      navigate("/listproduit");
    } catch (err) {
      toast.error("Error Add");
    }
  };

  const Handelsubmit = (e) => {
    e.preventDefault();
    addP(state);
  };

  const  handleInputChange=(e) =>{
    let{name, value}=e.target;
    setState({...state, [name]:value });
};

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <SideBar />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="iq-edit-list-data">
              <div className="tab-content">
                <div className="tab-pane fade active show" id="personal-information" role="tabpanel">
                  <div className="iq-card">
                    <div className="iq-card-header d-flex justify-content-between">
                      <div className="iq-header-title">
                        <h4 className="card-title">
                          <i className="bi bi-file-earmark-person-fill"></i> Ajouter un Produit
                        </h4>
                      </div>
                    </div>

                    <div className="iq-card-body">
                      <form id="form-wizard1" className="text-center mt-4" method="POST" onSubmit={Handelsubmit}>
                        <div className="row align-items-center">
                          <div className="form-group col-sm-6">
                            <label htmlFor="name">
                              <i className="bi bi-person-bounding-box"></i> Nom:
                            </label>
                            <input type="text" className="form-control" name="nom" placeholder="nom" onChange={handleInputChange} value={state.nom} />
                          </div>
                          <div className="form-group col-sm-6">
                            <label htmlFor="tel">
                              <i className="bi bi-person-bounding-box"></i> Prix:
                            </label>
                            <input type="text" className="form-control" name="prix" placeholder="prix" onChange={handleInputChange} value={state.prix} />
                          </div>

                          <div className="form-group col-sm-6">
                            <label htmlFor="Quantité">
                              quantité:
                            </label>
                            <input type="number" className="form-control" name="quantite" onChange={handleInputChange} value={state.quantite} />

                            <div className="form-group">
               <label for="file-upload">Photo</label>
               <input id="file-upload" type="file" name="img"  onChange={handleInputChange}  value={state.img}></input>
               
               </div></div>
                        </div>
                        <button type="submit" className="btn btn-danger">Ajouter</button>

                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
     
    </div>
  );
}

export default Addproduit;
