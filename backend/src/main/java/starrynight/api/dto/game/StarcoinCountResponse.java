package starrynight.api.dto.game;

import io.swagger.annotations.ApiModelProperty;

public class StarcoinCountResponse {

    @ApiModelProperty(
            value = "보유중인 스타코인 개수",
            name = "count",
            dataType = "Long"
    )
    public Long count;
}
