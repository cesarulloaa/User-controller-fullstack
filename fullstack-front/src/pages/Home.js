import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function Home() {
    
    // Estado para almacenar la lista de usuarios
    const [users, setUsers] = useState([]);

    // Obtenemos el parámetro 'id' de la URL (no se utiliza en este componente)
    const { id } = useParams();  

    // Función que se ejecuta al cargar el componente
    useEffect(() => {
        // Carga los usuarios
        loadUsers();
    }, []);

    // Función para cargar la lista de usuarios desde el servidor
    const loadUsers = async () => {
        // Realiza una petición GET al servidor para obtener la lista de usuarios
        const result = await axios.get("http://localhost:8080/users");
        // Actualiza el estado con la lista de usuarios obtenida del servidor
        setUsers(result.data);
    }

    // Función para eliminar un usuario
    const deleteUser = async (id) => {
        // Realiza una petición DELETE al servidor para eliminar el usuario con el ID especificado
        await axios.delete(`http://localhost:8080/user/${id}`);
        // Recarga la lista de usuarios después de eliminar uno
        loadUsers();
    }

    return (
        <div className='container'>
            <div className='py-4'>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // Mapea la lista de usuarios y genera una fila para cada uno
                            users.map((user, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {/* Enlaces para ver y editar el usuario */}
                                        <Link className='btn btn-primary mx-2' to={`/viewusers/${user.id}`}>View</Link>
                                        <Link className='btn btn-outline-primary mx-2' to={`/edituser/${user.id}`}>Edit</Link>
                                        {/* Botón para eliminar el usuario */}
                                        <button className='btn btn-danger mx-2' onClick={() => deleteUser(user.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
