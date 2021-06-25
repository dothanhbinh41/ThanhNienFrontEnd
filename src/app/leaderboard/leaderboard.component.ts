import { ListResultDto, ListService, PagedResultRequestDto } from '@abp/ng.core';
import { PagedResultDto } from '@abp/ng.core';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { QuestionService } from '@proxy/questions';
import { TopDepartmentDto, UserResultDto } from '@proxy/questions/dtos';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  student: MatTableDataSource<UserResultDto>;
  department: MatTableDataSource<TopDepartmentDto>;
  constructor(private questionService: QuestionService) { }
  departmentColumns: string[] = ['rank', 'name', 'totalMark', 'totalTime', 'student'];
  studentColumns: string[] = ['rank', 'name', 'classroom', 'studentId', 'phone', 'mark', 'time', 'department']; 
  total: number = 0;
  
  ngOnInit() {
    this.questionService.getTopDepartment().subscribe((response: ListResultDto<TopDepartmentDto>) => {
      this.department = new MatTableDataSource(response.items);
    });

    this.loadStudent(0);
  } 
  
  loadStudent(page) {
    this.questionService.getAllUserResults({ maxResultCount: 10, skipCount: page * 10 }).subscribe((response: PagedResultDto<UserResultDto>) => {
      this.total = response.totalCount;
      var res = response.items.map((item, index) => {
        item.rank = index + 1 + page * 10;
        return item;
      });
      this.student = new MatTableDataSource(res);
    });
  }

  changePage($event: PageEvent) { 
    this.loadStudent($event.pageIndex);
  }
}