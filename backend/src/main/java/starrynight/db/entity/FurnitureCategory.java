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
        name = "furniture_category"
)
public class FurnitureCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="furniture_category_id")
    private Long id;        //식별자
    private String name;            //카테고리 이름

    @OneToMany(
            mappedBy = "furnitureCategory",
            cascade = {CascadeType.ALL}
    )
    private List<Furniture> furnitures = new ArrayList();
}
