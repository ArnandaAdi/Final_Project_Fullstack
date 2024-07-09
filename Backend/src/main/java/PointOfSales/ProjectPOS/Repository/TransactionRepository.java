package PointOfSales.ProjectPOS.Repository;

import PointOfSales.ProjectPOS.Entity.Transactions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends JpaRepository<Transactions, Long> {
}
