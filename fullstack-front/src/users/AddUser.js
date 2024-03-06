import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddUser() {
    // Hook de navegación
    let navigate = useNavigate();

    // Estado para almacenar los datos del usuario
    const [user, setUser] = useState({
        name: "",  
        username: "",
        email:""
    });

    // Desestructuración de los datos del usuario
    const {name, username, email} = user;

    // Función para actualizar el estado cuando se cambian los datos del usuario
    const onInputChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }; 
    
    // Función para enviar el formulario
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            // Realiza una petición POST al servidor para agregar un nuevo usuario
            await axios.post("http://localhost:8080/user", user);
            // Navega de regreso a la página de inicio después de agregar el usuario exitosamente
            navigate("/");
        } catch (error) {
            console.error('Error al agregar usuario:', error);
        }
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Register User</h2>
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
