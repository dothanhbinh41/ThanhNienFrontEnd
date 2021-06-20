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
  password?: string;
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
  classroom?: string;
  studentId?: string;
  name?: string;
  phone?: string;
  answers: ResultDto[];
}

export interface UserResultDto {
  classroom?: string;
  studentId?: string;
  name?: string;
  phone?: string;
  time: number;
  mark: number;
  rank?: number;
}
