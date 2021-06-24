import { ListResultDto, ListService, PagedResultRequestDto } from '@abp/ng.core';
import { PagedResultDto } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { QuestionService } from '@proxy/questions';
import { TopDepartmentDto, UserResultDto } from '@proxy/questions/dtos';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  result: PagedResultDto<UserResultDto> = {};
  departmentResult: ListResultDto<TopDepartmentDto> = {};
  constructor(public list: ListService, private questionService: QuestionService) { }

  ngOnInit() {
    this.list.maxResultCount = 10;
    const departmentStreamCreator = () => this.questionService.getAllUserResults({ maxResultCount: this.list.maxResultCount, skipCount: this.list.page * this.list.maxResultCount });
    const departmentResultStreamCreator = () => this.questionService.getTopDepartment();
    this.list.hookToQuery(departmentStreamCreator).subscribe((response: PagedResultDto<UserResultDto>) => {
      this.result.totalCount = response.totalCount;
      this.result.items = response.items.map((item, index) => {
        item.rank = index + 1 + this.list.page * this.list.maxResultCount;
        return item;
      });
    });

    this.list.hookToQuery(departmentResultStreamCreator).subscribe((response: ListResultDto<TopDepartmentDto>) => {
      this.departmentResult = response;
    });
  }
}