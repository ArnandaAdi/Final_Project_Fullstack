package PointOfSales.ProjectPOS.DTO;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import java.time.LocalDate;

@Data
public class TransactionsDTO {
    private Long id;

    @NotNull(message = "Total amount tidak boleh kosong")
    @Positive(message = "Total amount harus lebih besar dari 0")
    private Integer total_amount;

    @NotNull(message = "Total pay tidak boleh kosong")
    @Positive(message = "Total pay harus lebih besar dari 0")
    private Integer total_pay;

    @NotNull(message = "Tanggal transaksi tidak boleh kosong")
    private LocalDate transaction_date;
}
