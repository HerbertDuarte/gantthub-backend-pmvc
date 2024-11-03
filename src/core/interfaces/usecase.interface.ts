import { PaginateResponse } from 'lib-test-herbert';
export interface UseCase<ENTITY> {
  execute(...args: any[]): Promise<ENTITY | void | PaginateResponse<ENTITY>>;
}
