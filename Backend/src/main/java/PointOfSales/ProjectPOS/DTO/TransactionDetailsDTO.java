package PointOfSales.ProjectPOS.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
@Data
public class TransactionDetailsDTO {
    private Long transaction_id;

    @NotNull(message = "Product ID tidak boleh kosong")
    @Positive(message = "Product ID harus lebih besar dari 0")
    private Long product_id;

    private String product_name;

    private Integer product_price;

    @NotNull(message = "Quantity tidak boleh kosong")
    @Positive(message = "Quantity harus lebih besar dari 0")
    private Integer quantity;

    @NotNull(message = "Subtotal tidak boleh kosong")
    @Positive(message = "Subtotal harus lebih besar dari 0")
    private Integer sub_total;
}
