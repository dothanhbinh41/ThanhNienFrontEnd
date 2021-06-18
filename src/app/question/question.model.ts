import { AnswerDto, QuestionDto } from '@proxy/questions/dtos';

export class QuestionModel implements QuestionDto {
  index: number;
  text: string;
  id: number;
  answers: AnswerDto[];
  answer: number;
  constructor(id: number, text: string, answers: AnswerDto[], index: number, answer: number) {
    this.id = id;
    this.text = text;
    this.answers = answers;
    this.index = index;
    this.answer = answer;
  }
}
