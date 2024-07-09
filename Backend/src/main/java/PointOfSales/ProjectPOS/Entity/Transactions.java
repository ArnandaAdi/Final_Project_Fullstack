package PointOfSales.ProjectPOS.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "transactions")
public class Transactions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Menggunakan IDENTITY untuk auto-generate ID
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    @Column(name = "transaction_date")
    private LocalDate transactionDate;

    @Column(name = "total_amount")
    private int totalAmount;

    @Column(name = "total_pay")
    private int totalPay;

    @OneToMany(mappedBy = "transaction", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    private List<TransactionDetails> transactionDetails;
}
