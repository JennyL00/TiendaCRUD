import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import axios from "axios";

import ListGroupItem from "react-bootstrap/ListGroupItem";
import ListGroup from "react-bootstrap/ListGroup";
export default function ProductoFormsSearch(){
    const [productoBuscado, setProductoBuscado] = useState({
            codigo:"",
            nombreProducto:"",
            precio:"",
            unidadDeMedida:"",
            cliente:""
    })
    const [busqueda, setBusqueda] = useState(false)
    const [dataProducto, setDataProducto] = useState({
        codigo:""
});
    const handleChange = e=>{
        const value = e.target.value;
        setDataProducto({
            ...dataProducto,
            [e.target.name]: value
        });
    }
    const handleGet =(e)=>{
        e.preventDefault();
        if(!dataProducto){
            alert('Ingrese valores')
        }
        axios.get(`producto/${dataProducto.codigo}`)
            .then((response)=>{
                setProductoBuscado(response.data)
            }).catch(()=>{
                alert('No se pudo obtener el producto')
        })

    }
    return(
        <div className="m-5">
            <Form onSubmit={handleGet}>
                <InputGroup>
                    <FormControl
                        onChange={handleChange}
                        type='text'
                        name='codigo'
                    placeholder='Codigo producto '/>
                    <Button type='submit' className="bg-black" onClick={()=>{setBusqueda(true)}}>Buscar</Button>
                </InputGroup>
            </Form>
            {busqueda? (
                <div className="m-3">

                    <ListGroup>
                        <ListGroupItem  className='d-flex justify-content-between align-items-center'>
                            <div>{productoBuscado.nombreProducto}</div>
                            <div>{productoBuscado.codigo}</div>
                            <div>{productoBuscado.precio}</div>
                            <div>{productoBuscado.unidadDeMedida}</div>
                        </ListGroupItem>
                    </ListGroup>
                </div>
            ):(<></>


            )
            }
        </div>

    )
}