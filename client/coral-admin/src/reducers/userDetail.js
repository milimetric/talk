import * as actions from '../constants/userDetail';

const initialState = {
  userId: null,
  activeTab: 'all',
  statuses: ['NONE', 'ACCEPTED', 'REJECTED', 'PREMOD'],
  selectedCommentIds: [],
};

export default function banUserDialog(state = initialState, action) {
  switch (action.type) {
  case actions.VIEW_USER_DETAIL:
    return {
      ...state,
      userId: action.userId,
    };
  case actions.HIDE_USER_DETAIL:
    return {
      ...state,
      userId: null,
      selectedCommentIds: [],
    };
  case actions.CLEAR_USER_DETAIL_SELECTIONS:
    return {
      ...state,
      selectedCommentIds: [],
    };
  case actions.CHANGE_USER_DETAIL_STATUSES:
    return {
      ...state,
      activeTab: action.tab,
      statuses: action.statuses,
    };
  case actions.SELECT_USER_DETAIL_COMMENT:
    return {
      ...state,
      selectedCommentIds: [...state.selectedCommentIds, action.id],
    };
  case actions.UNSELECT_USER_DETAIL_COMMENT:
    return {
      ...state,
      selectedCommentIds: state.selectedCommentIds.filter((id) => id !== action.id),
    };
  default:
    return state;
  }
}
