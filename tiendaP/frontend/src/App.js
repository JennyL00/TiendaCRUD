import ClienteForms from "./components/formularioCliente";
import Cliente from "./components/cliente";
import axios from "axios";
import {useEffect, useState} from "react";
import ClienteFormsSearch from "./components/formularioBuscarCliente";
function App() {
    const [cliente, setCliente] = useState([]);
    useEffect(()=>{
        axios.get('cliente/lista')
            .then((response)=>{
                setCliente(response.data)
            }).catch(()=>{
                alert('No se pudo obtener los clientes')
        })
    },[])
  return (
    <div className="App">
        <h1 className="d-flex justify-content-center align-items-center m-2">Mi tienda</h1>
        <ClienteFormsSearch/>
      <ClienteForms clientes={cliente} setCliente={setCliente}/>
        <Cliente clientes={cliente} setCliente={setCliente}/>
    </div>
  );
}

export default App;
