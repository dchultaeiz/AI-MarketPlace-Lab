package com.uade.tpo.e_commerce3.config;

import com.uade.tpo.e_commerce3.model.Producto;
import com.uade.tpo.e_commerce3.model.Role;
import com.uade.tpo.e_commerce3.model.Usuario;
import com.uade.tpo.e_commerce3.repository.ProductoRepository;
import com.uade.tpo.e_commerce3.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@Profile("h2")
public class DataInitializer {

    @Bean
    CommandLineRunner initData(
            UsuarioRepository usuarioRepository,
            ProductoRepository productoRepository,
            PasswordEncoder passwordEncoder
    ) {
        return args -> {

            if (usuarioRepository.count() == 0) {
                usuarioRepository.save(Usuario.builder()
                        .nombre("Daniel")
                        .apellido("Admin")
                        .email("daniel@test.com")
                        .password(passwordEncoder.encode("123456"))
                        .role(Role.ADMIN)
                        .build());

                usuarioRepository.save(Usuario.builder()
                        .nombre("Usuario")
                        .apellido("Demo")
                        .email("user01@test.com")
                        .password(passwordEncoder.encode("123456"))
                        .role(Role.USER)
                        .build());
            }
            
            if (productoRepository.count() == 0) {
                productoRepository.save(Producto.builder()
                        .nombre("Notebook Lenovo ThinkPad")
                        .descripcion("Notebook empresarial para trabajar sin llorar tanto.")
                        .precio(1200000.0)
                        .stock(5)
                        .build());

                productoRepository.save(Producto.builder()
                        .nombre("Mouse Logitech")
                        .descripcion("Mouse inalámbrico clásico.")
                        .precio(25000.0)
                        .stock(20)
                        .build());

                productoRepository.save(Producto.builder()
                        .nombre("Teclado Mecánico")
                        .descripcion("Teclado para hacer ruido como sala de servidores vieja.")
                        .precio(85000.0)
                        .stock(10)
                        .build());

                productoRepository.save(Producto.builder()
                        .nombre("Monitor 24 pulgadas")
                        .descripcion("Monitor Full HD para desarrollo y demo.")
                        .precio(180000.0)
                        .stock(8)
                        .build());

                productoRepository.save(Producto.builder()
                        .nombre("Auriculares USB")
                        .descripcion("Auriculares para sobrevivir a reuniones.")
                        .precio(45000.0)
                        .stock(15)
                        .build());
            }

            
            System.out.println(">>> DATA INITIALIZER H2 EJECUTADO");
            System.out.println(">>> Usuarios existentes: " + usuarioRepository.count());
            System.out.println(">>> Productos existentes: " + productoRepository.count());
        };
    }
}