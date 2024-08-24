package dju20.coupleshare.dto.couple;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CouplePageResponseDto {
    private Long coupleId;
    private String user1Username;
    private String user2Username;
    private String coupleStatus; // 또는 다른 필요
}
