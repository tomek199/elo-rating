import {Sort} from './sort.model';

export class Page<T> {
  content: Array<T>
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  numberOfElements: number;
  first: boolean;
  sort: Sort;
}
