package starrynight.db.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicUpdate
@DynamicInsert
@Entity
@Getter
@Setter
@Table(
        name = "story"
)
public class Story {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "story_id")
    private Long id;    //식별자

    @Column(name ="constellation")
    private String constellation;   //별자리 이름

    @Column(name ="constellation_eng")
    private String constellationEng;   //별자리 이름(영어)

    @Column(name ="summary")
    private String summary;         //스토리 요약(부제)

    @Column(name ="title")
    private String title;           //스토리 제목

    @OneToMany(
            mappedBy = "story",
            cascade = {CascadeType.ALL}
    )
    private List<Starcoin> starcoins = new ArrayList();

    @OneToMany(
            mappedBy = "story",
            cascade = {CascadeType.ALL}
    )
    private List<MemberStory> memberStories = new ArrayList();

}
