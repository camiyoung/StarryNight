package starrynight.api.controller;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import starrynight.api.dto.room.RoomInfo;
import starrynight.api.service.RoomService;

    /*
    @author 신슬기
    @since 2022. 11. 07.
    */

@RestController
@RequestMapping("/room")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @ApiOperation(value = "방 정보 변경", notes = "방의 가구 구성을 변경한다.")
    @PostMapping("/id/{id}")
    public ResponseEntity<RoomInfo> saveRoom(@ApiParam(value = "방에 대한 정보") @RequestBody RoomInfo roomInfo, @ApiParam(value = "아이디", required = true) @PathVariable Long id) {
        roomService.saveRoom(id, roomInfo);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ApiOperation(value = "방 정보 조회", notes = "방의 정보를 조회한다.", response = RoomInfo.class)
    @GetMapping("/id/{id}")
    public ResponseEntity<RoomInfo> searchRoom(@ApiParam(value = "아이디", required = true) @PathVariable Long id) {
        RoomInfo response = roomService.searchRoom(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ApiOperation(value = "본인을 제외한 랜덤 ID 조회", notes = "랜덤 아이디를 조회한다.")
    @GetMapping("/random/{id}")
    public ResponseEntity<Integer> randomRoom(@ApiParam(value = "아이디", required = true) @PathVariable int id) {
        Integer randomId = roomService.randomRoom(id);
        return new ResponseEntity<>(randomId, HttpStatus.OK);
    }


}
