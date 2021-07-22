export enum postTypes {
	FETCH_POST_REQUEST = 'FETCH_POST_REQUEST',
	FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS',
	FETCH_POST_FAILURE = 'FETCH_POST_FAILURE',
}

export interface Post {
	userId: number
	id: number
	title: string
	completed: boolean
}

export interface PostsState {
	pending: boolean
	posts: Post[]
	error: string | null
}

export interface FetchPostsSuccessPayload {
	posts: Post[]
}

export interface FetchPostsFailurePayload {
	error: string
}

export interface FetchPostsRequest {
	type: typeof postTypes.FETCH_POST_REQUEST
}

export type FetchPostsSuccess = {
	type: typeof postTypes.FETCH_POST_SUCCESS
	payload: FetchPostsSuccessPayload
}

export type FetchPostsFailure = {
	type: typeof postTypes.FETCH_POST_FAILURE
	payload: FetchPostsFailurePayload
}

export type PostsActions = FetchPostsRequest | FetchPostsSuccess | FetchPostsFailure
