enum MODAL_TYPE {
  ADD_MODAL = 'ADD_MODAL',
  EDIT_MODAL = 'EDIT_MODAL',
  DELETE_MODAL = 'DELETE_MODAL',
}

type TTodo = {
  id: string;
  name: string;
  time: any;
  state: boolean;
};

export { MODAL_TYPE, TTodo };
