package PointOfSales.ProjectPOS.Repository;

import PointOfSales.ProjectPOS.Entity.Products;
import PointOfSales.ProjectPOS.Entity.TransactionDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionDetailsRepository extends JpaRepository<TransactionDetails, Long> {

    List<TransactionDetails> findByTransactionId(Long id);
    List<TransactionDetails> findByProduct(Products product);

    boolean existsByProductId(Long productId);

}
