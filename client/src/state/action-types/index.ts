export enum ActionType {
    // Code fragment
    SET_SEARCH_PHRASE = "set_search_phrase",
    SET_TAG = "set_tag",
    SET_LOADING = "set_loading",
    FETCH_CODE_FRAGMENTS = "fetch_code_fragments",
    SET_ABORT_TOKEN_FETCH_CODE_FRAGMENTS = "set_abort_token_fetch_code_fragments",
    SET_SCRAPER_TYPE = "set_scraper_type",
    SET_EXECUTION_TIME = "set_execution_time",
    CLEAR_DATA = "clear_data",

    // User session
    LOGIN="login",
    LOGOUT="logout",
}