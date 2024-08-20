package dju20.coupleshare.controller;

import dju20.coupleshare.dto.user.login.CustomUserDetails;
import dju20.coupleshare.service.couple.CoupleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/couple")
public class CoupleController {
    private final CoupleService coupleService;

    @GetMapping("/code")
    public ResponseEntity<String> sendRequest(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
//        try {
//            coupleService.sendRequest(customUserDetails.getUsername(), coupleRequestDto.getFriendCode());
//            return ResponseEntity.ok().build();
//        }catch (Exception e){
//            return ResponseEntity.badRequest().build();
//        }
        return null;
    }
}
