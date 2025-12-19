package com.vn.dating_sim.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data                  // Getter, Setter, ToString 자동 생성
@NoArgsConstructor     // 기본 생성자 (JSON 파싱에 필수)
@AllArgsConstructor    // 모든 필드 생성자 (테스트용)
public class ChatRequest {
    private String message;
}