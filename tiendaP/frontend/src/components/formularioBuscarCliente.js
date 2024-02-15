import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import axios from "axios";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import ListGroup from "react-bootstrap/ListGroup";

export default function ClienteFormsSearch(){
    const [clienteBuscado, setClienteBuscado] = useState({

            clienteId:"",
            nombre:"",
            direccion:"",
            email:""
    })
    const [busqueda, setBusqueda] = useState(false)
    const [dataCliente, setDataCliente] = useState({
            clienteId:""
});
    const handleChange = e=>{
        const value = e.target.value;
        setDataCliente({
            ...dataCliente,
            [e.target.name]: value
        });
    }
    const handleGet =(e)=>{
        e.preventDefault();
        if(!dataCliente){
            alert('Ingrese valores')
        }
        axios.get(`cliente/${dataCliente.clienteId}`)
            .then((response)=>{
                setClienteBuscado(response.data)
            }).catch(()=>{
                alert('No se pudo obtener los clientes')
        })

    }
    return(
        <div className="m-5">
            <Form onSubmit={handleGet}>
                <InputGroup>
                    <FormControl
                        onChange={handleChange}
                        type='text'
                        name='clienteId'
                    placeholder='ID Cliente '/>
                    <Button type='submit' className="bg-black" onClick={()=>{setBusqueda(true)}}>Buscar</Button>
                </InputGroup>
            </Form>
            {busqueda? (
                <div className="m-3">

                    <ListGroup>
                        <ListGroupItem className='d-flex justify-content-between align-items-center'>
                            <div>{clienteBuscado.clienteId}</div>
                                <div>{clienteBuscado.nombre}</div>
                                <div>{clienteBuscado.direccion}</div>
                                <div>{clienteBuscado.email}</div>

                        </ListGroupItem>
                    </ListGroup>
                </div>
            ):(<></>


            )
            }
        </div>

    )
}