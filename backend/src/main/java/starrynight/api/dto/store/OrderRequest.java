package starrynight.api.dto.store;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "구매 정보", description = "구매하려는 가구와 구매자")
public class OrderRequest {
    @ApiModelProperty(value = "아이디", name = "id", example = "1", dataType = "Long")
    private Long id;

    @ApiModelProperty(value = "가구이름", name = "wall", example = "화이트 벽지", dataType = "String")
    private String name;
}
