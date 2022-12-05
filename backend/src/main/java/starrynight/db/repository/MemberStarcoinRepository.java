package starrynight.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import starrynight.db.entity.MemberStarcoin;
import starrynight.db.entity.Starcoin;

public interface MemberStarcoinRepository extends JpaRepository<MemberStarcoin, Long> {
    MemberStarcoin findByMemberIdAndStarcoinId(Long memberId, Long starcoinId);
}
