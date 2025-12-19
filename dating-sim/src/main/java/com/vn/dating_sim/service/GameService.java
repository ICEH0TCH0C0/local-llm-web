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
        // 1. 캐릭터 설정 (페르소나)
        // 이 부분을 바꾸면 게임 장르가 바뀝니다!
        String systemPrompt = """
            [System]
            당신은 '루나'라는 이름의 까칠한 마법사 소녀입니다.
            말투: 반말을 사용하며, 조금 건방지지만 속마음은 따뜻합니다.
            상황: 유저(여행자)가 당신의 마법 상점에 처음 방문했습니다.
            지시: 2문장 이내로 짧게 대답하세요.
            """;

        // 2. 프롬프트 결합 (단순 연결)
        // 나중에는 여기서 '기억(History)'을 붙이게 됩니다.
        String fullPrompt = systemPrompt + "\n\n[User]: " + userMessage + "\n[Luna]:";

        // 3. AI 응답 생성 (LM Studio 호출)
        return chatModel.generate(fullPrompt);
    }
}