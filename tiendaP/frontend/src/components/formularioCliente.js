import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import axios from "axios";

export default function ClienteForms({clientes, setCliente}){
    const [dataCliente, setDataCliente] = useState({
            clienteId:"",
            nombre:"",
            direccion:"",
            email:""
});
    const handleChange = e=>{
        const value = e.target.value;
        setDataCliente({
            ...dataCliente,
            [e.target.name]: value
        });
    }
    const handleSubmit =(e)=>{
        e.preventDefault();
        if(!dataCliente){
            alert('Ingrese valores')
        }
        axios.post('cliente/crear',{
            //body:dataCliente
            clienteId:dataCliente.clienteId,
            nombre:dataCliente.nombre,
            direccion:dataCliente.direccion,
            email:dataCliente.email
        }).then((response)=>{
            setDataCliente('');
            const {data} = response
            setCliente([
                ...clientes,
                data
            ])
        }).catch((e)=>{
                alert('Nose pudo crear el cliente')
            })
    }
    return(
        <div className="m-5">
            <Form onSubmit={handleSubmit}>
                <InputGroup>
                    <FormControl
                        onChange={handleChange}
                        type='text'
                        name='clienteId'
                    placeholder='ID Cliente '/>
                    <FormControl
                        onChange={handleChange}

                    type='text'
                        name='nombre'
                    placeholder='Nombre'/>
                    <FormControl
                        onChange={handleChange}

                    type='text'
                        name='direccion'
                    placeholder='Dirección '/>
                    <FormControl
                        onChange={handleChange}

                    type='text'
                        name='email'
                    placeholder='Email'/>
                    <Button type='submit' className="bg-black">Guardar datos</Button>
                </InputGroup>
            </Form>
        </div>

    )
}