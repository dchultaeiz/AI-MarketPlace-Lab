package com.uade.tpo.e_commerce3.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uade.tpo.e_commerce3.dto.ProductoDTO;
import com.uade.tpo.e_commerce3.dto.ProductoRequestDTO;
import com.uade.tpo.e_commerce3.dto.ProductoResponseDTO;
import com.uade.tpo.e_commerce3.exception.PrecioNegativoException;
import com.uade.tpo.e_commerce3.exception.ProductoNotFoundException;
import com.uade.tpo.e_commerce3.model.Producto;
import com.uade.tpo.e_commerce3.repository.ProductoRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ProductoService {
 
    @Autowired
    private ProductoRepository productoRepository;
    
    public List<Producto> getAllProductos() {
        // lista de entity producutos
        // transformar esa lista de entity productos a una lista de DTO productos
        return productoRepository.findAll();
    }

    public ProductoDTO getProductoById(Long id) {
        Producto producto = productoRepository.findById(id).orElse(null);
        if (producto == null) {
            // TODO: ssanchez - generar excepción personalizada por catergía de error
            // ej: RecursoNotFoundException
            throw new ProductoNotFoundException("Producto no encontrado con id: " + id );
        }
        ProductoDTO productoDTO = new ProductoDTO(producto.getId(), producto.getNombre(), producto.getDescripcion(), producto.getPrecio());
        return productoDTO;
    }

    public void deleteProductoById(Long id) {
        productoRepository.deleteById(id);
    }

    //TODO: aplicar validaciones con excepciones personalizadas
    public ProductoDTO saveProducto(ProductoRequestDTO productoDTO) {
        // try {
        //     if (productoDTO.getPrecio() < 0) {
        //         throw new PrecioNegativoException();
        //     }
            
        // } catch (Exception e) {
        //     // larga mensaje al cliente, envía un email al admin, loguea el error, etc
        //     throw e;
        // }

        // alta de producto; mouse, precio -20000 -> error, no se puede guardar un producto con precio negativo
        if (productoDTO.getPrecio() < 0) {
            //TODO: ssanchez - generar excepción personalizada por catergía de error: ResourceNotFoundException, ArgumentsInvalidException, etc
            //  throw new  ResourceNotFoundException("Producto no encontrado con id: " + id );
            //  throw new  ResourceNotFoundException("Usuario no encontrado con id: " + id );
            // ej: ArgumetosInvalidos("El precio no puede ser negativo")
            throw new PrecioNegativoException();
        }

        // if (productoDTO.getNombre() == null || productoDTO.getNombre().isEmpty()) {
        //     throw new ArgumetosInvalidos("El nombre del producto no puede ser vacío");
        // }
        

        // crea un Entity en base a los datos del DTO
        Producto producto = Producto.builder()
                .nombre(productoDTO.getNombre())
                .descripcion(productoDTO.getDescripcion())
                .precio(productoDTO.getPrecio())
                .stock(productoDTO.getStock())
                .build();
        
        Producto productoAdd= productoRepository.save(producto);
        ProductoDTO productoDTOAdd = new ProductoDTO(productoAdd.getId(), productoAdd.getNombre(), productoAdd.getDescripcion(), productoAdd.getPrecio());
        return productoDTOAdd;
    }


    public ProductoResponseDTO updateProducto(Long id, ProductoRequestDTO productoDTO) {
        // Producto existingProducto = getProductoById(id);
        // if (existingProducto != null) {
        //     existingProducto.setNombre(producto.getNombre());
        //     existingProducto.setDescripcion(producto.getDescripcion());
        //     return productoRepository.save(existingProducto);
        // }
        return null;
    }
}
