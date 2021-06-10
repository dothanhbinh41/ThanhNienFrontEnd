import { ConfirmationService, PageAlertService, ToasterService } from '@abp/ng.theme.shared';
import { Component, OnInit } from '@angular/core';
import { QuestionService } from '@proxy/questions';
import { AnswerDto, QuestionDto, ResultDto, SubmitAnswersRequestDto } from '@proxy/questions/dtos';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  phone: string;
  name: string;
  questions: QuestionModel[];
  constructor(private questionService: QuestionService, private toaster: ToasterService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.questionService.getQuestions()
      .subscribe(d =>
        this.questions = d.items.map(c => new QuestionModel(c.id, c.text, c.answers)));
  }

  onSave() {
    var finished = this.questions.filter(d => d.answer != null);
    if (finished.length > 0) {
      return;
    }
    var request: SubmitAnswersRequestDto;
    request = {
      name: this.name,
      time: 123,
      phone: this.phone, answers: finished.map(d => ({ questionId: d.id, answerId: d.answer.id } as ResultDto))
    };


  }

}

export class QuestionModel implements QuestionDto {
  text: string;
  id: number;
  answers: AnswerDto[];
  answer: AnswerDto;
  constructor(id: number, text: string, answers: AnswerDto[]) {
    this.id = id;
    this.text = text;
    this.answers = answers;
  }
}