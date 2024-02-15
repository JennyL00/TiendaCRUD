import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import FormControl from "react-bootstrap/FormControl";
import Modal from "react-bootstrap/Modal";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import {FaEdit, FaTrashAlt} from "react-icons/fa";
import axios from "axios";
import {ModalTitle} from "react-bootstrap";
import Producto from "./producto";
import ProductoForms from "./formularioProducto";
export default function Cliente({clientes=[], setCliente}){
    const [ventana, setVentana] = useState(false)
    const [ventanaProductos, setVentanaProductos] = useState(false)
    const [clienteProductos, setClienteProductos] = useState(0)
    const [datosCliente, setDatosCliente] = useState({
            id:"",
            clienteId:"",
            nombre:"",
            direccion:"",
            email:""
})
    const handleUpdate = async(id,value)=>{
        return axios.put(`/cliente/editar/${id}`, value)
            .then((response)=>{
                const {data}=response;
                const newCliente = clientes.map(cliente =>{
                    if(!cliente.id===id){
                        return data;
                    }
                    return cliente;
                })
                setCliente(newCliente)
            }).catch(()=>{
                alert("No s pudo guardar los datos")
            })
    }
    const handleClose = ()=>{
        setVentana(false);
    }
    const handleSaveChanges = async ()=>{
        await handleUpdate(datosCliente.id, {
            clienteId:datosCliente.clienteId,
            nombre:datosCliente.nombre,
            direccion:datosCliente.direccion,
            email:datosCliente.email
        });
        handleClose()
    }
    //const handleChange = (e)=>{
      //  setDatosCliente({
        //    ...datosCliente,
          //  body: e.target.value
        //})
    //}
    const handleChange = e=>{
        const value = e.target.value;
        setDatosCliente({
            ...datosCliente,
            [e.target.name]: value
        });
    }
    const handleDelete = (id)=>{
        axios.delete(`/cliente/borrar/${id}`)
            .then(()=>{
                const nuevoCliente = clientes.filter(cliente=>{
                    return cliente.id !== id
                });
                setCliente(nuevoCliente)
            }).catch(()=>{
                alert('No s epudo borrar')
        })
    }
    return(
        <div>
            <ListGroup className='m-5'>
                <ListGroupItem className='d-flex justify-content-between align-items-center'>
                                <div >ID</div>
                                <div>Nombre</div>
                                <div>Dirección</div>
                                <div>Email</div>
                                <div>Acciones</div>
                        </ListGroupItem>
                {clientes.map(cliente => {
                    return(

                        <div>

                            <ListGroupItem key={cliente.id} className='d-flex justify-content-between align-items-center'>
                                <div>{cliente.clienteId}</div>
                                <div>{cliente.nombre}</div>
                                <div>{cliente.direccion}</div>
                                <div>{cliente.email}</div>
                                <div>
                                    <FaEdit
                                onClick={()=>{setDatosCliente(cliente); setVentana(true)}}

                            />
                                <FaTrashAlt
                                onClick={()=>{handleDelete(cliente.id)}}
                                className='m-2'
                                />
                            <Button className='bg-black' onClick={()=>{setVentanaProductos(true); setClienteProductos(cliente)}}>Ver productos</Button>
                                </div>

                            </ListGroupItem>
                        </div>
                    )
                })}

        </ListGroup>

        <Modal show={ventana} onHide={handleClose}>
            <ModalHeader closeButton>
                <ModalTitle>
                    Editar
                </ModalTitle>
            </ModalHeader>
            <Modal.Body>
                <FormControl
                    placeholder={datosCliente ? datosCliente.clienteId:''}
                    onChange={handleChange}
                    name='clienteId'
                />
                <FormControl
                    placeholder={datosCliente ? datosCliente.nombre:''}
                    onChange={handleChange}
                    name='nombre'
                />
                <FormControl
                    placeholder={datosCliente ? datosCliente.direccion:''}
                    onChange={handleChange}
                    name='direccion'
                />
                <FormControl
                    placeholder={datosCliente ? datosCliente.email:''}
                    onChange={handleChange}
                    name='email'
                />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose}>
                    Cerrar
                </Button>
                <Button onClick={handleSaveChanges}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
            {ventanaProductos?(
                <div>
                    <Producto cliente={clienteProductos}/>
                </div>):
                (<div></div>)}
        </div>
    )
}