package starrynight.config.auth;

import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.RandomStringUtils;
import starrynight.db.entity.Member;

@Getter
@Setter
public class MemberProfile {
    private String name;
    private String email;
    private String provider;
    private String nickname;

    public Member toMember() {
        nickname = RandomStringUtils.random(8, true, true);
        return Member.builder()
                .name(name)
                .email(email)
                .provider(provider)
                .nickname(nickname)
                .build();
    }
}
