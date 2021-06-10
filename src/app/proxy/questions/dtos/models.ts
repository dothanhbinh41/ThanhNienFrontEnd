import type { EntityDto } from '@abp/ng.core';

export interface AnswerDto extends EntityDto<number> {
  text?: string;
}

export interface CreateAnswerDto {
  text: string;
  correct: boolean;
}

export interface CreateQuestionDto {
  text: string;
  answers: CreateAnswerDto[];
}

export interface CreateQuestionRequestDto {
  questions: CreateQuestionDto[];
}

export interface QuestionDto extends EntityDto<number> {
  text?: string;
  answers: AnswerDto[];
}

export interface ResultDto {
  questionId: number;
  answerId: number;
}

export interface SubmitAnswersRequestDto {
  name?: string;
  phone?: string;
  time: number;
  answers: ResultDto[];
}

export interface UserResultDto {
  name?: string;
  phone?: string;
  time: number;
  mark: number;
}
