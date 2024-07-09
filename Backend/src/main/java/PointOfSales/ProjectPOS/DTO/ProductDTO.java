package PointOfSales.ProjectPOS.DTO;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class ProductDTO {
    @NotBlank(message = "title tidak boleh kosong")
    @Size(max = 100, min = 1, message = "title tidak boleh lebih dari 100 karakter")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "title harus berupa alphabet")
    private String title;

    @NotBlank(message = "URL image tidak boleh kosong")
    private String image;

    @NotNull(message = "price tidak boleh kosong")
    @Positive(message = "price harus lebih besar dari 0")
    private Integer price;

    @NotNull(message = "Id kategori tidak boleh kosong")
    private Long category_id;

    private String category_name;

    private Long id;
}