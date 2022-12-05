package starrynight.db.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicUpdate
@Entity
@Getter
@Setter
@Table(
        name = "starcoin"
)
public class Starcoin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="starcoin_id")
    private Long id;    //식별자

    @Column(name ="num")
    private Long num;   //코인 번호

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "story_id")
    private Story story;

    @OneToMany(
            mappedBy = "starcoin",
            cascade = {CascadeType.ALL}
    )
    private List<MemberStarcoin> memberStarcoins = new ArrayList();
}
