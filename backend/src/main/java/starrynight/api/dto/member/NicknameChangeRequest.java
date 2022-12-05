package starrynight.api.dto.member;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "닉네임 변경 정보", description = "변경 전 닉네임과 변경을 원하는 닉네임")
public class NicknameChangeRequest {

    @ApiModelProperty(value = "기존 닉네임", name = "originalNickname", example = "닉네임1", dataType = "String")
    private String originalNickname;

    @ApiModelProperty(value = "변경 하려는 닉네임", name = "newNickname", example = "닉네임2", dataType = "String")
    private String newNickname;
}
