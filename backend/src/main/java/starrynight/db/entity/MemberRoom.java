package starrynight.db.entity;

import lombok.*;
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
        name = "member_room"
)
public class MemberRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="member_room_id")
    private Long id;        //식별자

    @OneToMany(
            mappedBy = "memberRoom",
            cascade = {CascadeType.ALL}
    )
    private List<MemberFurniture> memberFurnitures = new ArrayList();

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public MemberRoom(Member member){
        this.member = member;
    }
}
