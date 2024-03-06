package com.ulloadev.controller;

import com.ulloadev.exception.UserNotFoundException;
import com.ulloadev.model.User;
import com.ulloadev.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {
    // Inyección de dependencia del repositorio de usuarios
    @Autowired
    private UserRepository userRepository;

    // Método para agregar un nuevo usuario
    @PostMapping("/user")
    User newUser(@RequestBody User newUser) {
        return userRepository.save(newUser);
    }

    // Método para obtener todos los usuarios
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Método para obtener un usuario por su ID
    @GetMapping("/user/{id}")
    public User getUserById (@PathVariable Long id) {
        // Busca el usuario por su ID en el repositorio y lo devuelve
        // Si no encuentra el usuario, lanza una excepción UserNotFoundException
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    // Método para actualizar un usuario
    @PutMapping("/users/{id}")
    User updateUser(@RequestBody User newUser, @PathVariable Long id) {
        // Busca el usuario por su ID en el repositorio
        // Si lo encuentra, actualiza sus datos con los proporcionados y lo guarda en el repositorio
        // Si no encuentra el usuario, lanza una excepción UserNotFoundException
        return userRepository.findById(id)
                .map((user)-> {
                    user.setUsername(newUser.getUsername());
                    user.setName(newUser.getName());
                    user.setEmail(newUser.getEmail());
                    return userRepository.save(user);
                }).orElseThrow(() -> new UserNotFoundException(id));
    }

    // Método para eliminar un usuario por su ID
    @DeleteMapping("/user/{id}")
    String deleteUser(@PathVariable Long id) {
        // Verifica si el usuario con el ID dado existe en el repositorio
        // Si no existe, lanza una excepción UserNotFoundException
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException(id);
        }
        // Si existe, elimina el usuario del repositorio y devuelve un mensaje de éxito
        userRepository.deleteById(id);
        return "User with id "+id+ " has been deleted.";
    }
}
