package starrynight.api.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import starrynight.api.dto.member.NicknameChangeRequest;
import starrynight.api.service.MemberService;

@RestController
@RequestMapping({"/member"})
@RequiredArgsConstructor
public class MemberController {

    final MemberService memberService;

    // 닉네임 중복 체크
    @ApiOperation(value = "닉네임 중복 체크", notes = "닉네임 중복을 체크한다.")
    @GetMapping("/nickname/duplicated/{nickname}")
    public ResponseEntity<Boolean> nicknameDuplicatedCheck(@ApiParam(value =  "변경하려는 닉네임", required = true) @PathVariable String nickname)
    {
        return new ResponseEntity<>(memberService.nicknameDuplicatedCheck(nickname), HttpStatus.OK);
    }

    // 닉네임 변경
    @ApiOperation(value = "닉네임 변경", notes = "닉네임을 변경한다.")
    @PutMapping("/nickname")
    public ResponseEntity<String> changeNickname(@ApiParam(value = "닉네임 변경정보", required = true) @RequestBody NicknameChangeRequest request)
    {
        String originalNickname = request.getOriginalNickname();
        String newNickname = request.getNewNickname();
        return new ResponseEntity<>(memberService.changeNickname(originalNickname, newNickname), HttpStatus.OK);
    }


    // 닉네임 조회
    @ApiOperation(value = "닉네임 조회", notes = "멤버 ID로 닉네임을 조회한다.")
    @GetMapping("/nickname/{id}")
    public ResponseEntity<String> findNickname(@ApiParam(value = "아이디", required = true) @PathVariable Long id)
    {
        return new ResponseEntity<>(memberService.findNickname(id), HttpStatus.OK);
    }

    // 회원 탈퇴
    @ApiOperation(value = "회원 탈퇴", notes = "멤버 ID로 회원을 탈퇴한다.")
    @PutMapping("/resign/{id}")
    public ResponseEntity<Boolean> resignMember(@ApiParam(value = "아이디", required = true) @PathVariable Long id)
    {
        return new ResponseEntity<>(memberService.resignMember(id), HttpStatus.OK);
    }
}
