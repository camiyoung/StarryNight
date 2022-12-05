package starrynight.api.dto.game;

import io.swagger.annotations.ApiModelProperty;

public class StoryClearRequest {
    @ApiModelProperty(
            value = "완료한 스토리 번호",
            name = "storyNum",
            dataType = "long"
    )
    public long storyNum;
}
