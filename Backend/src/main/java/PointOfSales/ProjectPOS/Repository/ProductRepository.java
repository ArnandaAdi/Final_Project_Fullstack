package PointOfSales.ProjectPOS.Repository;

import PointOfSales.ProjectPOS.Entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Products, Long> {
    List<Products> findByCategoryId(Long categoryId);
    List<Products> findByTitleContainingIgnoreCase(String title);

    boolean existsByTitle(String title);


}
