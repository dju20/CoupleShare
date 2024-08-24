package dju20.coupleshare.service.couple;

import dju20.coupleshare.dto.couple.CoupleCodeRequestDto;
import dju20.coupleshare.dto.couple.CouplePageResponseDto;

public interface CoupleService {

    String generateCoupleCode(String username);

    void matchCouple(String username, CoupleCodeRequestDto coupleCodeRequestDto);

    CouplePageResponseDto getCouplePage(Long coupleId);
}
