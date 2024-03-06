import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ViewUser() {
    // Estado para almacenar los detalles del usuario
    const [user, setUser] = useState({
        name: "",
        username: "",
        email: ""
    });

    // Obtenemos el parámetro 'id' de la URL
    const { id } = useParams();

    // Función que se ejecuta al cargar el componente
    useEffect(() => {
        // Cargamos los detalles del usuario
        loadUser();
    }, []);

    // Función para cargar los detalles del usuario desde el servidor
    const loadUser = async () => {
        try {
            // Realizamos una petición GET al servidor para obtener los detalles del usuario con el ID especificado
            const result = await axios.get(`http://localhost:8080/user/${id}`);
            // Actualizamos el estado con los detalles del usuario obtenidos del servidor
            setUser(result.data);
        } catch (error) {
            console.error('Error al cargar los detalles del usuario:', error);
        }
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>User Details</h2>

                    <div className='card'>
                        <div className='card-header'>
                            Details of user id : {id}
                        </div>
                        <ul className='list-group list-group-flush'>
                            <li className='list-group-item'>
                                <b>Name: </b>{user.name}
                            </li>
                            <li className='list-group-item'>
                                <b>Username: </b>{user.username}
                            </li>
                            <li className='list-group-item'>
                                <b>Email: </b>{user.email}
                            </li>
                        </ul>
                    </div>

                    {/* Enlace para volver a la página de inicio */}
                    <Link className='btn btn-primary my-2' to={"/"}>Back to Home</Link>
                </div>
            </div>
        </div>
    );
}
