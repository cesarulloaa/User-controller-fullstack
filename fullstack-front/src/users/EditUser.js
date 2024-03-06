import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
    // Hook de navegación
    let navigate = useNavigate();

    // Obtenemos el parámetro 'id' de la URL
    const { id } = useParams();

    // Estado para almacenar los datos del usuario
    const [user, setUser] = useState({
        name: "",  
        username: "",
        email:""
    });

    // Desestructuración de los datos del usuario
    const { name, username, email } = user;

    // Función para actualizar el estado cuando se cambian los datos del usuario
    const onInputChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }; 

    // Función para cargar los datos del usuario desde el servidor
    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            // Realiza una petición GET al servidor para obtener los detalles del usuario con el ID especificado
            const result = await axios.get(`http://localhost:8080/user/${id}`);
            // Actualiza el estado con los detalles del usuario obtenidos del servidor
            setUser(result.data);
        } catch (error) {
            console.error('Error al cargar los detalles del usuario:', error);
        }
    };

    // Función para enviar el formulario
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            // Realiza una petición PUT al servidor para actualizar los datos del usuario con el ID especificado
            await axios.put(`http://localhost:8080/users/${id}`, user);
            // Navega de regreso a la página de inicio después de actualizar exitosamente los datos del usuario
            navigate("/");
        } catch (error) {
            console.error('Error al editar usuario:', error);
        }
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Edit User</h2>
                    <div className='mb-3'>
                        <label htmlFor='Name' className='form-label'>Name</label>
                        <input type={"text"} className='form-control' placeholder='Enter your name' name='name' value={name} onChange={(e) => onInputChange(e)}/>
                    </div>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor='Username' className='form-label'>Username</label>
                            <input type={"text"} className='form-control' placeholder='Enter your username' name='username' value={username} onChange={(e) => onInputChange(e)}/>
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='Email' className='form-label'>E-mail</label>
                            <input type={"email"} className='form-control' placeholder='Enter your email' name='email' value={email} onChange={(e) => onInputChange(e)} />
                        </div>

                        <button type={"submit"} className="btn btn-outline-primary">Submit</button>
                        <Link className="btn btn-outline-danger mx-2" to={"/"}>Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
