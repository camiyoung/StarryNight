package starrynight.api.dto.game;

import io.swagger.annotations.ApiModelProperty;

import java.util.List;

public class StoryListResponse {
    @ApiModelProperty(
            value = "스토리 목록 정보",
            name = "stories",
            dataType = "List<StorylistData>"
    )
    public List<StoryListData> stories;
}
