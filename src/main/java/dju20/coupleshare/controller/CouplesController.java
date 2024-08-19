package dju20.coupleshare.controller;

import dju20.coupleshare.dto.couples.CoupleRequestDto;
import dju20.coupleshare.dto.users.login.CustomUserDetails;
import dju20.coupleshare.service.couple.CoupleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/couples")
public class CouplesController {
    private final CoupleService coupleService;

    @PostMapping("/send-request")
    public ResponseEntity<String> sendRequest(@AuthenticationPrincipal CustomUserDetails customUserDetails,
                                      @RequestBody CoupleRequestDto coupleRequestDto) {
        try {
            coupleService.sendRequest(customUserDetails.getUsername(), coupleRequestDto.getFriendCode());
            return ResponseEntity.ok().build();
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }
}
