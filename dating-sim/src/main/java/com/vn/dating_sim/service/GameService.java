package com.vn.dating_sim.service;

import dev.langchain4j.model.chat.ChatLanguageModel;
import org.springframework.stereotype.Service;

@Service
public class GameService {

    private final ChatLanguageModel chatModel;

    public GameService(ChatLanguageModel chatModel) {
        this.chatModel = chatModel;
    }

    public String getCharacterResponse(String userMessage) {

        // 프롬프트 결합 (단순 연결)
        // 나중에는 여기서 '기억(History)'을 붙이게 됩니다.
        String systemPrompt = """
                    [System Prompt]

                """;

        String fullPrompt = systemPrompt + "\n\n[User]: " + userMessage + "\n[Luna]:";

        // AI 응답 생성 (LM Studio 호출)
        return chatModel.generate(fullPrompt);
    }
}