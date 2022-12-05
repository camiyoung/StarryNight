package starrynight.api.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import starrynight.db.entity.Member;
import starrynight.db.repository.MemberRepository;
import starrynight.exception.CustomException;
import starrynight.exception.CustomExceptionList;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {

    final MemberRepository memberRepository;

    // 닉네임 중복 체크
    public Boolean nicknameDuplicatedCheck(String nickname)
    {
        // 변경하려는 닉네임으로 멤버를 찾아서 있으면 true, 없으면 false 반환
        return memberRepository.findByNickname(nickname).isPresent();
    }

    // 닉네임 변경
    public String changeNickname(String originalNickname, String newNickname)
    {
        // 닉네임 중복체크 있으면 기존 닉네임 반환
        if(memberRepository.findByNickname(newNickname).isPresent())
        {
            return originalNickname;
        }

        // 없으면 기존 닉네임으로 멤버 찾아서 바꾼고 바뀐 닉네임 반환
        Member member = memberRepository.findByNickname(originalNickname)
                .orElseThrow(() -> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND));

        member.setNickname(newNickname);

        return newNickname;
    }

    // 닉네임 조회
    public String findNickname(Long id)
    {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND));

        return member.getNickname();
    }

    // 회원 탈퇴
    public Boolean resignMember(Long id)
    {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND));

        member.setEmail("");
        member.setProvider("");
        member.setNickname("");
        member.setIsResigned("O");
        return true;
    }
}
