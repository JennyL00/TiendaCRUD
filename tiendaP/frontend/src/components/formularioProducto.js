import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import axios from "axios";

export default function ProductoForms({clienteid, productos=[], setProductos}){
    const [dataProducto, setDataProducto] = useState({
            codigo:"",
            nombreProducto:"",
            precio:"",
            unidadDeMedida:"",
            cliente:"",
        cantidad:0
});
    const handleChange = e=>{
        const value = e.target.value;
        setDataProducto({
            ...dataProducto,
            [e.target.name]: value
        });
    }
    const handleSubmit =(e)=>{
        e.preventDefault();
        if(!dataProducto){
            alert('Ingrese valores')
        }
        console.log("clienteId",clienteid)
        axios.post(`cliente/${clienteid}/producto/crear`,{
            codigo:dataProducto.codigo,
            nombreProducto:dataProducto.nombreProducto,
            precio:dataProducto.precio,
            unidadDeMedida:dataProducto.unidadDeMedida,
            cliente:clienteid,
            cantidad:parseInt(dataProducto.cantidad)
        }).then((response)=>{
            setDataProducto('');
            const {data} = response
            setProductos([
                ...productos,
                data
            ])
        }).catch((e)=>{
                alert('Nose pudo crear el producto')
            })
    }
    return(
        <div className="m-5">
            <Form onSubmit={handleSubmit}>
            <InputGroup >
                <FormControl
                    onChange={handleChange}
                    type='text'
                    name='codigo'
                    placeholder='Código Producto '/>
                <FormControl
                    onChange={handleChange}
                    type='text'
                    name='nombreProducto'
                    placeholder='Nombre Producto'/>
                <FormControl
                    onChange={handleChange}
                    type='text'
                    name='precio'
                    placeholder='Precio'/>
                <FormControl
                    onChange={handleChange}
                    type='text'
                    name='unidadDeMedida'
                    placeholder='Unidad de Medida'/>
                <FormControl
                    onChange={handleChange}
                    type='text'
                    name='cantidad'
                    placeholder='Cantidad'/>
                <Button type='submit'>Guardar datos</Button>
            </InputGroup>
        </Form>
        </div>

    )
}