package com.vn.dating_sim.controller;

import com.vn.dating_sim.dto.ChatRequest;
import com.vn.dating_sim.dto.ChatResponse;
import com.vn.dating_sim.service.GameService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/game")
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @PostMapping("/chat")
    public ChatResponse chat(@RequestBody ChatRequest request) {
        // .message() -> .getMessage() 로 변경!
        String reply = gameService.getCharacterResponse(request.getMessage());
        return new ChatResponse(reply);
    }
}