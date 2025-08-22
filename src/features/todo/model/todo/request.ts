export interface TodoCreate {
  title: string;
  done?: boolean;
}
export interface TodoUpdate {
  id: number;
  title?: string;
  done?: boolean;
}
export interface TodoRequest {
  id?: number;
  title: string;
  done?: boolean;
}
