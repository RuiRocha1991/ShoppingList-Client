import {
  SHOPPING_LIST_CREATE_EDIT_CLOSE,
  SHOPPING_LIST_CREATE_OPEN,
  SHOPPING_LIST_DELETE_OPEN,
  SHOPPING_LIST_DELETE_SUCCESS,
  SHOPPING_LIST_EDIT_OPEN,
  SHOPPING_LIST_FETCH_ALL,
  SHOPPING_LIST_FETCH_ALL_SUCCESS,
  SHOPPING_LIST_FETCHING_CATEGORIES_FALSE,
  SHOPPING_LIST_FETCHING_CATEGORIES_TRUE,
  SHOPPING_LIST_PURCHASES_ADD_ITEMS,
  SHOPPING_LIST_PURCHASES_CHANGE_QUANTITY_SELECTED_LIST,
  SHOPPING_LIST_PURCHASES_CHANGE_QUANTITY_UNSELECTED_LIST,
  SHOPPING_LIST_PURCHASES_CHECK_ITEM_TO_ADD,
  SHOPPING_LIST_PURCHASES_CHECK_ITEM_TO_REMOVE,
  SHOPPING_LIST_PURCHASES_DIALOG_CLOSE,
  SHOPPING_LIST_PURCHASES_DIALOG_OPEN,
  SHOPPING_LIST_PURCHASES_REMOVE_ITEMS,
  SHOPPING_LIST_PURCHASES_SORT_SELECTED_ITEMS,
  SHOPPING_LIST_PURCHASES_SORT_UNSELECTED_ITEMS
} from '../../Constants'

