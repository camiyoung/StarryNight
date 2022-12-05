package starrynight.api.dto.game;

import io.swagger.annotations.ApiModelProperty;

public class StarcoinListData {
    @ApiModelProperty(
            value = "스타코인 획득 여부",
            name = "isTaken",
            dataType = "boolean"
    )
    public boolean isTaken;

    @ApiModelProperty(
            value = "스타코인 번호",
            name = "starcoinNum",
            dataType = "long"
    )
    public long starcoinNum;

    public StarcoinListData(long starcoinNum, boolean isTaken){
        this.starcoinNum = starcoinNum;
        this.isTaken = isTaken;
    }
}
