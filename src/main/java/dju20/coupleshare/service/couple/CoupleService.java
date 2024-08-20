package dju20.coupleshare.service.couple;

import dju20.coupleshare.dto.couple.CoupleCodeRequestDto;

public interface CoupleService {

    String generateCoupleCode(String username);

    void matchCouple(String username, CoupleCodeRequestDto coupleCodeRequestDto);
}
