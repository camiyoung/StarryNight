package starrynight.api.dto.room;

import java.util.List;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "방 정보", description = "방에 있는 가구 정보")
public class RoomInfo {
    @ApiModelProperty(value = "벽지이름", name = "wall", example = "화이트 벽지", dataType = "String")
    private String wall;

    @ApiModelProperty(value = "바닥이름", name = "floor", example = "그린 바닥", dataType = "String")
    private String floor;

    @ApiModelProperty(value = "가구 정보", name = "furnitures")
    private List<FurnitureInfo> furnitures;

    @Getter
    @Setter
    @NoArgsConstructor
    static public class FurnitureInfo{
        @ApiModelProperty(value = "이름", name = "name", example = "강 그림", dataType = "String")
        private String name;
        @ApiModelProperty(value = "x좌표", name = "x", example = "2", dataType = "int")
        private int x;
        @ApiModelProperty(value = "y좌표", name = "y", example = "3", dataType = "int")
        private int y;
        @ApiModelProperty(value = "사용여부", name = "use", example = "true", dataType = "boolean")
        private boolean use;
        @ApiModelProperty(value = "반전여부", name = "reflect", example = "false", dataType = "boolean")
        private boolean reflect;
        @ApiModelProperty(value = "카테고리", name = "category", example = "벽걸이", dataType = "String")
        private String category;

    }
}
