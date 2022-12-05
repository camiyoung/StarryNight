package starrynight.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import starrynight.db.entity.FurnitureCategory;

public interface FurnitureCategoryRepository extends JpaRepository<FurnitureCategory, Long> {
}
