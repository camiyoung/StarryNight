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
        name = "member_furniture"
)
public class MemberFurniture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="member_furniture_id")
    private Long id;        //식별자

    private int x;
    private int y;

    @Enumerated(EnumType.STRING)
    private Check reflect;

    @Enumerated(EnumType.STRING)
    private Check display;

    @Enumerated(EnumType.STRING)
    private Check buy;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_room_id")
    private MemberRoom memberRoom;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "furniture_id")
    private Furniture furniture;

    @Builder
    public MemberFurniture(MemberRoom memberRoom, Furniture furniture, int x, int y,Check reflect, Check display, Check buy){
        this.memberRoom = memberRoom;
        this.furniture = furniture;
        this.x = x;
        this.y = y;
        this.reflect = reflect;
        this.display = display;
        this.buy = buy;
    }
}
