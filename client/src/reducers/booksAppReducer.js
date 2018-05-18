export default function reducer(
  state = {
    booksApiData: [],
    shouldFetch: true,
    fetched: false,
    userInput: { listingType: "title", searchBoxValue: "", sortBy: "Best Match", maxResults: 10 },
    error: null,
    comingFromInput: false,
    updateMenu: 0,
    updateResults: 0,
    itemInfoForModal: null,
    showItemInfoModal: false,
    isSideBarOpen: false,
    userInfo: { id: null, username: null, email: null },
    userInfoFetched: false,
    favDataFromDB: {},
    hasFetchedFavDataFromDB: false,
  },
  action
) {
  switch (action.type) {
    case "FETCH_BOOKSAPI_REJECTED": {
      return { ...state, fetched: true, error: action.payload, booksApiData: [] };
    }

    case "FETCH_BOOKSAPI_FULFILLED": {
      return {
        ...state,
        shouldFetch: false,
        fetched: true,
        booksApiData: action.payload.booksApiData,
        comingFromInput: false,
      };
    }

    case "FETCH_FAV_DATA_FROM_DATABASE_FULFILLED": {
      return {
        ...state,
        favDataFromDB: action.payload,
        hasFetchedFavDataFromDB: true,
      };
    }

    case "CHANGE_hasFetchedFavDataFromDB": {
      return {
        ...state,
        hasFetchedFavDataFromDB: action.payload,
      };
    }

    case "ADD_FAV_ITEM_TO_DB_FULFILLED": {
      return {
        ...state,
        favDataFromDB: { ...state.favDataFromDB, [action.payload.item_id]: action.payload },
      };
    }

    case "DELETE_FAV_ITEM_FROM_DB_FULFILLED": {
      return {
        ...state,
        favDataFromDB: Object.keys(state.favDataFromDB).reduce((result, key) => {
          if (Number(key) !== Number(action.payload)) {
            result[key] = state.favDataFromDB[key];
          }
          return result;
        }, {}),
      };
    }

    case "RESET_THE_SEARCH_DATA": {
      return {
        ...state,
        fetched: false,
        userInput: { listingType: "title", searchBoxValue: "", sortBy: "Best Match", maxResults: 10 },
        booksApiData: []
      };
    }

    case "EMPTY_FAV_DATA_FROM_DB": {
      return {
        ...state,
        favDataFromDB: {},
        hasFetchedFavDataFromDB: false,
      };
    }


    case "CHANGE_ShouldFetch": {
      return {
        ...state,
        shouldFetch: action.payload,
      };
    }

    case "CHANGE_USERINPUT_SortBy": {
      return {
        ...state,
        userInput: { ...state.userInput, sortBy: action.payload }
      };
    }

    case "CHANGE_USERINPUT_NameOrFoodPairValue": {
      return {
        ...state,
        userInput: { ...state.userInput, listingType: action.payload }
      };
    }

    case "CHANGE_USERINPUT_SearchBoxValue": {
      return {
        ...state,
        userInput: { ...state.userInput, searchBoxValue: action.payload }
      };
    }

    case "CHANGE_USERINPUT_MaxResults": {
      return {
        ...state,
        userInput: { ...state.userInput, maxResults: action.payload }
      };
    }

    case "CHANGE_USERINFO_ID": {
      return {
        ...state,
        userInfo: { ...state.userInfo, id: action.payload },
        userInfoFetched: true,
      };
    }

    case "CHANGE_USERINFO_USERNAME": {
      return {
        ...state,
        userInfo: { ...state.userInfo, username: action.payload }
      };
    }

    case "CHANGE_USERINFO_EMAIL": {
      return {
        ...state,
        userInfo: { ...state.userInfo, email: action.payload }
      };
    }

    case "CHANGE_ComingFromInput": {
      return {
        ...state,
        comingFromInput: action.payload,
      };
    }

    case "UPDATE_MENU": {
      return {
        ...state,
        updateMenu: state.updateMenu + 1,
      };
    }

    case "UPDATE_RESULTS": {
      return {
        ...state,
        updateResults: state.updateResults + 1,
      };
    }

    case "UPDATE_SIDEBAR_STATE": {
      return {
        ...state,
        isSideBarOpen: action.payload,
      };
    }

    case "ZOOM_IMAGE": {
      return {
        ...state,
        itemInfoForModal: action.payload.itemInfoForModal,
        showItemInfoModal: action.payload.showItemInfoModal,
      };
    }

    case "UPDATE_SHOWN_BOOKS_LENGTH": {
      return {
        ...state,
        shownBooksLength: action.payload.shownBooksLength,
      };
    }

    default:
      return state;
  }
}
