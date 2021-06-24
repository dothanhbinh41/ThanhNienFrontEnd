import type { DepartmentDto } from './dtos/models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  apiName = 'Default';

  getAllDepartment = () =>
    this.restService.request<any, ListResultDto<DepartmentDto>>({
      method: 'GET',
      url: '/api/app/department/department',
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
