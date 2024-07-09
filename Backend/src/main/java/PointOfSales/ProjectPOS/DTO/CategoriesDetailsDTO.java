package PointOfSales.ProjectPOS.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CategoriesDetailsDTO {
    private Long id;
    private String name;
    private int totalProducts;
}
