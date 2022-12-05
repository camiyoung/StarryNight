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
        name = "furniture"
)
public class Furniture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="furniture_id")
    private Long id;        //식별자
    private String name;    //가구명
    private int price;      //가격

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "furniture_category_id")
    private FurnitureCategory furnitureCategory;

    @OneToMany(
            mappedBy = "furniture",
            cascade = {CascadeType.ALL}
    )
    private List<MemberFurniture> memberFurnitures = new ArrayList();
}
