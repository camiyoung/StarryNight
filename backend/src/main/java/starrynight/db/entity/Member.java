package starrynight.db.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicUpdate
@DynamicInsert
@Entity
@Getter
@Setter
@Table(
        name = "member"
)
@EntityListeners(AuditingEntityListener.class)
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="member_id")
    private Long id;

    @CreatedDate
    @Column(name = "create_date", nullable = false, updatable = false)
    private Date createDate;

    @Column(name = "starcoin_count")
    @ColumnDefault("0")
    private Long starcoinCount;

    @Column(name = "refresh_token")
    private String refreshToken;

    @Column(name = "provider")
    private String provider;

    @Column(name = "email")
    private String email;

    @Column(name = "name")
    private String name;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "is_resigned")
    private String isResigned;

    @OneToMany(
            mappedBy = "member",
            cascade = {CascadeType.ALL}
    )
    private List<MemberStarcoin> memberStarcoins = new ArrayList();

    @OneToMany(
            mappedBy = "member",
            cascade = {CascadeType.ALL}
    )
    private List<MemberStory> memberStories = new ArrayList();

    @OneToOne(mappedBy = "member", fetch = FetchType.LAZY)
    private MemberRoom memberRoom;

    @Builder
    public Member(String name, String email, String provider, String nickname)
    {
        this.name = name;
        this.email = email;
        this.provider = provider;
        this.nickname = nickname;
    }

    //임시로 사용(카카오 로그인 만들어지면 삭제할 것)
    public Member(String nickname){
        this.nickname = nickname;
        this.starcoinCount = (long) 0;
    }

    public Member update(String name, String email) {
        this.name = name;
        this.email = email;

        return this;
    }
}
