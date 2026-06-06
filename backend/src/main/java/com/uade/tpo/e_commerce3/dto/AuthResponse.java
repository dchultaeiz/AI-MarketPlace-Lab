package com.uade.tpo.e_commerce3.dto;

import com.uade.tpo.e_commerce3.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private String token;
    private Long id;
    private String nombre;
    private String apellido;
    private String email;
    private Role role;
}