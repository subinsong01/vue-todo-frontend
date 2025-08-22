export interface SubTaskCreate {
  content: string;
  done?: boolean;
}

export interface SubTaskUpdate {
  id: number;
  content?: string;
  done?: boolean;
}

export interface SubTaskRequest {
  id?: number;
  content?: string;
  done?: boolean;
}
