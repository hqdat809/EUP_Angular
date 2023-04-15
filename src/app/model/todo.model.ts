type TTodo = {
  id: string;
  name: string;
  time: any;
  state: boolean;
};

enum ETodoModalType {
  ADD_MODAL = 'ADD_MODAL',
  DELETE_MODAL = 'DELETE_MODAL',
}

enum ETodoFilterType {
  ALL = 'ALL',
  DONE = 'DONE',
  DOING = 'DOING',
}

export { TTodo, ETodoModalType, ETodoFilterType };
