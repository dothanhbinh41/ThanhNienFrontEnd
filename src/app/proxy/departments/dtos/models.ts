import type { EntityDto } from '@abp/ng.core';

export interface DepartmentDto extends EntityDto<number> {
  name?: string;
}
