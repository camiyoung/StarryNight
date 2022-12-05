package starrynight.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import starrynight.db.entity.Member;
import starrynight.db.entity.MemberStory;

import java.util.List;

public interface MemberStoryRepository extends JpaRepository<MemberStory, Long> {
    List<MemberStory> findAllByMemberId(Long memberId);
    MemberStory findByMemberIdAndStoryId(Long memberId, Long storyId);
}
