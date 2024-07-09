package PointOfSales.ProjectPOS.DTO;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.util.List;

@Data
public class TransactionAddDTO {
    @NotNull(message = "Total amount tidak boleh kosong")
    @Positive(message = "Total amount harus lebih besar dari 0")
    private Integer total_amount;

    @NotNull(message = "Total pay tidak boleh kosong")
    @Positive(message = "Total pay harus lebih besar dari 0")
    private Integer total_pay;

    @Valid
    @NotEmpty(message = "Transaction details tidak boleh kosong")
    private List<TransactionDetailsDTO> transaction_details;
}
