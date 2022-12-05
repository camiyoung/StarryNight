package starrynight.api.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import starrynight.api.dto.game.StarcoinCountResponse;
import starrynight.api.dto.game.StarcoinListData;
import starrynight.api.dto.game.StarcoinListResponse;
import starrynight.api.dto.game.StoryListData;
import starrynight.db.entity.*;
import starrynight.db.repository.*;
import starrynight.enums.Check;
import starrynight.exception.CustomException;
import starrynight.exception.CustomExceptionList;

import javax.transaction.Transactional;
import java.sql.SQLOutput;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class GameService {
    final MemberRepository memberRepository;
    final StarcoinRepository starcoinRepository;
    final MemberStarcoinRepository memberStarcoinRepository;
    final StoryRepository storyRepository;
    final MemberStoryRepository memberStoryRepository;

    public GameService(MemberRepository memberRepository, StarcoinRepository starcoinRepository, MemberStarcoinRepository memberStarcoinRepository,
                       StoryRepository storyRepository, MemberStoryRepository memberStoryRepository) {
        this.memberRepository = memberRepository;
        this.memberStarcoinRepository = memberStarcoinRepository;
        this.memberStoryRepository = memberStoryRepository;
        this.storyRepository = storyRepository;
        this.starcoinRepository = starcoinRepository;
    }

    public Long getStarcoinCount(Long id){
        Member member = findMemberById(id);
        return member.getStarcoinCount();
    }

    public StarcoinListResponse getStarcoinList(Long id, Long storyId){
        StarcoinListResponse starcoinListResponse = new StarcoinListResponse();
        Member member = findMemberById(id);
        List<Starcoin> starcoins = starcoinRepository.findAllByStoryId(storyId);
            starcoinListResponse.count = starcoins.size();
        starcoinListResponse.starcoins = new ArrayList();
        for(Starcoin starcoin : starcoins){
            //해당 코인이 회원은 어떤 상태인지 데이터 찾기
            MemberStarcoin memberStarcoin = memberStarcoinRepository.findByMemberIdAndStarcoinId(member.getId(), starcoin.getId());
            //찾은 데이터 추가
            starcoinListResponse.starcoins.add(new StarcoinListData(starcoin.getNum(), memberStarcoin.isTaken()));
        }

        return starcoinListResponse;
    }

    public boolean getStoryClear(Long id, String constellationEng){
        Member member = findMemberById(id);
        Story story = storyRepository.findByConstellationEng(constellationEng)
                .orElseThrow(() -> new CustomException(CustomExceptionList.STORY_NOT_FOUND));
        System.out.println("find story in get isStoryClear: " + story);
        MemberStory memberStory = memberStoryRepository.findByMemberIdAndStoryId(member.getId(), story.getId());
        return memberStory.isClear();
    }

    public List<StoryListData> getStoryList(Long id){
        Member member = findMemberById(id);
        List<StoryListData> storyListDatas = new ArrayList();
        //스토리 정보를 데이터 DB에서 가져와서
        List<MemberStory> memberStories = memberStoryRepository.findAllByMemberId(member.getId());
        for(MemberStory memberStory : memberStories){
            //하나씩 보면서 DB에 데이터를 넣자

            //해당 스토리 찾기
            Story story = findStoryByMemberStory(memberStory);

            //해당 스토리의 스타코인 개수 찾기
            List<Starcoin> starcoins = starcoinRepository.findAllByStoryId(story.getId());
            Long starcoinTotal = (long) starcoins.size();
            Long starcoinCurrent = (long) 0;
            for(Starcoin starcoin : starcoins){
                if(memberStarcoinRepository.findByMemberIdAndStarcoinId(member.getId(), starcoin.getId()).isTaken()){
                    starcoinCurrent++;
                }
            }
            //데이터 가공
            StoryListData storyListData = new StoryListData(
                    story.getTitle(),
                    story.getConstellation(),
                    story.getSummary(),
                    memberStory.isClear(),
                    starcoinCurrent,
                    starcoinTotal);

            //List 배열에 넣기
            storyListDatas.add(storyListData);
        }
        System.out.println("HELLO4");
        //Response
        return storyListDatas;
    }
    public void setInitialGameInfor(Member member){
        List<Story> stories = storyRepository.findAll();    //스토리 테이블의 모든 스토리들을 불러오기
        List<MemberStory> memberStories = new ArrayList();
        for(Story story : stories){
            //스토리 하나씩 멤버스토리 테이블에 넣기
            MemberStory memberStory = new MemberStory(member, story);
            memberStories.add(memberStory);

            //해당 스토리의 스타코인들 추가
            setMemberCoinList(member, story.getId());
        }
        //DB에 저장
        memberStoryRepository.saveAll(memberStories);
    }

    public void setMemberCoinList(Member member, Long storyId){
        //스타코인 테이블에서 데이터를 가져오고
        List<Starcoin> starcoins = starcoinRepository.findAllByStoryId(storyId);
        List<MemberStarcoin> memberStarcoins = new ArrayList();
        for(Starcoin starcoin : starcoins){
            //하나씩 멤버스타코인 테이블에 넣는다.
            memberStarcoins.add(new MemberStarcoin(member, starcoin));
        }
        //끝나면 한꺼번에 DB에 추가
        memberStarcoinRepository.saveAll(memberStarcoins);
    }
    public Member findMemberById(Long id){
        return memberRepository.findById(id).orElseThrow(() ->
                new CustomException(CustomExceptionList.MEMBER_NOT_FOUND));
    }

    public Story findStoryByMemberStory(MemberStory memberStory){
        return storyRepository.findById(memberStory.getStory().getId()).orElseThrow(() ->
                new CustomException(CustomExceptionList.STORY_NOT_FOUND));

    }

    public void increaseStarcoinCount(Long id){
        Member member = findMemberById(id);
        member.setStarcoinCount(member.getStarcoinCount()+1);
        memberRepository.save(member);
        return;
    }

    public void updateStarcoinStatus(Long memberId, Long storyId, Long starcoinNum){
        //스토리와 스타코인번호가 일치하는 스타코인 찾기
        Starcoin starcoin = starcoinRepository.findByStoryIdAndNum(storyId, starcoinNum);
        //해당 스타코인을 memberStarcoin에서 찾기
        MemberStarcoin memberStarcoin = memberStarcoinRepository.findByMemberIdAndStarcoinId(memberId, starcoin.getId());
        memberStarcoin.setTaken(true);
        memberStarcoinRepository.save(memberStarcoin);
        return;
    }

    public void setStoryClear(Long id, Long storyId){
        MemberStory memberStory = memberStoryRepository.findByMemberIdAndStoryId(id, storyId);
        memberStory.setClear(true);
        memberStoryRepository.save(memberStory);
        return;
    }
}
