package starrynight.api.dto.game;

import io.swagger.annotations.ApiModelProperty;

public class StoryListData {
    @ApiModelProperty(
            value = "별자리 이름",
            name = "constellation",
            dataType = "String"
    )
    public String constellation;

    @ApiModelProperty(
            value = "스토리 제목",
            name = "title",
            dataType = "String"
    )
    public String title;

    @ApiModelProperty(
            value = "스토리 요약",
            name = "summary",
            dataType = "String"
    )
    public String summary;

    @ApiModelProperty(
            value = "스토리 완료 여부",
            name = "finish",
            dataType = "boolean"
    )
    public boolean finish;

    @ApiModelProperty(
            value = "스토리의 스타코인 총 개수",
            name = "totalStar",
            dataType = "long"
    )
    public long totalStar;

    @ApiModelProperty(
            value = "스토리에서 먹은 스타코인 개수",
            name = "currentStar",
            dataType = "long"
    )
    public long currentStar;

    public StoryListData(
            String title,
            String constellation,
            String summary,
            boolean finish,
            long currentStarcoinCount,
            long totalStarcoinCount){
        this.title = title;
        this.constellation = constellation;
        this.summary = summary;
        this.finish = finish;
        this.currentStar = currentStarcoinCount;
        this.totalStar = totalStarcoinCount;
    }
}
