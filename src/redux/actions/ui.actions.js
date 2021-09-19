import {
  UI_FETCHING_FALSE,
  UI_FETCHING_TRUE

} from "../../Constants";

export const fetchSignInStart = () => ({
  type: UI_FETCHING_TRUE
})

export const fetchSignInStop = () => ({
  type: UI_FETCHING_FALSE
})