package starrynight.db.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicUpdate;
import starrynight.enums.Check;

import javax.persistence.*;
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicUpdate
@Entity
@Getter
@Setter
@Table(
        name = "member_starcoin"
)
public class MemberStarcoin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="member_starcoin_id")
    private Long id;    //식별자

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "starcoin_id")
    private Starcoin starcoin;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name ="is_taken")
    private boolean isTaken;

    public MemberStarcoin(Member member, Starcoin starcoin){
        this.member = member;
        this.starcoin = starcoin;
        this.isTaken = false;
    }
}
