package PointOfSales.ProjectPOS.Service;

import PointOfSales.ProjectPOS.DTO.CategoriesDTO;
import PointOfSales.ProjectPOS.DTO.CategoriesDetailsDTO;
import PointOfSales.ProjectPOS.Entity.Categories;
import PointOfSales.ProjectPOS.Repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<CategoriesDTO> getAllCategories() {
        List<Categories> categoriesList = categoryRepository.findAll();
        return categoriesList.stream()
                .map(this::mapEntityToDTO)
                .collect(Collectors.toList());
    }

    public CategoriesDTO getCategoryById(Long id) {
        Categories category = getCategory(id);
        return mapEntityToDTO(category);
    }

    public Categories getCategory(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
    }

    public CategoriesDTO saveCategory(CategoriesDTO categoriesDTO) {
        Categories newCategory = new Categories();
        newCategory.setName(categoriesDTO.getName());

        Categories savedCategory = categoryRepository.save(newCategory);
        return mapEntityToDTO(savedCategory);
    }

    public CategoriesDTO updateCategory(Long id, CategoriesDTO categoriesDTO) {
        Categories existingCategory = getCategory(id);
        existingCategory.setName(categoriesDTO.getName());

        Categories updatedCategory = categoryRepository.save(existingCategory);
        return mapEntityToDTO(updatedCategory);
    }

    public void deleteCategory(Long id) {
        Categories category = getCategory(id);
        if (!category.getProducts().isEmpty()) {
            throw new RuntimeException("Category with products cannot be deleted");
        }
        categoryRepository.delete(category);
    }

    public CategoriesDetailsDTO getCategoryDetail(Long id) {
        Optional<Categories> categoryOptional = categoryRepository.findById(id);
        if (categoryOptional.isPresent()) {
            Categories category = categoryOptional.get();
            int totalProducts = category.getProducts().size(); // Counting the related products
            return new CategoriesDetailsDTO(category.getId(), category.getName(), totalProducts);
        } else {
            throw new RuntimeException("Category not found");
        }
    }

    private CategoriesDTO mapEntityToDTO(Categories category) {
        CategoriesDTO categoryDTO = new CategoriesDTO();
        categoryDTO.setId(category.getId());
        categoryDTO.setName(category.getName());
        return categoryDTO;
    }
}
