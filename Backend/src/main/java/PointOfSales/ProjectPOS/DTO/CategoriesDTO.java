package PointOfSales.ProjectPOS.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class CategoriesDTO {
    private Long id;

    @NotEmpty(message = "Category name tidak boleh kosong")
    private String name;
}
