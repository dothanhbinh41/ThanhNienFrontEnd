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
  result : PagedResultDto<UserResultDto>={}; 
  constructor(private questionService: QuestionService) { }

  ngOnInit(){ 
    this.questionService.getAllUserResults({ maxResultCount: 100, skipCount: 0 }).subscribe((response: PagedResultDto<UserResultDto>) => {
      this.result = response; 
    }); 
  }

}
