import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";

axios.defaults.withCredentials = true;

const initialState = {
  nom: "",
  prix: "",
  quantite: "",
  img: "",
};

function UpdateProduit(props) {
  const [state, setState] = useState(initialState);
  const [msg, setMsg] = useState({});
  const [valid, setValid] = useState(true);
  const history = useNavigate();
  const { id } = useParams();

  const up = async (data, id) => {
    try {
      const response = await axios.put(`http://localhost:5000/produit/up/${id}`, data);
      if (response.status === 200) {
        toast.success("Produit updated successfully!");
        history('/listproduit');
      } else {
        toast.error("Failed to update produit.");
      }
    } catch (err) {
      setValid(false);
      if (err.response) {
        setMsg(err.response.data);
      } else {
        setMsg({ error: "Network error occurred." });
      }
      toast.error("Failed to update produit.");
    }
  };

  const getOneL = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/produit/getOnel/${id}`);
      setState(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getOneL();
    }
  }, [id]);

  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    up(state, id);
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
                          <i className="bi bi-file-earmark-person-fill"></i> modifier un Produit
                        </h4>
                      </div>
                    </div>

                    <div className="iq-card-body">
                      <form id="form-wizard1" className="text-center mt-4" onSubmit={handleFormSubmit}>
                        <div className="row align-items-center">
                          <div className="form-group col-sm-6">
                            <label htmlFor="name">
                              <i className="bi bi-person-bounding-box"></i> Nom:
                            </label>
                            <input type="text" className="form-control" name="nom" placeholder="nom" value={state.nom || ''} onChange={(e) => setState({ ...state, nom: e.target.value })} />
                            {msg.error && <div className="alert alert-danger">{msg.error}</div>}
                          </div>
                          <div className="form-group col-sm-6">
                            <label htmlFor="tel">
                              <i className="bi bi-person-bounding-box"></i> Prix:
                            </label>
                            <input type="text" className="form-control" name="prix" placeholder="prix"value={state.prix || ''} onChange={(e) => setState({ ...state, prix: e.target.value })} />
                          </div>
                          <div className="form-group col-sm-6">
                            <label htmlFor="Quantité">Quantité:</label>
                            <input type="number" className="form-control" name="quantite"placeholder="quantite"  value={state.quantite || ''} onChange={(e) => setState({ ...state, quantite: e.target.value })} />
                          </div>
                        </div>
                        <input type="submit"  value={"modifier"}   className="btn btn-primary" /> 
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

*    </div>
  );
}

export default UpdateProduit;
