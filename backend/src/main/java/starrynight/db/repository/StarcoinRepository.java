package starrynight.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import starrynight.db.entity.Starcoin;
import starrynight.db.entity.Story;

import java.util.List;

public interface StarcoinRepository extends JpaRepository<Starcoin, Long> {
//    int countByStoryId(Story story);
    List<Starcoin> findAllByStoryId(Long storyId);
    Starcoin findByStoryIdAndNum(Long storyId, Long num);
}
