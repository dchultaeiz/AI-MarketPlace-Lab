package com.uade.tpo.e_commerce3.service;

import java.util.NoSuchElementException;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.uade.tpo.e_commerce3.dto.LoginRequest;
import com.uade.tpo.e_commerce3.dto.RegisterRequest;
import com.uade.tpo.e_commerce3.model.Role;
import com.uade.tpo.e_commerce3.model.Usuario;
import com.uade.tpo.e_commerce3.repository.UsuarioRepository;
import com.uade.tpo.e_commerce3.security.JwtUtil;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;


@Service
@Transactional
@RequiredArgsConstructor
public class AuthenticationService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    /**
     * Método que realiza el registro de un nuevo usuario en el sistema.
     * 
     * Este método es responsable de realizar el procedimiento completo de registro,
     * validando unicidad del email, creando el usuario con datos encriptados, 
     * 
     * FLUJO DE EJECUCIÓN:
     * 1. Valida que el email no esté duplicado en el sistema
     * 2. Construye una nueva entidad Usuario con el patrón Builder
     * 3. Encripta la contraseña usando BCrypt (algoritmo seguro resistente a ataques de fuerza bruta)
     * 4. Asigna automáticamente el rol de usuario básico (USER)
     * 5. Persiste el usuario en la base de datos dentro de una transacción
     * 6. Retorna un mensaje de confirmación
     * 
     * @param request objeto RegisterRequest que contiene:
     *                - nombre: nombre del usuario a registrar
     *                - apellido: apellido del usuario a registrar
     *                - email: email único del usuario (validado en PASO 1)
     *                - password: contraseña en texto plano que será encriptada
     * @return "User registered successfully" - mensaje de confirmación del registro exitoso
     * @throws RuntimeException si el email ya existe en el sistema 
     *TODO: implementar excepción personalizada EmailException y manejar con @ControllerAdvice
     */
    public String register(RegisterRequest ususarioRegisterDTO) {

        // ==================== PASO 1: VALIDACIÓN DE EMAIL ÚNICO ====================
        // Verifica que el email proporcionado no esté ya registrado en la base de datos.
        if (usuarioRepository.existsByEmail(ususarioRegisterDTO.getEmail())) {
            //TODO: ssanchez - crear exception personalizada EmailException y manejar con @ControllerAdvice
            // Si el email ya existe, se lanza una excepción.
            throw new RuntimeException("El email ya existe en la base de datos");
        }

        // ==================== PASO 2: CONSTRUCCIÓN DEL OBJETO USUARIO ====================
        // Se utiliza el patrón BUILDER para construir el entinty desde un dto
        // 
        // VENTAJAS del patrón Builder:
        // - Código más legible y autoexplicativo (cada línea muestra qué atributo se está asignando)
        // - Evita tener constructores con demasiados parámetros
        // - Evita el repetitivo boilerplate code de setters
        // - Facilita el mantenimiento si se agregan más campos en el futuro
        // 
        // Ejemplo de alternativa sin Builder (código repetitivo no recomendado):
        // Usuario usuario = new Usuario();
        // usuario.setNombre(ususarioRegisterDTO.getNombre());
        // usuario.setApellido(ususarioRegisterDTO.getApellido());
        // usuario.setEmail(ususarioRegisterDTO.getEmail());
        // usuario.setPassword(passwordEncoder.encode(ususarioRegisterDTO.getPassword()));
        // usuario.setRole(Role.USER);

        // builder elimina poner set en cada campo, es más limpio y fácil de leer
        Usuario usuario = Usuario.builder()
                //santos
                .nombre(ususarioRegisterDTO.getNombre())
                //sanchez
                .apellido(ususarioRegisterDTO.getApellido())
                //ssanchez@gmail.com
                .email(ususarioRegisterDTO.getEmail())
                // encripta la pass para guardar en db
                //1234
                .password(passwordEncoder.encode(ususarioRegisterDTO.getPassword()))
                // asigna el rol de usuario básico (USER) por defecto
                .role(Role.USER)
                .build();

        // ==================== PASO 3: PERSISTENCIA EN LA BASE DE DATOS ====================
        // Guarda el usuario en la base de datos a través del UsuarioRepository.
        usuarioRepository.save(usuario);
        
        //TODO: crear un DTO de respuesta 
        // return new AuthResponse(usuario.getEmail(), usuario.getNombre());
        return "User registered successfully";
    }

    /**
     * autentica un usuario existente y genera un token JWT.
     * 
     * Valida las credenciales (email y contraseña) contra la base de datos
     * Extrae los roles/permisos del usuario autenticado
     * Genera un token JWT con la información de autenticación
     * Retorna el token al cliente para futuras solicitudes autenticadas
     * 
     * @param request objeto LoginRequest que contiene:
     *                - email: identificador único del usuario
     *                - password: contraseña en texto plano (será encriptada internamente para validación)
     * @return token JWT (JSON Web Token) que el cliente debe usar para autenticarse en solicitudes futuras
     * @throws UsernameNotFoundException si el usuario (email) no existe en la base de datos
     * @throws BadCredentialsException si la contraseña proporcionada es incorrecta
     * @throws NoSuchElementException si no se encuentra el usuario después de la autenticación exitosa
     */
    public String authenticate(LoginRequest request) {
        
        // authenticationManager definido en SecurityConfig 
        // este método valida las credenciales  authenticationManager.authenticate
        // AuthenticationManager utiliza internamente 
        //      SecurityConfig.userDetailsService() para cargar el usuario y 
        //      PasswordEncoder para verificar la contraseña
        authenticationManager.authenticate(
                // UsernamePasswordAuthenticationToken:  Representa las credenciales NO autenticadas del usuario
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()));

        // obtiene info del usuario autenticado (email, roles) para generar el token JWT
        Usuario user = usuarioRepository.findByEmail(request.getEmail()).orElseThrow();
        
        // Obtiene la lista de roles/permisos del usuario autenticado
        Set<String> roles = user.getAuthorities().stream()
                .map(grantedAuthority -> grantedAuthority.getAuthority())
                .collect(Collectors.toSet());

        // Genera un token JWT (JSON Web Token) que será enviado al cliente
        // JWT (JSON Web Token):
        // - Estructura: [header].[payload].[signature]
        // - Contiene información encriptada sobre el usuario (email, roles)
        // - Tiene expiration time (vencimiento después de cierto tiempo)
        //
        //TODO: devolver un dto
        // return new AuthResponse(tokenStr, "Bearer", user.getEmail());
        return jwtUtil.generateToken(user.getEmail(), roles);
    }
}
