package starrynight.api.dto.game;

import io.swagger.annotations.ApiModelProperty;

import java.util.List;

public class StarcoinGetRequest {
    @ApiModelProperty(
            value = "획득한 스타코인 번호",
            name = "starcoinNum",
            dataType = "long"
    )
    public long starcoinNum;
}
