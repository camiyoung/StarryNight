package starrynight.api.dto.store;

import java.util.List;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "상점 아이템 정보", description = "상점에서 판매되는 아이템 정보")
public class StoreResponse {

    @ApiModelProperty(value = "가구 정보", name = "furnitures")
    List<StoreItem> furnitures;

    @ApiModelProperty(value = "마지막 페이지", name = "totalPage", example = "5", dataType = "int")
    private int totalPage;

    @Getter
    @Setter
    @NoArgsConstructor
    static public class StoreItem{
        @ApiModelProperty(value = "이름", name = "name", example = "강 그림", dataType = "String")
        private String name;
        @ApiModelProperty(value = "가격", name = "price", example = "2", dataType = "int")
        private int price;
        @ApiModelProperty(value = "구매여부", name = "sell", example = "false", dataType = "Boolean")
        private boolean sell;
    }
}
