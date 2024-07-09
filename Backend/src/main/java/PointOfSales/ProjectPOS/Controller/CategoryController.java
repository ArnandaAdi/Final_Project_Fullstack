package PointOfSales.ProjectPOS.Controller;

import PointOfSales.ProjectPOS.DTO.CategoriesDTO;
import PointOfSales.ProjectPOS.DTO.CategoriesDetailsDTO;
import PointOfSales.ProjectPOS.Service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/pos/api")
public class CategoryController {

    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/listcategory")
    public ResponseEntity<List<CategoriesDTO>> getAllCategories() {
        List<CategoriesDTO> categoriesDTOList = categoryService.getAllCategories();
        return new ResponseEntity<>(categoriesDTOList, HttpStatus.OK);
    }

    @GetMapping("/detailcategory/{id}")
    public ResponseEntity<CategoriesDetailsDTO> getCategoryDetail(@PathVariable Long id) {
        CategoriesDetailsDTO categoryDetailDTO = categoryService.getCategoryDetail(id);
        return new ResponseEntity<>(categoryDetailDTO, HttpStatus.OK);
    }

    @PostMapping("/addcategory")
    public ResponseEntity<CategoriesDTO> addCategory(@RequestBody CategoriesDTO categoriesDTO) {
        CategoriesDTO savedCategory = categoryService.saveCategory(categoriesDTO);
        return new ResponseEntity<>(savedCategory, HttpStatus.CREATED);
    }

    @PutMapping("/updatecategory/{id}")
    public ResponseEntity<CategoriesDTO> updateCategory(@PathVariable Long id, @RequestBody CategoriesDTO categoriesDTO) {
        CategoriesDTO updatedCategory = categoryService.updateCategory(id, categoriesDTO);
        return new ResponseEntity<>(updatedCategory, HttpStatus.OK);
    }

    @DeleteMapping("/deletecategory/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
