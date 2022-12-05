package starrynight.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import starrynight.db.entity.Story;

import java.util.Optional;


public interface StoryRepository extends JpaRepository<Story, Long> {
    Optional<Story> findByConstellationEng(String constellationEng);
}
