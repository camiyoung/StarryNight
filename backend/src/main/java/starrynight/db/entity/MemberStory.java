package starrynight.db.entity;

import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import starrynight.enums.Check;

import javax.persistence.*;
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicUpdate
@Entity
@Getter
@Setter
@Table(
        name = "member_story"
)
public class MemberStory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="member_story_id")
    private Long id;    //식별자

    @Column(name ="is_clear")
    private boolean isClear;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "story_id")
    private Story story;

    @Builder
    public MemberStory(Member member, Story story){
        this.member = member;
        this.story = story;
        isClear = false;
    }
}
