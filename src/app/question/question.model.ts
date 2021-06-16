import { AnswerDto, QuestionDto } from "@proxy/questions/dtos";

export class QuestionModel implements QuestionDto {
  index:number;
  text: string;
  id: number;
  answers: AnswerDto[];
  answer: AnswerDto;
  constructor(id: number, text: string, answers: AnswerDto[],index:number) {
    this.id = id;
    this.text = text;
    this.answers = answers;
    this.index = index;
  }
}