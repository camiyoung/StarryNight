package starrynight.api.dto.game;

import io.swagger.annotations.ApiModelProperty;

import java.util.List;

public class StarcoinListResponse {
    @ApiModelProperty(
            value = "해당 스토리의 스타코인 획득 정보",
            name = "starcoins",
            dataType = "List<StarcoinlistData>"
    )
    public List<StarcoinListData> starcoins;

    @ApiModelProperty(
            value = "해당 스토리의 스타코인 개수",
            name = "count",
            dataType = "int"
    )
    public int count;

}
