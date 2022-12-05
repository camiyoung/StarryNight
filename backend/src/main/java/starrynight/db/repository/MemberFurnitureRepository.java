package starrynight.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import starrynight.db.entity.MemberFurniture;

import java.util.Optional;

public interface MemberFurnitureRepository extends JpaRepository<MemberFurniture, Integer>, JpaSpecificationExecutor<MemberFurniture> {
    Optional<MemberFurniture> findByMemberRoomIdAndFurnitureId(Long memberRoomId, Long furnitureId);

}
