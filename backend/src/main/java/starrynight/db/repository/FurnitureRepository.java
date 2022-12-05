package starrynight.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import starrynight.db.entity.Furniture;

import java.util.Optional;

public interface FurnitureRepository extends JpaRepository<Furniture, Long> {
    Optional<Furniture> findByName(String name);
}
