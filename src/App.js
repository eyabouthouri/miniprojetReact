import logo from './logo.svg';
import './App.css';
import { Route,Routes ,useParams } from 'react-router-dom';
import Addproduit from './produit/Addproduit';
import Listproduit from './produit/Listproduit';
import UpdateProduit from './produit/UpdateProduit';
import Tabproduit from './produit/Tabproduit';

function App() {
  let { id } = useParams();

  return (
    <div className="App">
      <Routes>
        <Route path="/addproduit" element={<Addproduit />} />
      </Routes>
      <Routes>
        <Route path="/listproduit" element={<Listproduit />} />
      </Routes>
      <Routes>
        <Route path="/tab" element={<Tabproduit />} />
      </Routes>
      <Routes>
        <Route path="/up/:id" element={<UpdateProduit />} />
      </Routes>
    </div>
  );
}

export default App;
