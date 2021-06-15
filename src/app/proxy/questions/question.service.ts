import type { CreateQuestionRequestDto, QuestionDto, SubmitAnswersRequestDto, UserResultDto } from './dtos/models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto, PagedResultDto, PagedResultRequestDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  apiName = 'Default';

  getAllUserResults = (request: PagedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<UserResultDto>>({
      method: 'GET',
      url: '/api/app/question/user-results',
      params: { maxResultCount: request.maxResultCount, skipCount: request.skipCount },
    },
    { apiName: this.apiName });

  getQuestions = () =>
    this.restService.request<any, ListResultDto<QuestionDto>>({
      method: 'GET',
      url: '/api/app/question/questions',
    },
    { apiName: this.apiName });

  getResult = (phone: string) =>
    this.restService.request<any, UserResultDto>({
      method: 'GET',
      url: '/api/app/question/result',
      params: { phone },
    },
    { apiName: this.apiName });

  submitAnswers = (request: SubmitAnswersRequestDto) =>
    this.restService.request<any, UserResultDto>({
      method: 'POST',
      url: '/api/app/question/submit-answers',
      body: request,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
