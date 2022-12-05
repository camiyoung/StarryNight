package starrynight.api.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import starrynight.api.dto.room.RoomInfo;
import starrynight.db.entity.Furniture;
import starrynight.db.entity.Member;
import starrynight.db.entity.MemberFurniture;
import starrynight.db.entity.MemberRoom;
import starrynight.db.repository.*;
import starrynight.enums.Check;
import starrynight.exception.CustomException;
import starrynight.exception.CustomExceptionList;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@Transactional
@RequiredArgsConstructor
public class RoomService {
    private final FurnitureRepository furnitureRepository;
    private final MemberRoomRepository memberRoomRepository;
    private final MemberRepository memberRepository;
    private final MemberFurnitureRepository memberFurnitureRepository;
    private final MemberFurnitureRepositorySupport memberFurnitureRepositorySupport;


    public void saveRoom(Long id, RoomInfo roomInfo) {

        Long roomId = searchMember(id).getMemberRoom().getId();

        //회원 방 정보 초기화->x, y, 사용여부만
        List<MemberFurniture> memberFurnitureList = memberFurnitureRepositorySupport.findBuyItem(id);
        for (MemberFurniture furnitureInfo:memberFurnitureList) {
            furnitureInfo.setX(0);
            furnitureInfo.setY(0);
            furnitureInfo.setReflect(Check.N);
            furnitureInfo.setDisplay(Check.N);
            memberFurnitureRepository.save(furnitureInfo);
        }

        //벽지, 바닥 설정
        MemberFurniture wall = searchMemberFurniture(roomId, searchFurnitureId(roomInfo.getWall()));
        wall.setDisplay(Check.Y);
        MemberFurniture floor = searchMemberFurniture(roomId, searchFurnitureId(roomInfo.getFloor()));
        floor.setDisplay(Check.Y);

        //use:true인 경우 가구 이름으로 조회 후 가구 위치 지정
        for (int i = 0; i < roomInfo.getFurnitures().size(); i++) {
            RoomInfo.FurnitureInfo furnitureInfo = roomInfo.getFurnitures().get(i);
            if (furnitureInfo.isUse()) {
                MemberFurniture furniture = searchMemberFurniture(roomId, searchFurnitureId(furnitureInfo.getName()));
                furniture.setReflect(furnitureInfo.isReflect()==false?Check.N:Check.Y);
                furniture.setDisplay(Check.Y);
                furniture.setX(furnitureInfo.getX());
                furniture.setY(furnitureInfo.getY());
            }
        }
    }

    public RoomInfo searchRoom(Long id) {
        if(!memberRoomRepository.existsByMemberId(id)){
            makeRoom(id);
        }
        RoomInfo response = new RoomInfo();

        //사용하고 있는 벽과 바닥 조회
        response.setWall(memberFurnitureRepositorySupport.findUseItem(id, 1L).get(0).getFurniture().getName());
        response.setFloor(memberFurnitureRepositorySupport.findUseItem(id, 2L).get(0).getFurniture().getName());

        //가구 리스트 조회
        List<MemberFurniture> furnitures = memberFurnitureRepositorySupport.findBuyItem(id);
        List<RoomInfo.FurnitureInfo> furnitureList = new ArrayList<>();
        for (MemberFurniture furniture: furnitures) {
            RoomInfo.FurnitureInfo furnitureInfo = new RoomInfo.FurnitureInfo();
            furnitureInfo.setName(furniture.getFurniture().getName());
            furnitureInfo.setX(furniture.getX());
            furnitureInfo.setY(furniture.getY());
            furnitureInfo.setUse(furniture.getDisplay() != Check.N);
            furnitureInfo.setReflect(furniture.getReflect()!=Check.N);
            furnitureInfo.setCategory(furniture.getFurniture().getFurnitureCategory().getName());
            furnitureList.add(furnitureInfo);
        }
        response.setFurnitures(furnitureList);
        return response;
    }

    public void makeRoom(Long id) {
        if(memberRoomRepository.existsByMemberId(id)) return;
        MemberRoom room = MemberRoom.builder()
                .member(searchMember(id))
                .build();
        memberRoomRepository.save(room);
        List<Furniture> furnitures = furnitureRepository.findAll();
        for (Furniture furniture: furnitures) {
            Check defaultDisplay = Check.N;
            //기본 아이템인 경우 추가
            if (furniture.getName().equals("화이트 벽지") || furniture.getName().equals("기본 바닥")) {
                defaultDisplay = Check.Y;
            }
            memberFurnitureRepository.save(MemberFurniture.builder()
                    .memberRoom(room)
                    .furniture(furniture)
                    .x(0)
                    .y(0)
                    .buy(defaultDisplay)
                    .display(defaultDisplay)
                    .reflect(Check.N)
                    .build());
        }
    }

    public int randomRoom(int id){
        int RandomId = id;
        int memberSize = memberRoomRepository.findAll().size();
        boolean flag = true;
        while(flag) {
            RandomId = getNumber(memberSize+1);
            if((RandomId!=id&&RandomId!=0&&memberRoomRepository.existsByMemberId(Long.valueOf(RandomId))
                    &&searchMember(Long.valueOf(RandomId)).getIsResigned()!="O")||memberSize==1){
                flag = false;
            }
        }
        return RandomId;
    }

    private int getNumber(int range) {
        Random random = new Random();
        random.setSeed(System.currentTimeMillis());
        return random.nextInt(range);
    }

    private Member searchMember(Long id) {
        return memberRepository.findById(id).orElseThrow(() -> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND));
    }

    private Long searchFurnitureId(String name) {
        Furniture furniture = furnitureRepository.findByName(name).orElseThrow(() -> new CustomException(CustomExceptionList.FURNITURE_NOT_FOUND));
        return furniture.getId();
    }

    private MemberFurniture searchMemberFurniture(Long roomId, Long furnitureId) {
        return memberFurnitureRepository.findByMemberRoomIdAndFurnitureId(roomId, furnitureId).orElseThrow(() -> new CustomException(CustomExceptionList.FURNITURE_NOT_FOUND));
    }
}
