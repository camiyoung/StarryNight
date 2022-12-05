package starrynight.api.controller;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import starrynight.api.dto.game.*;
import starrynight.api.service.GameService;

@RestController
@RequestMapping({"/game"})
public class GameController {
    private static final Logger log = LoggerFactory.getLogger(GameController.class);
    final GameService gameService;
    public GameController(final GameService gameService) {
        this.gameService = gameService;
    }

    @ApiOperation(
            value = "스타코인 개수 조회",
            notes = "현재 보유중인 스타코인의 개수를 조회한다."
    )
    @GetMapping({"/starcoin/count/id/{id}"})
    public ResponseEntity<StarcoinCountResponse> findStarcoinCount(@ApiParam(value = "회원아이디PK번호",required = true, example = "1") @PathVariable Long id) {
        StarcoinCountResponse starcoinCountResponse = new StarcoinCountResponse();
        starcoinCountResponse.count = this.gameService.getStarcoinCount(id);
        return new ResponseEntity(starcoinCountResponse, HttpStatus.OK);
    }

    @ApiOperation(
            value = "스토리 목록 받기",
            notes = "회원의 스토리 목록을 받는다."
    )
    @GetMapping({"/story/list/id/{id}"})
    public ResponseEntity<StoryListResponse> findStorylist(
            @ApiParam(value = "회원아이디PK번호", required = true, example = "1")
            @PathVariable Long id){
        StoryListResponse storyListResponse = new StoryListResponse();
        storyListResponse.stories = gameService.getStoryList(id);
        return new ResponseEntity(storyListResponse, HttpStatus.OK);
    }

    @ApiOperation(
            value = "스토리 내 스타코인 정보들",
            notes = "스타코인 정보에 대해 해당 회원의 상태를 받는다."
    )
    @GetMapping({"/starcoin/list/id/{id}/story/{story}"})
    public ResponseEntity<StarcoinListResponse> findStarcoinList(
            @ApiParam(value = "회원아이디PK번호", required = true, example = "1")
            @PathVariable Long id, Long story){
        StarcoinListResponse starcoinListResponse = gameService.getStarcoinList(id, story);
        return new ResponseEntity(starcoinListResponse, HttpStatus.OK);
    }

    @ApiOperation(
            value = "스타코인 획득",
            notes = "스타코인을 획득하였음을 DB에 반영한다.")
    @PutMapping({"starcoin/get/id/{id}/story/{story}"})
    public ResponseEntity getStarcoin(@PathVariable Long id, Long story,
                                      @RequestBody StarcoinGetRequest starcoinGetRequest){
        //멤버의 해당 코인 획득여부를 true로 변경
        gameService.updateStarcoinStatus(id, story, starcoinGetRequest.starcoinNum);
        //멤버 코인 개수 1 증가
        gameService.increaseStarcoinCount(id);
        return new ResponseEntity(HttpStatus.OK);
    }

    @ApiOperation(
            value = "스토리 완료",
            notes = "스토리를 마무리하면 실행한다.")
    @PutMapping({"story/clear/id/{id}"})
    public ResponseEntity setStoryClear(@PathVariable Long id,
                                        @RequestBody StoryClearRequest storyClearRequest){
        gameService.setStoryClear(id, storyClearRequest.storyNum);
        return new ResponseEntity(HttpStatus.OK);
    }

    @ApiOperation(
            value = "스토리 완료여부 조회",
            notes = "해당 별자리(영어)의 게임 스토리를 클리어했는지 조회한다.")
    @GetMapping({"story/clear/id/{id}/constellation/{constellation}"})
    public ResponseEntity<Boolean> getStoryClear(@PathVariable Long id, @PathVariable String constellation){
        return new ResponseEntity(gameService.getStoryClear(id, constellation), HttpStatus.OK);
    }
}
