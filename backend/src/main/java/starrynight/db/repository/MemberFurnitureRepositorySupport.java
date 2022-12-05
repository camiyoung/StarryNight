package starrynight.db.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;
import starrynight.db.entity.FurnitureCategory;
import starrynight.db.entity.MemberFurniture;
import starrynight.db.entity.MemberRoom;
import starrynight.enums.Check;
import starrynight.exception.CustomException;
import starrynight.exception.CustomExceptionList;
import java.util.List;

import static starrynight.db.entity.QFurniture.furniture;
import static starrynight.db.entity.QMemberFurniture.memberFurniture;

@Repository
public class MemberFurnitureRepositorySupport extends QuerydslRepositorySupport{
    private final JPAQueryFactory queryFactory;
    private final FurnitureCategoryRepository furnitureCategoryRepository;
    private final MemberRoomRepository memberRoomRepository;

    public MemberFurnitureRepositorySupport(JPAQueryFactory queryFactory, FurnitureCategoryRepository furnitureCategoryRepository, MemberRoomRepository memberRoomRepository) {
        super(MemberFurniture.class);
        this.queryFactory = queryFactory;
        this.furnitureCategoryRepository = furnitureCategoryRepository;
        this.memberRoomRepository = memberRoomRepository;
    }

    public Page<MemberFurniture> findStoreItems(Pageable pageable, Long memberId, Long categoryId){
        JPAQuery<MemberFurniture> query = queryFactory
                .selectFrom(memberFurniture)
                .leftJoin(memberFurniture.furniture, furniture)
                .where(eqCategory(categoryId),eqMember(memberId));
        List<MemberFurniture> furnitures = this.getQuerydsl().applyPagination(pageable, query).orderBy(memberFurniture.buy.asc()).orderBy(memberFurniture.id.asc()).fetch();
        return new PageImpl<>(furnitures, pageable, query.fetchCount());
    }

    public List<MemberFurniture> findUseItem(Long memberId, Long categoryId){
        return queryFactory
                .selectFrom(memberFurniture)
                .leftJoin(memberFurniture.furniture, furniture)
                .where(eqCategory(categoryId),eqMember(memberId),memberFurniture.display.eq(Check.Y))
                .fetch();
    }

    public List<MemberFurniture> findBuyItem(Long memberId){
        return queryFactory
                .selectFrom(memberFurniture)
                .leftJoin(memberFurniture.furniture, furniture)
                .where(eqMember(memberId),memberFurniture.buy.eq(Check.Y))
                .fetch();
    }

    private BooleanExpression eqCategory(Long categoryId){
        if(categoryId==0){
            return null;
        }
        FurnitureCategory category = furnitureCategoryRepository.findById(categoryId).orElseThrow(() -> new CustomException(CustomExceptionList.CATEGORY_NOT_FOUND));
        return furniture.furnitureCategory.eq(category);
    }

    private BooleanExpression eqMember(Long memberId){
        MemberRoom memberRoom = memberRoomRepository.findByMemberId(memberId).orElseThrow(() -> new CustomException(CustomExceptionList.ROOM_NOT_FOUND));
        return memberFurniture.memberRoom.eq(memberRoom);
    }
}
