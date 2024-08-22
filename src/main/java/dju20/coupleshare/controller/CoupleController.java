package dju20.coupleshare.controller;

import dju20.coupleshare.dto.couple.CoupleCodeRequestDto;
import dju20.coupleshare.dto.couple.CoupleCodeResponseDto;
import dju20.coupleshare.dto.user.login.CustomUserDetails;
import dju20.coupleshare.service.couple.CoupleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/couple")
public class CoupleController {
    private final CoupleService coupleService;

    @GetMapping("/code")
    public ResponseEntity<CoupleCodeResponseDto> generateCoupleCode(@AuthenticationPrincipal CustomUserDetails customUserDetails) {

        try {
            String coupleCode = coupleService.generateCoupleCode(customUserDetails.getUsername());
            CoupleCodeResponseDto coupleCodeResponseDto = CoupleCodeResponseDto.builder()
                    .coupleCode(coupleCode).build();
            return ResponseEntity.ok().body(coupleCodeResponseDto);
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/code")
    public ResponseEntity<String> matchCouple(@AuthenticationPrincipal CustomUserDetails customUserDetails, @RequestBody
                                              CoupleCodeRequestDto coupleCodeRequestDto) {
        try {
            coupleService.matchCouple(customUserDetails.getUsername(),coupleCodeRequestDto);
            return ResponseEntity.ok().build();
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }
}
