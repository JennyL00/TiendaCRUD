import React, {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import FormControl from "react-bootstrap/FormControl";
import Modal from "react-bootstrap/Modal";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import {FaEdit, FaTrashAlt} from "react-icons/fa";
import axios from "axios";
import {ModalTitle} from "react-bootstrap";
import ProductoForms from "./formularioProducto";
import ProductoFormsSearch from "./formularioBuscarProducto";
export default function Producto({cliente}){
    const [ventana, setVentana] = useState(false)
    const [productos, setProductos] = useState([])
    const [datosProducto, setDatosProducto] = useState({
            codigo:"",
            nombreProducto:"",
            precio:"",
            unidadDeMedida:"",
            cliente:"",
        cantidad:0
})
    useEffect(()=>{
        axios.get(`cliente/${cliente.id}/producto/lista`)
            .then((response)=>{
                setProductos(response.data)
            }).catch(()=>{
                alert('No se pudo obtener los clientes')
        })
    },[])
    const handleUpdate = async(id,value)=>{
        return axios.put(`/cliente/${cliente.id}/producto/editar/${id}`, value)
            .then((response)=>{
                const {data}=response;
                const newProducto = productos.map(producto =>{
                    if(!producto.id===id){
                        return data;
                    }
                    return producto;
                })
                setProductos(newProducto)
            }).catch(()=>{
                alert("No s pudo guardar los datos")
            })
    }
    const handleClose = ()=>{
        setVentana(false);
    }
    const handleSaveChanges = async ()=>{
        await handleUpdate(datosProducto.id, {
            codigo:datosProducto.codigo,
            nombreProducto:datosProducto.nombreProducto,
            precio:datosProducto.precio,
            unidadDeMedida:datosProducto.unidadDeMedida,
            cliente:cliente.id,
            cantidad:parseInt(datosProducto.cantidad)
        });
        handleClose()
    }
    const handleChange = e=>{
        const value = e.target.value;
        setDatosProducto({
            ...datosProducto,
            [e.target.name]: value
        });
    }
    const handleDelete = (id)=>{
        axios.delete(`/cliente/${cliente.id}/producto/borrar/${id}`)
            .then(()=>{
                const nuevoProducto = productos.filter(producto=>{
                    return producto.id !== id
                });
                setProductos(nuevoProducto)
            }).catch(()=>{
                alert('No s epudo borrar')
        })
    }
    return(
        <div className="m-5">
            <h1 className="d-flex justify-content-center align-items-center m-2">Productos de {cliente.nombre}</h1>
            <ProductoFormsSearch/>
            <ProductoForms productos={productos} setProductos={setProductos} clienteid={cliente.id}/>
            <h1>{cliente.id}</h1>
            <ListGroup>
                <ListGroupItem className='d-flex justify-content-between align-items-center'>
                                <div>Nombre</div>
                                <div>Código</div>
                                <div>Precio</div>
                    <div>Cantidad</div>
                                <div>Unidad de medida</div>

                                <div>Acciones</div>
                        </ListGroupItem>
                {productos.map(producto => {
                    return(
                        <ListGroupItem key={producto.id} className='d-flex justify-content-between align-items-center'>
                            <div>{producto.nombreProducto}</div>
                            <div>{producto.codigo}</div>
                            <div>{producto.precio}</div>
                            <div>{producto.cantidad}</div>
                            <div>{producto.unidadDeMedida}</div>
                            <div>
                                <FaEdit
                                onClick={()=>{setDatosProducto(producto); setVentana(true)}}
                                />
                                <FaTrashAlt
                                    onClick={()=>{handleDelete(producto.id)}}
                                    className="m-2"
                                />
                            </div>

                        </ListGroupItem>
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
                    placeholder={datosProducto ? datosProducto.codigo:''}
                    onChange={handleChange}
                    name='codigo'
                />
                <FormControl
                    placeholder={datosProducto? datosProducto.nombreProducto:''}
                    onChange={handleChange}
                    name='nombreProducto'
                />
                <FormControl
                    placeholder={datosProducto ? datosProducto.precio:''}
                    onChange={handleChange}
                    name='precio'
                />
                <FormControl
                    placeholder={datosProducto ? datosProducto.unidadDeMedida:''}
                    onChange={handleChange}
                    name='unidadDeMedida'
                />
                <FormControl
                    placeholder={datosProducto ? datosProducto.cantidad:0}
                    onChange={handleChange}
                    name='cantidad'
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
        </div>
    )
}