const initialState = {
  shoppingLists: [],
  dialogToCreateEditList: {
    isOpen: false,
    shoppingList: undefined,
  },
  categories: {
    isFetching: false,
    data: []
  },
  deleteDialog: {
    isOpen: false,
    shoppingList: undefined
  },
  purchases: {
    shoppingList: undefined,
    isOpen: false,
    itemsTransactions: {
      unselectedList: [],
      selectedList: []
    }
  }
}

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const updateRank = (field, list) => {
  let previous = {};
  for (let index in list) {
    if (index > 0 ) {
      previous = list[index - 1];
      if (list[index][field] <= previous[field]) {
        list[index][field] = randomIntFromInterval(previous[field] + 1, previous[field] + 50)
      }
    }
  }
  return list;
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOPPING_LIST_FETCH_ALL:
      return {
        ...state,
        shoppingLists: action.payload.shoppingLists
      }
    case SHOPPING_LIST_CREATE_OPEN:
      return {
        ...state,
        dialogToCreateEditList: {
          ...state.dialogToCreateEditList,
          isOpen: true,
        }
      }
    case SHOPPING_LIST_CREATE_EDIT_CLOSE:
      return {
        ...state,
        dialogToCreateEditList: {
          ...state.dialogToCreateEditList,
          shoppingList: undefined,
          isOpen: false,
        }
      }
    case SHOPPING_LIST_FETCHING_CATEGORIES_TRUE:
      return {
        ...state,
        categories: {
          ...state.categories,
          isFetching: true
        }
      }
    case SHOPPING_LIST_FETCHING_CATEGORIES_FALSE:
      return {
        ...state,
        categories: {
          isFetching: false,
          data: action.payload.categories.categories
        }
      }
    case SHOPPING_LIST_FETCH_ALL_SUCCESS:
      return {
        ...state,
        shoppingLists: action.payload
      }
    case SHOPPING_LIST_EDIT_OPEN:
      return {
        ...state,
        dialogToCreateEditList: {
          isOpen: true,
          shoppingList: action.payload,
        },
      }
    case SHOPPING_LIST_DELETE_OPEN:
      return {
        ...state,
        deleteDialog: {
          isOpen: true,
          shoppingList: action.payload
        }
      }
    case SHOPPING_LIST_DELETE_SUCCESS:
      return {
        ...state,
        deleteDialog: {
          isOpen: false,
          shoppingList: undefined
        }
      }
    case SHOPPING_LIST_PURCHASES_DIALOG_OPEN:
      return {
        ...state,
        purchases: {
          ...state.purchases,
          isOpen: true,
          shoppingList: action.payload
        }
      }
    case SHOPPING_LIST_PURCHASES_DIALOG_CLOSE:
      return {
        ...state,
        purchases: {
          ...state.purchases,
          isOpen: false,
          shoppingList: undefined
        }
      }
    case SHOPPING_LIST_PURCHASES_SORT_UNSELECTED_ITEMS:
      return {
        ...state,
        purchases: {
          ...state.purchases,
          shoppingList: {
            ...state.purchases.shoppingList,
            unselectedItems: updateRank('rankWhenUnselected', action.payload)
          }
        }
      }
    case SHOPPING_LIST_PURCHASES_SORT_SELECTED_ITEMS:
      return {
        ...state,
        purchases: {
          ...state.purchases,
          shoppingList: {
            ...state.purchases.shoppingList,
            selectedItems: updateRank('rankWhenSelected', action.payload)
          }
        }
      }
    case SHOPPING_LIST_PURCHASES_ADD_ITEMS: {
      const {unselectedList} = state.purchases.itemsTransactions;
      console.log(unselectedList);
      const selectedItems = state.purchases.shoppingList.selectedItems.concat(
          state.purchases.shoppingList.unselectedItems.filter(
              item => unselectedList.includes(item._id)));
      selectedItems.sort((a,b) => (a.rankWhenSelected > b.rankWhenSelected) ? 1 : ((b.rankWhenSelected > a.rankWhenSelected) ? -1 : 0));
      const unselectedItems = state.purchases.shoppingList.unselectedItems.filter(
          item => !unselectedList.includes(item._id));



      return {
        ...state,
        purchases: {
          ...state.purchases,
          shoppingList: {
            ...state.purchases.shoppingList,
            selectedItems: selectedItems,
            unselectedItems: unselectedItems,
          },
          itemsTransactions: {
            ...state.purchases.itemsTransactions,
            unselectedList:[]
          }
        }
      }
    }
    case SHOPPING_LIST_PURCHASES_REMOVE_ITEMS: {
      const {selectedList} = state.purchases.itemsTransactions;
      const unselecteditems = state.purchases.shoppingList.unselectedItems.concat(
          state.purchases.shoppingList.selectedItems.filter(
              item => selectedList.includes(item._id)));
      unselecteditems.sort((a,b) => (a.rankWhenUnselected > b.rankWhenUnselected) ? 1 : ((b.rankWhenUnselected > a.rankWhenUnselected) ? -1 : 0));
      const selectedItems = state.purchases.shoppingList.selectedItems.filter(
          item => !selectedList.includes(item._id));
      return {
        ...state,
        purchases: {
          ...state.purchases,
          shoppingList: {
            ...state.purchases.shoppingList,
            unselectedItems:unselecteditems ,
            selectedItems: selectedItems,
          },
          itemsTransactions: {
            ...state.purchases.itemsTransactions,
            selectedList:[]
          }
        }
      }
    }
    case SHOPPING_LIST_PURCHASES_CHANGE_QUANTITY_UNSELECTED_LIST:
      return {
        ...state,
        purchases: {
          ...state.purchases,
          shoppingList: {
            ...state.purchases.shoppingList,
            unselectedItems: state.purchases.shoppingList.unselectedItems.map(item => {
              if (item._id === action.payload.id) {
                return {
                  ...item,
                  quantity: action.payload.quantity
                }
              }
              return item;
            }),
          }
        }
      }
    case SHOPPING_LIST_PURCHASES_CHANGE_QUANTITY_SELECTED_LIST:
      return {
        ...state,
        purchases: {
          ...state.purchases,
          shoppingList: {
            ...state.purchases.shoppingList,
            selectedItems: state.purchases.shoppingList.selectedItems.map(item => {
              if (item._id === action.payload.id) {
                return {
                  ...item,
                  quantity: action.payload.quantity
                }
              }
              return item;
            }),
          }
        }
      }
    case SHOPPING_LIST_PURCHASES_CHECK_ITEM_TO_ADD: {
      const {isChecked, id} = action.payload;
      const {itemsTransactions} = state.purchases;
      if (isChecked) {
        itemsTransactions.unselectedList.push(id);
      } else {
        itemsTransactions.unselectedList = itemsTransactions.unselectedList.filter(
            itemId => itemId !== id);
      }
      return {
        ...state,
        purchases: {
          ...state.purchases,
          itemsTransactions: {
            ...itemsTransactions,
          }
        }
      }
    }
    case SHOPPING_LIST_PURCHASES_CHECK_ITEM_TO_REMOVE: {
      const {isChecked, id} = action.payload;
      const {itemsTransactions} = state.purchases;

      if (isChecked) {
        itemsTransactions.selectedList.push(id);
      } else {
        itemsTransactions.selectedList = itemsTransactions.selectedList.filter(
            itemId => itemId !== id)
      }
      return {
        ...state,
        purchases: {
          ...state.purchases,
          itemsTransactions: {
            ...itemsTransactions,
          }
        }
      }
    }

    default:
      return state;
  }
}