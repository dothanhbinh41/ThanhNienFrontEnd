import { ListService, PagedResultRequestDto } from '@abp/ng.core';
import { PagedResultDto } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { QuestionService } from '@proxy/questions';
import { UserResultDto } from '@proxy/questions/dtos';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  result: PagedResultDto<UserResultDto> = {};
  constructor(public list: ListService, private questionService: QuestionService) { }

  ngOnInit() {
    this.list.maxResultCount = 40;
    const departmentStreamCreator = () => this.questionService.getAllUserResults({ maxResultCount: this.list.maxResultCount, skipCount: this.list.page * 40 });

    this.list.hookToQuery(departmentStreamCreator).subscribe((response: PagedResultDto<UserResultDto>) => {
      this.result = response;
    });
  }

}
