package PointOfSales.ProjectPOS.Service;

import PointOfSales.ProjectPOS.DTO.ProductDTO;
import PointOfSales.ProjectPOS.Entity.Categories;
import PointOfSales.ProjectPOS.Entity.Products;
import PointOfSales.ProjectPOS.Entity.TransactionDetails;
import PointOfSales.ProjectPOS.Exception.GlobalExceptionHandler;
import PointOfSales.ProjectPOS.Repository.CategoryRepository;
import PointOfSales.ProjectPOS.Repository.ProductRepository;
import PointOfSales.ProjectPOS.Repository.TransactionDetailsRepository;
import PointOfSales.ProjectPOS.Utils.ResponseMessage;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {


    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final TransactionDetailsRepository transactionDetailsRepository;

    @Autowired
    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository,
                          TransactionDetailsRepository transactionDetailsRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.transactionDetailsRepository = transactionDetailsRepository; // Injection repository di sini
    }
    public List<ProductDTO> getAllProducts() {
        List<Products> products = productRepository.findAll();
        return products.stream().map(this::toDTO).collect(Collectors.toList());
    }
    public List<ProductDTO> listAllProductsSorted(String sortBy, String sortOrder) {
        if (!isValidSortBy(sortBy)) {
            throw new IllegalArgumentException("Invalid karena parameter sortBy");
        }
        Sort.Direction direction = Sort.Direction.ASC;
        if (sortOrder != null && sortOrder.equalsIgnoreCase("desc")) {
            direction = Sort.Direction.DESC;
        }
        List<Products> products = productRepository.findAll(Sort.by(direction, sortBy));
        return products.stream().map(this::toDTO).collect(Collectors.toList());
    }

    private boolean isValidSortBy(String sortBy) {
        return sortBy.equals("id") || sortBy.equals("title") || sortBy.equals("price");
    }

    public List<ProductDTO> searchProductsByTitle(String title) {
        List<Products> products = productRepository.findByTitleContainingIgnoreCase(title);
        return products.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<ProductDTO> listProductsByCategory(Long categoryId) {
        List<Products> products = productRepository.findByCategoryId(categoryId);
        return products.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public ResponseMessage addProduct(ProductDTO productDTO) {
        Optional<Categories> optionalCategory = categoryRepository.findById(productDTO.getCategory_id());

        if (productRepository.existsByTitle(productDTO.getTitle())) {
            throw new IllegalArgumentException("Produk dengan nama tersebut sudah ada");
        }

        if (optionalCategory.isPresent()) {
            Categories category = optionalCategory.get();
            Products product = new Products();
            product.setTitle(productDTO.getTitle());
            product.setImage(productDTO.getImage());
            product.setPrice(productDTO.getPrice());
            product.setCategory(category);
            productRepository.save(product);

            return new ResponseMessage("ok", "success");
        } else {
            return new ResponseMessage("error", "Category tidak ditemukan");
        }
    }

    public ResponseMessage updateProduct(Long productId, ProductDTO updatedProductDTO) {
        Optional<Products> optionalProduct = productRepository.findById(productId);

        if (optionalProduct.isPresent()) {
            Products product = optionalProduct.get();

            if (!product.getTitle().equals(updatedProductDTO.getTitle()) && productRepository.existsByTitle(updatedProductDTO.getTitle())) {
                throw new IllegalArgumentException("Produk dengan nama tersebut sudah ada");
            }

            product.setTitle(updatedProductDTO.getTitle());
            product.setImage(updatedProductDTO.getImage());
            product.setPrice(updatedProductDTO.getPrice());

            Optional<Categories> optionalCategory = categoryRepository.findById(updatedProductDTO.getCategory_id());

            if (optionalCategory.isPresent()) {
                Categories category = optionalCategory.get();
                product.setCategory(category);

                productRepository.save(product);

                return new ResponseMessage("ok", "succes");
            } else {
                return new ResponseMessage("error", "Category tidak ditemukan");
            }
        } else {
            return new ResponseMessage("error", "Product tidak ditemukan");
        }
    }

    public boolean deleteProduct(Long productId) {
        Optional<Products> productOptional = productRepository.findById(productId);

        if (productOptional.isPresent()) {
            // Check if the product is associated with any transaction details
            boolean productInUse = transactionDetailsRepository.existsByProductId(productId);

            if (productInUse) {
                throw new RuntimeException("Product with id " + productId + " is associated with transactions and cannot be deleted.");
            }

            try {
                productRepository.deleteById(productId);
                return true;
            } catch (DataIntegrityViolationException e) {
                throw new RuntimeException("Failed to delete product due to data integrity violation.");
            }
        } else {
            throw new EntityNotFoundException("Product with id " + productId + " not found.");
        }
    }

    public ProductDTO getDetailProduct(Long id) {
        Optional<Products> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
            Products product = optionalProduct.get();
            ProductDTO productDTO = new ProductDTO();
            productDTO.setId(product.getId());
            productDTO.setTitle(product.getTitle());
            productDTO.setImage(product.getImage());
            productDTO.setPrice(product.getPrice());
            if (product.getCategory() != null) {
                productDTO.setCategory_id(product.getCategory().getId());
                productDTO.setCategory_name(product.getCategory().getName());
            }
            return productDTO;
        } else {
            return null;
        }
    }

    private ProductDTO toDTO(Products product) {
        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setTitle(product.getTitle());
        dto.setImage(product.getImage());
        dto.setPrice(product.getPrice());

        Categories category = product.getCategory();
        if (category != null) {
            dto.setCategory_id(category.getId());
            dto.setCategory_name(category.getName());
        }
        return dto;
    }
}



