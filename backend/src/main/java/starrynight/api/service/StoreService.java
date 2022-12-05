package starrynight.api.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import starrynight.api.dto.store.OrderRequest;
import starrynight.api.dto.store.StoreResponse;
import starrynight.db.entity.Furniture;
import starrynight.db.entity.Member;
import starrynight.db.entity.MemberFurniture;
import starrynight.db.repository.*;
import starrynight.enums.Check;
import starrynight.exception.CustomException;
import starrynight.exception.CustomExceptionList;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class StoreService {

    private final MemberRepository memberRepository;
    private final MemberFurnitureRepository memberFurnitureRepository;
    private final MemberFurnitureRepositorySupport memberFurnitureRepositorySupport;
    private final FurnitureRepository furnitureRepository;


    //가구 구매
    public void orderFurniture(OrderRequest orderRequest) {
        //회원 정보와 가구 찾기
        Member member = searchMember(orderRequest.getId());
        Furniture furniture = searchFurniture(orderRequest.getName());

        //가구 구매
        MemberFurniture memberFurniture = searchMemberFurniture(member.getMemberRoom().getId(), furniture.getId());
        memberFurniture.setBuy(Check.Y);
        memberFurnitureRepository.save(memberFurniture);

        //스타 지불
        member.setStarcoinCount(member.getStarcoinCount() - furniture.getPrice());
        memberRepository.save(member);
    }

    public StoreResponse showItems(Long id, Long category, int page) {
        PageRequest pageRequest = PageRequest.of(page, 8); //8개 단위로 페이지네이션
        //카테고리별, 구매하지 않은 아이템부터 8개씩 조회
        Page<MemberFurniture> furnitures = memberFurnitureRepositorySupport.findStoreItems(pageRequest, id, category);
        List<StoreResponse.StoreItem> storeItems = new ArrayList<>();
        for (int i = 0; i < furnitures.getContent().size(); i++) {
            StoreResponse.StoreItem item = new StoreResponse.StoreItem();
            item.setName(furnitures.getContent().get(i).getFurniture().getName());
            item.setPrice(furnitures.getContent().get(i).getFurniture().getPrice());
            item.setSell(furnitures.getContent().get(i).getBuy() != Check.N);
            storeItems.add(item);
        }

        StoreResponse response = new StoreResponse();
        response.setFurnitures(storeItems); //조회한 아이템들
        response.setTotalPage(furnitures.getTotalPages()); //마지막 페이지
        return response;
    }

    private Member searchMember(Long id) {
        return memberRepository.findById(id).orElseThrow(() -> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND));
    }

    private Furniture searchFurniture(String name) {
        return furnitureRepository.findByName(name).orElseThrow(() -> new CustomException(CustomExceptionList.FURNITURE_NOT_FOUND));
    }

    private MemberFurniture searchMemberFurniture(Long roomId, Long furnitureId) {
        return memberFurnitureRepository.findByMemberRoomIdAndFurnitureId(roomId, furnitureId).orElseThrow(() -> new CustomException(CustomExceptionList.FURNITURE_NOT_FOUND));
    }
}
