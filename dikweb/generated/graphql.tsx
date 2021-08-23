import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
	{ [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
	{ [SubKey in K]: Maybe<T[SubKey]> }
const defaultOptions = {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string
	String: string
	Boolean: boolean
	Int: number
	Float: number
	/** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
	DateTime: any
}

export type AddUserABadgeInput = {
	userId: Scalars['String']
	badgeLabel: Scalars['String']
}

export type Attachments = {
	__typename?: 'Attachments'
	id: Scalars['String']
	type: Scalars['String']
	uri: Array<Scalars['String']>
}

export type Badge = {
	__typename?: 'Badge'
	id: Scalars['String']
	label: Scalars['String']
	variant: Scalars['String']
	color?: Maybe<Scalars['String']>
	background?: Maybe<Scalars['String']>
	border?: Maybe<Scalars['String']>
	owners?: Maybe<Array<User>>
}

export type Comment = {
	__typename?: 'Comment'
	id: Scalars['String']
	text: Scalars['String']
	created_at?: Maybe<Scalars['DateTime']>
	updated_at?: Maybe<Scalars['DateTime']>
	author: User
	post: Post
}

export type CommentsDto = {
	__typename?: 'CommentsDTO'
	postId: Scalars['String']
	comment: Comment
	type: Scalars['String']
	commentsSum?: Maybe<Scalars['Int']>
}

export type CreateAttachmentInput = {
	type: Scalars['String']
	uri: Array<Scalars['String']>
}

export type CreateBadgeInput = {
	label: Scalars['String']
	variant?: Maybe<Scalars['String']>
	color?: Maybe<Scalars['String']>
	background?: Maybe<Scalars['String']>
	border?: Maybe<Scalars['String']>
}

export type CreateCommentInput = {
	text: Scalars['String']
	postId: Scalars['String']
}

export type CreatePostInput = {
	caption: Scalars['String']
	type: Scalars['String']
}

export type CreateRelationshipInput = {
	type: Scalars['String']
	description: Scalars['String']
	target: Scalars['String']
}

export type DeleteBadgeResponse = {
	__typename?: 'DeleteBadgeResponse'
	previous_data: Badge
	status: Scalars['String']
	code: Scalars['Float']
}

export type DeletePostResponse = {
	__typename?: 'DeletePostResponse'
	previous_data: Post
	status: Scalars['String']
	code: Scalars['Float']
}

export type DeleteRelationshipResponse = {
	__typename?: 'DeleteRelationshipResponse'
	previous_data: Relationship
	status: Scalars['String']
	code: Scalars['Float']
}

export type DownvoteDto = {
	__typename?: 'DownvoteDTO'
	postId: Scalars['String']
	downvotes: Scalars['Int']
	downvoters: Array<User>
}

export type Mutation = {
	__typename?: 'Mutation'
	updateUser: User
	specialUpdateUser: User
	createBadge: Badge
	addUserABadge: User
	removeBadge: DeleteBadgeResponse
	removeBadgeFromUser: User
	createPost: Post
	updatePost: Post
	removePost: DeletePostResponse
	addPostReachs: Scalars['Int']
	addUpvote: Scalars['Int']
	removeUpvote: Scalars['Int']
	addDownvote: Scalars['Int']
	removeDownvote: Scalars['Int']
	createRelationship: Relationship
	deleteRelationship: DeleteRelationshipResponse
	readNotifications: Scalars['Int']
	createComment: Scalars['Int']
	deleteComment: Scalars['Int']
}

export type MutationUpdateUserArgs = {
	updateUserInput: UpdateUserInput
}

export type MutationSpecialUpdateUserArgs = {
	updateUserInput: UpdateUserInput
	id: Scalars['String']
}

export type MutationCreateBadgeArgs = {
	createBadgeInput: CreateBadgeInput
}

export type MutationAddUserABadgeArgs = {
	addUserABadgeInput: AddUserABadgeInput
}

export type MutationRemoveBadgeArgs = {
	label: Scalars['String']
}

export type MutationRemoveBadgeFromUserArgs = {
	userId: Scalars['String']
	label: Scalars['String']
}

export type MutationCreatePostArgs = {
	createAttachmentInput?: Maybe<CreateAttachmentInput>
	createPostInput: CreatePostInput
}

export type MutationUpdatePostArgs = {
	updatePostInput: UpdatePostInput
}

export type MutationRemovePostArgs = {
	postId: Scalars['String']
}

export type MutationAddPostReachsArgs = {
	postId: Scalars['String']
}

export type MutationAddUpvoteArgs = {
	postId: Scalars['String']
}

export type MutationRemoveUpvoteArgs = {
	postId: Scalars['String']
}

export type MutationAddDownvoteArgs = {
	postId: Scalars['String']
}

export type MutationRemoveDownvoteArgs = {
	postId: Scalars['String']
}

export type MutationCreateRelationshipArgs = {
	createRelationshipInput: CreateRelationshipInput
}

export type MutationCreateCommentArgs = {
	createCommentInput: CreateCommentInput
}

export type MutationDeleteCommentArgs = {
	commentId: Scalars['String']
}

export type Notification = {
	__typename?: 'Notification'
	id: Scalars['String']
	type: Scalars['String']
	read?: Maybe<Scalars['Boolean']>
	authorId: Scalars['String']
	relatedPostId?: Maybe<Scalars['String']>
	created_at?: Maybe<Scalars['DateTime']>
	updated_at?: Maybe<Scalars['DateTime']>
	relatedUser: User
}

export type NotificationsDto = {
	__typename?: 'NotificationsDTO'
	userId: Scalars['String']
	notifications: Array<Notification>
	unread: Scalars['Int']
	read: Scalars['Int']
}

export type Post = {
	__typename?: 'Post'
	id: Scalars['String']
	caption: Scalars['String']
	type?: Maybe<Scalars['String']>
	upvoter?: Maybe<Array<User>>
	downvoter?: Maybe<Array<User>>
	reachs?: Maybe<Array<User>>
	created_at?: Maybe<Scalars['DateTime']>
	updated_at?: Maybe<Scalars['DateTime']>
	author: User
	attachments?: Maybe<Attachments>
	relationship?: Maybe<Relationship>
	comments?: Maybe<Array<Comment>>
}

export type Query = {
	__typename?: 'Query'
	users: Array<User>
	user: User
	getUserById: User
	getMyProfile: User
	badges: Array<Badge>
	badge: Badge
	posts: Array<Post>
	post: Post
	postByAuthorAndId: Post
	getPostReachs: Scalars['Int']
	getPostComments: Array<Comment>
	notifications: NotificationsDto
}

export type QueryUserArgs = {
	username: Scalars['String']
}

export type QueryGetUserByIdArgs = {
	id: Scalars['String']
}

export type QueryBadgeArgs = {
	label: Scalars['String']
}

export type QueryPostArgs = {
	postId: Scalars['String']
}

export type QueryPostByAuthorAndIdArgs = {
	username: Scalars['String']
	postId: Scalars['String']
}

export type QueryGetPostReachsArgs = {
	postId: Scalars['String']
}

export type QueryGetPostCommentsArgs = {
	postId: Scalars['String']
}

export type Relationship = {
	__typename?: 'Relationship'
	id: Scalars['String']
	type?: Maybe<Scalars['String']>
	description?: Maybe<Scalars['String']>
	created_at?: Maybe<Scalars['DateTime']>
	updated_at?: Maybe<Scalars['DateTime']>
	partnership?: Maybe<Array<User>>
	posts?: Maybe<Array<Post>>
}

export type Subscription = {
	__typename?: 'Subscription'
	upvoteSubscription: UpvoteDto
	downvoteSubscription: DownvoteDto
	notificationSubscription: NotificationsDto
	commentsSubscription: CommentsDto
}

export type SubscriptionUpvoteSubscriptionArgs = {
	postId: Scalars['String']
}

export type SubscriptionDownvoteSubscriptionArgs = {
	postId: Scalars['String']
}

export type SubscriptionNotificationSubscriptionArgs = {
	userId: Scalars['String']
}

export type SubscriptionCommentsSubscriptionArgs = {
	postId: Scalars['String']
}

export type UpdatePostInput = {
	caption?: Maybe<Scalars['String']>
	type?: Maybe<Scalars['String']>
	id: Scalars['String']
}

export type UpdateUserInput = {
	username?: Maybe<Scalars['String']>
	email?: Maybe<Scalars['String']>
	bio?: Maybe<Scalars['String']>
	avatar_url?: Maybe<Scalars['String']>
}

export type UpvoteDto = {
	__typename?: 'UpvoteDTO'
	postId: Scalars['String']
	upvotes: Scalars['Int']
	upvoters: Array<User>
}

export type User = {
	__typename?: 'User'
	id: Scalars['String']
	username: Scalars['String']
	email: Scalars['String']
	bio?: Maybe<Scalars['String']>
	avatar_url?: Maybe<Scalars['String']>
	created_at?: Maybe<Scalars['DateTime']>
	updated_at?: Maybe<Scalars['DateTime']>
	contents?: Maybe<Array<Post>>
	comments?: Maybe<Array<Comment>>
	upvotes?: Maybe<Array<Post>>
	downvotes?: Maybe<Array<Post>>
	viewed?: Maybe<Array<Post>>
	relationship?: Maybe<Relationship>
	badges?: Maybe<Array<Badge>>
	notifications?: Maybe<Array<Notification>>
}

export type AddDownvoteMutationVariables = Exact<{
	postId: Scalars['String']
}>

export type AddDownvoteMutation = { __typename?: 'Mutation' } & Pick<
	Mutation,
	'addDownvote'
>

export type AddUpvoteMutationVariables = Exact<{
	postId: Scalars['String']
}>

export type AddUpvoteMutation = { __typename?: 'Mutation' } & Pick<
	Mutation,
	'addUpvote'
>

export type CreateCommentMutationVariables = Exact<{
	createCommentInput: CreateCommentInput
}>

export type CreateCommentMutation = { __typename?: 'Mutation' } & Pick<
	Mutation,
	'createComment'
>

export type CreatePostMutationVariables = Exact<{
	createPostinput: CreatePostInput
	createAttachmentInput?: Maybe<CreateAttachmentInput>
}>

export type CreatePostMutation = { __typename?: 'Mutation' } & {
	createPost: { __typename?: 'Post' } & Pick<Post, 'caption' | 'type'> & {
			author: { __typename?: 'User' } & Pick<
				User,
				'id' | 'username' | 'avatar_url'
			>
		}
}

export type DeleteCommentMutationVariables = Exact<{
	commentId: Scalars['String']
}>

export type DeleteCommentMutation = { __typename?: 'Mutation' } & Pick<
	Mutation,
	'deleteComment'
>

export type DeletePostMutationVariables = Exact<{
	postId: Scalars['String']
}>

export type DeletePostMutation = { __typename?: 'Mutation' } & {
	removePost: { __typename?: 'DeletePostResponse' } & Pick<
		DeletePostResponse,
		'status'
	>
}

export type RemoveDownvoteMutationVariables = Exact<{
	postId: Scalars['String']
}>

export type RemoveDownvoteMutation = { __typename?: 'Mutation' } & Pick<
	Mutation,
	'removeDownvote'
>

export type RemoveUpvoteMutationVariables = Exact<{
	postId: Scalars['String']
}>

export type RemoveUpvoteMutation = { __typename?: 'Mutation' } & Pick<
	Mutation,
	'removeUpvote'
>

export type SetCurrentPostReachMutationVariables = Exact<{
	postId: Scalars['String']
}>

export type SetCurrentPostReachMutation = { __typename?: 'Mutation' } & Pick<
	Mutation,
	'addPostReachs'
>

export type UpdateUnreadNotificationsMutationVariables = Exact<{
	[key: string]: never
}>

export type UpdateUnreadNotificationsMutation = {
	__typename?: 'Mutation'
} & Pick<Mutation, 'readNotifications'>

export type GetListOfNotificationsQueryVariables = Exact<{
	[key: string]: never
}>

export type GetListOfNotificationsQuery = { __typename?: 'Query' } & {
	notifications: { __typename?: 'NotificationsDTO' } & Pick<
		NotificationsDto,
		'unread' | 'read'
	> & {
			notifications: Array<
				{ __typename?: 'Notification' } & Pick<
					Notification,
					| 'id'
					| 'type'
					| 'read'
					| 'authorId'
					| 'relatedPostId'
					| 'created_at'
				> & {
						relatedUser: { __typename?: 'User' } & Pick<
							User,
							'id' | 'username' | 'avatar_url'
						>
					}
			>
		}
}

export type GetPostByIdQueryVariables = Exact<{
	postId: Scalars['String']
	username: Scalars['String']
}>

export type GetPostByIdQuery = { __typename?: 'Query' } & {
	postByAuthorAndId: { __typename?: 'Post' } & Pick<
		Post,
		'id' | 'type' | 'caption' | 'created_at'
	> & {
			attachments?: Maybe<
				{ __typename?: 'Attachments' } & Pick<Attachments, 'uri'>
			>
			author: { __typename?: 'User' } & Pick<
				User,
				'id' | 'username' | 'avatar_url'
			> & {
					badges?: Maybe<
						Array<
							{ __typename?: 'Badge' } & Pick<
								Badge,
								| 'id'
								| 'label'
								| 'variant'
								| 'color'
								| 'background'
								| 'border'
							>
						>
					>
				}
		}
}

export type GetPostCaptionAndAttachmentsQueryVariables = Exact<{
	postId: Scalars['String']
}>

export type GetPostCaptionAndAttachmentsQuery = { __typename?: 'Query' } & {
	post: { __typename?: 'Post' } & Pick<Post, 'caption'> & {
			attachments?: Maybe<
				{ __typename?: 'Attachments' } & Pick<Attachments, 'uri'>
			>
			author: { __typename?: 'User' } & Pick<User, 'username'>
		}
}

export type GetPostCommentsQueryVariables = Exact<{
	postId: Scalars['String']
}>

export type GetPostCommentsQuery = { __typename?: 'Query' } & {
	getPostComments: Array<
		{ __typename?: 'Comment' } & Pick<
			Comment,
			'id' | 'text' | 'created_at'
		> & {
				author: { __typename?: 'User' } & Pick<
					User,
					'id' | 'email' | 'username' | 'avatar_url'
				>
			}
	>
}

export type GetPublicFeedReachsQueryVariables = Exact<{
	postId: Scalars['String']
}>

export type GetPublicFeedReachsQuery = { __typename?: 'Query' } & Pick<
	Query,
	'getPostReachs'
>

export type GetPostVotesQueryVariables = Exact<{
	postId: Scalars['String']
}>

export type GetPostVotesQuery = { __typename?: 'Query' } & {
	post: { __typename?: 'Post' } & {
		upvoter?: Maybe<
			Array<{ __typename?: 'User' } & Pick<User, 'id' | 'username'>>
		>
		downvoter?: Maybe<
			Array<{ __typename?: 'User' } & Pick<User, 'id' | 'username'>>
		>
	}
}

export type GetPublicFeedsQueryVariables = Exact<{ [key: string]: never }>

export type GetPublicFeedsQuery = { __typename?: 'Query' } & {
	posts: Array<
		{ __typename?: 'Post' } & Pick<
			Post,
			'id' | 'caption' | 'type' | 'created_at'
		> & {
				author: { __typename?: 'User' } & Pick<
					User,
					'id' | 'username' | 'avatar_url'
				> & {
						badges?: Maybe<
							Array<
								{ __typename?: 'Badge' } & Pick<
									Badge,
									| 'id'
									| 'label'
									| 'variant'
									| 'color'
									| 'background'
									| 'border'
								>
							>
						>
					}
				attachments?: Maybe<
					{ __typename?: 'Attachments' } & Pick<
						Attachments,
						'id' | 'type' | 'uri'
					>
				>
			}
	>
}

export type GetUnreadNotificationsQueryVariables = Exact<{
	[key: string]: never
}>

export type GetUnreadNotificationsQuery = { __typename?: 'Query' } & {
	notifications: { __typename?: 'NotificationsDTO' } & Pick<
		NotificationsDto,
		'unread'
	>
}

export type GetUserBadgeQueryVariables = Exact<{
	username: Scalars['String']
}>

export type GetUserBadgeQuery = { __typename?: 'Query' } & {
	user: { __typename?: 'User' } & {
		badges?: Maybe<
			Array<
				{ __typename?: 'Badge' } & Pick<
					Badge,
					| 'id'
					| 'label'
					| 'variant'
					| 'color'
					| 'background'
					| 'border'
				>
			>
		>
	}
}

export type GetUserProfileQueryVariables = Exact<{
	id: Scalars['String']
}>

export type GetUserProfileQuery = { __typename?: 'Query' } & {
	getUserById: { __typename?: 'User' } & Pick<
		User,
		'id' | 'username' | 'avatar_url'
	>
}

export type CommentsSubscriptionSubscriptionVariables = Exact<{
	postId: Scalars['String']
}>

export type CommentsSubscriptionSubscription = {
	__typename?: 'Subscription'
} & {
	commentsSubscription: { __typename?: 'CommentsDTO' } & Pick<
		CommentsDto,
		'postId' | 'type'
	> & {
			comment: { __typename?: 'Comment' } & Pick<
				Comment,
				'id' | 'text' | 'created_at'
			> & {
					author: { __typename?: 'User' } & Pick<
						User,
						'id' | 'username' | 'email' | 'avatar_url'
					>
				}
		}
}

export type DownvoteSubscriptionVariables = Exact<{
	postId: Scalars['String']
}>

export type DownvoteSubscription = { __typename?: 'Subscription' } & {
	downvoteSubscription: { __typename?: 'DownvoteDTO' } & Pick<
		DownvoteDto,
		'downvotes'
	> & { downvoters: Array<{ __typename?: 'User' } & Pick<User, 'id'>> }
}

export type UnreadNotificationsSubscriptionVariables = Exact<{
	userId: Scalars['String']
}>

export type UnreadNotificationsSubscription = {
	__typename?: 'Subscription'
} & {
	notificationSubscription: { __typename?: 'NotificationsDTO' } & Pick<
		NotificationsDto,
		'userId' | 'unread'
	>
}

export type TotalCommentsSubscriptionSubscriptionVariables = Exact<{
	postId: Scalars['String']
}>

export type TotalCommentsSubscriptionSubscription = {
	__typename?: 'Subscription'
} & {
	commentsSubscription: { __typename?: 'CommentsDTO' } & Pick<
		CommentsDto,
		'postId' | 'commentsSum'
	>
}

export type UpvoteSubscriptionVariables = Exact<{
	postId: Scalars['String']
}>

export type UpvoteSubscription = { __typename?: 'Subscription' } & {
	upvoteSubscription: { __typename?: 'UpvoteDTO' } & Pick<
		UpvoteDto,
		'upvotes'
	> & { upvoters: Array<{ __typename?: 'User' } & Pick<User, 'id'>> }
}

export const AddDownvoteDocument = gql`
	mutation addDownvote($postId: String!) {
		addDownvote(postId: $postId)
	}
`
export type AddDownvoteMutationFn = Apollo.MutationFunction<
	AddDownvoteMutation,
	AddDownvoteMutationVariables
>

/**
 * __useAddDownvoteMutation__
 *
 * To run a mutation, you first call `useAddDownvoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddDownvoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addDownvoteMutation, { data, loading, error }] = useAddDownvoteMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useAddDownvoteMutation(
	baseOptions?: Apollo.MutationHookOptions<
		AddDownvoteMutation,
		AddDownvoteMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useMutation<
		AddDownvoteMutation,
		AddDownvoteMutationVariables
	>(AddDownvoteDocument, options)
}
export type AddDownvoteMutationHookResult = ReturnType<
	typeof useAddDownvoteMutation
>
export type AddDownvoteMutationResult =
	Apollo.MutationResult<AddDownvoteMutation>
export type AddDownvoteMutationOptions = Apollo.BaseMutationOptions<
	AddDownvoteMutation,
	AddDownvoteMutationVariables
>
export const AddUpvoteDocument = gql`
	mutation addUpvote($postId: String!) {
		addUpvote(postId: $postId)
	}
`
export type AddUpvoteMutationFn = Apollo.MutationFunction<
	AddUpvoteMutation,
	AddUpvoteMutationVariables
>

/**
 * __useAddUpvoteMutation__
 *
 * To run a mutation, you first call `useAddUpvoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUpvoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUpvoteMutation, { data, loading, error }] = useAddUpvoteMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useAddUpvoteMutation(
	baseOptions?: Apollo.MutationHookOptions<
		AddUpvoteMutation,
		AddUpvoteMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useMutation<AddUpvoteMutation, AddUpvoteMutationVariables>(
		AddUpvoteDocument,
		options
	)
}
export type AddUpvoteMutationHookResult = ReturnType<
	typeof useAddUpvoteMutation
>
export type AddUpvoteMutationResult = Apollo.MutationResult<AddUpvoteMutation>
export type AddUpvoteMutationOptions = Apollo.BaseMutationOptions<
	AddUpvoteMutation,
	AddUpvoteMutationVariables
>
export const CreateCommentDocument = gql`
	mutation CreateComment($createCommentInput: CreateCommentInput!) {
		createComment(createCommentInput: $createCommentInput)
	}
`
export type CreateCommentMutationFn = Apollo.MutationFunction<
	CreateCommentMutation,
	CreateCommentMutationVariables
>

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      createCommentInput: // value for 'createCommentInput'
 *   },
 * });
 */
export function useCreateCommentMutation(
	baseOptions?: Apollo.MutationHookOptions<
		CreateCommentMutation,
		CreateCommentMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useMutation<
		CreateCommentMutation,
		CreateCommentMutationVariables
	>(CreateCommentDocument, options)
}
export type CreateCommentMutationHookResult = ReturnType<
	typeof useCreateCommentMutation
>
export type CreateCommentMutationResult =
	Apollo.MutationResult<CreateCommentMutation>
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<
	CreateCommentMutation,
	CreateCommentMutationVariables
>
export const CreatePostDocument = gql`
	mutation CreatePost(
		$createPostinput: CreatePostInput!
		$createAttachmentInput: CreateAttachmentInput
	) {
		createPost(
			createPostInput: $createPostinput
			createAttachmentInput: $createAttachmentInput
		) {
			caption
			author {
				id
				username
				avatar_url
			}
			type
		}
	}
`
export type CreatePostMutationFn = Apollo.MutationFunction<
	CreatePostMutation,
	CreatePostMutationVariables
>

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      createPostinput: // value for 'createPostinput'
 *      createAttachmentInput: // value for 'createAttachmentInput'
 *   },
 * });
 */
export function useCreatePostMutation(
	baseOptions?: Apollo.MutationHookOptions<
		CreatePostMutation,
		CreatePostMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(
		CreatePostDocument,
		options
	)
}
export type CreatePostMutationHookResult = ReturnType<
	typeof useCreatePostMutation
>
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<
	CreatePostMutation,
	CreatePostMutationVariables
>
export const DeleteCommentDocument = gql`
	mutation DeleteComment($commentId: String!) {
		deleteComment(commentId: $commentId)
	}
`
export type DeleteCommentMutationFn = Apollo.MutationFunction<
	DeleteCommentMutation,
	DeleteCommentMutationVariables
>

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useDeleteCommentMutation(
	baseOptions?: Apollo.MutationHookOptions<
		DeleteCommentMutation,
		DeleteCommentMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useMutation<
		DeleteCommentMutation,
		DeleteCommentMutationVariables
	>(DeleteCommentDocument, options)
}
export type DeleteCommentMutationHookResult = ReturnType<
	typeof useDeleteCommentMutation
>
export type DeleteCommentMutationResult =
	Apollo.MutationResult<DeleteCommentMutation>
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<
	DeleteCommentMutation,
	DeleteCommentMutationVariables
>
export const DeletePostDocument = gql`
	mutation deletePost($postId: String!) {
		removePost(postId: $postId) {
			status
		}
	}
`
export type DeletePostMutationFn = Apollo.MutationFunction<
	DeletePostMutation,
	DeletePostMutationVariables
>

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDeletePostMutation(
	baseOptions?: Apollo.MutationHookOptions<
		DeletePostMutation,
		DeletePostMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(
		DeletePostDocument,
		options
	)
}
export type DeletePostMutationHookResult = ReturnType<
	typeof useDeletePostMutation
>
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<
	DeletePostMutation,
	DeletePostMutationVariables
>
export const RemoveDownvoteDocument = gql`
	mutation removeDownvote($postId: String!) {
		removeDownvote(postId: $postId)
	}
`
export type RemoveDownvoteMutationFn = Apollo.MutationFunction<
	RemoveDownvoteMutation,
	RemoveDownvoteMutationVariables
>

/**
 * __useRemoveDownvoteMutation__
 *
 * To run a mutation, you first call `useRemoveDownvoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveDownvoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeDownvoteMutation, { data, loading, error }] = useRemoveDownvoteMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useRemoveDownvoteMutation(
	baseOptions?: Apollo.MutationHookOptions<
		RemoveDownvoteMutation,
		RemoveDownvoteMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useMutation<
		RemoveDownvoteMutation,
		RemoveDownvoteMutationVariables
	>(RemoveDownvoteDocument, options)
}
export type RemoveDownvoteMutationHookResult = ReturnType<
	typeof useRemoveDownvoteMutation
>
export type RemoveDownvoteMutationResult =
	Apollo.MutationResult<RemoveDownvoteMutation>
export type RemoveDownvoteMutationOptions = Apollo.BaseMutationOptions<
	RemoveDownvoteMutation,
	RemoveDownvoteMutationVariables
>
export const RemoveUpvoteDocument = gql`
	mutation removeUpvote($postId: String!) {
		removeUpvote(postId: $postId)
	}
`
export type RemoveUpvoteMutationFn = Apollo.MutationFunction<
	RemoveUpvoteMutation,
	RemoveUpvoteMutationVariables
>

/**
 * __useRemoveUpvoteMutation__
 *
 * To run a mutation, you first call `useRemoveUpvoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUpvoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUpvoteMutation, { data, loading, error }] = useRemoveUpvoteMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useRemoveUpvoteMutation(
	baseOptions?: Apollo.MutationHookOptions<
		RemoveUpvoteMutation,
		RemoveUpvoteMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useMutation<
		RemoveUpvoteMutation,
		RemoveUpvoteMutationVariables
	>(RemoveUpvoteDocument, options)
}
export type RemoveUpvoteMutationHookResult = ReturnType<
	typeof useRemoveUpvoteMutation
>
export type RemoveUpvoteMutationResult =
	Apollo.MutationResult<RemoveUpvoteMutation>
export type RemoveUpvoteMutationOptions = Apollo.BaseMutationOptions<
	RemoveUpvoteMutation,
	RemoveUpvoteMutationVariables
>
export const SetCurrentPostReachDocument = gql`
	mutation setCurrentPostReach($postId: String!) {
		addPostReachs(postId: $postId)
	}
`
export type SetCurrentPostReachMutationFn = Apollo.MutationFunction<
	SetCurrentPostReachMutation,
	SetCurrentPostReachMutationVariables
>

/**
 * __useSetCurrentPostReachMutation__
 *
 * To run a mutation, you first call `useSetCurrentPostReachMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetCurrentPostReachMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setCurrentPostReachMutation, { data, loading, error }] = useSetCurrentPostReachMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useSetCurrentPostReachMutation(
	baseOptions?: Apollo.MutationHookOptions<
		SetCurrentPostReachMutation,
		SetCurrentPostReachMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useMutation<
		SetCurrentPostReachMutation,
		SetCurrentPostReachMutationVariables
	>(SetCurrentPostReachDocument, options)
}
export type SetCurrentPostReachMutationHookResult = ReturnType<
	typeof useSetCurrentPostReachMutation
>
export type SetCurrentPostReachMutationResult =
	Apollo.MutationResult<SetCurrentPostReachMutation>
export type SetCurrentPostReachMutationOptions = Apollo.BaseMutationOptions<
	SetCurrentPostReachMutation,
	SetCurrentPostReachMutationVariables
>
export const UpdateUnreadNotificationsDocument = gql`
	mutation updateUnreadNotifications {
		readNotifications
	}
`
export type UpdateUnreadNotificationsMutationFn = Apollo.MutationFunction<
	UpdateUnreadNotificationsMutation,
	UpdateUnreadNotificationsMutationVariables
>

/**
 * __useUpdateUnreadNotificationsMutation__
 *
 * To run a mutation, you first call `useUpdateUnreadNotificationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUnreadNotificationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUnreadNotificationsMutation, { data, loading, error }] = useUpdateUnreadNotificationsMutation({
 *   variables: {
 *   },
 * });
 */
export function useUpdateUnreadNotificationsMutation(
	baseOptions?: Apollo.MutationHookOptions<
		UpdateUnreadNotificationsMutation,
		UpdateUnreadNotificationsMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useMutation<
		UpdateUnreadNotificationsMutation,
		UpdateUnreadNotificationsMutationVariables
	>(UpdateUnreadNotificationsDocument, options)
}
export type UpdateUnreadNotificationsMutationHookResult = ReturnType<
	typeof useUpdateUnreadNotificationsMutation
>
export type UpdateUnreadNotificationsMutationResult =
	Apollo.MutationResult<UpdateUnreadNotificationsMutation>
export type UpdateUnreadNotificationsMutationOptions =
	Apollo.BaseMutationOptions<
		UpdateUnreadNotificationsMutation,
		UpdateUnreadNotificationsMutationVariables
	>
export const GetListOfNotificationsDocument = gql`
	query getListOfNotifications {
		notifications {
			notifications {
				id
				type
				read
				authorId
				relatedPostId
				created_at
				relatedUser {
					id
					username
					avatar_url
				}
			}
			unread
			read
		}
	}
`

/**
 * __useGetListOfNotificationsQuery__
 *
 * To run a query within a React component, call `useGetListOfNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetListOfNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetListOfNotificationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetListOfNotificationsQuery(
	baseOptions?: Apollo.QueryHookOptions<
		GetListOfNotificationsQuery,
		GetListOfNotificationsQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useQuery<
		GetListOfNotificationsQuery,
		GetListOfNotificationsQueryVariables
	>(GetListOfNotificationsDocument, options)
}
export function useGetListOfNotificationsLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		GetListOfNotificationsQuery,
		GetListOfNotificationsQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useLazyQuery<
		GetListOfNotificationsQuery,
		GetListOfNotificationsQueryVariables
	>(GetListOfNotificationsDocument, options)
}
export type GetListOfNotificationsQueryHookResult = ReturnType<
	typeof useGetListOfNotificationsQuery
>
export type GetListOfNotificationsLazyQueryHookResult = ReturnType<
	typeof useGetListOfNotificationsLazyQuery
>
export type GetListOfNotificationsQueryResult = Apollo.QueryResult<
	GetListOfNotificationsQuery,
	GetListOfNotificationsQueryVariables
>
export const GetPostByIdDocument = gql`
	query getPostById($postId: String!, $username: String!) {
		postByAuthorAndId(postId: $postId, username: $username) {
			id
			type
			caption
			attachments {
				uri
			}
			author {
				id
				username
				avatar_url
				badges {
					id
					label
					variant
					color
					background
					border
				}
			}
			created_at
		}
	}
`

/**
 * __useGetPostByIdQuery__
 *
 * To run a query within a React component, call `useGetPostByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostByIdQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useGetPostByIdQuery(
	baseOptions: Apollo.QueryHookOptions<
		GetPostByIdQuery,
		GetPostByIdQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useQuery<GetPostByIdQuery, GetPostByIdQueryVariables>(
		GetPostByIdDocument,
		options
	)
}
export function useGetPostByIdLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		GetPostByIdQuery,
		GetPostByIdQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useLazyQuery<GetPostByIdQuery, GetPostByIdQueryVariables>(
		GetPostByIdDocument,
		options
	)
}
export type GetPostByIdQueryHookResult = ReturnType<typeof useGetPostByIdQuery>
export type GetPostByIdLazyQueryHookResult = ReturnType<
	typeof useGetPostByIdLazyQuery
>
export type GetPostByIdQueryResult = Apollo.QueryResult<
	GetPostByIdQuery,
	GetPostByIdQueryVariables
>
export const GetPostCaptionAndAttachmentsDocument = gql`
	query getPostCaptionAndAttachments($postId: String!) {
		post(postId: $postId) {
			caption
			attachments {
				uri
			}
			author {
				username
			}
		}
	}
`

/**
 * __useGetPostCaptionAndAttachmentsQuery__
 *
 * To run a query within a React component, call `useGetPostCaptionAndAttachmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostCaptionAndAttachmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostCaptionAndAttachmentsQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useGetPostCaptionAndAttachmentsQuery(
	baseOptions: Apollo.QueryHookOptions<
		GetPostCaptionAndAttachmentsQuery,
		GetPostCaptionAndAttachmentsQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useQuery<
		GetPostCaptionAndAttachmentsQuery,
		GetPostCaptionAndAttachmentsQueryVariables
	>(GetPostCaptionAndAttachmentsDocument, options)
}
export function useGetPostCaptionAndAttachmentsLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		GetPostCaptionAndAttachmentsQuery,
		GetPostCaptionAndAttachmentsQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useLazyQuery<
		GetPostCaptionAndAttachmentsQuery,
		GetPostCaptionAndAttachmentsQueryVariables
	>(GetPostCaptionAndAttachmentsDocument, options)
}
export type GetPostCaptionAndAttachmentsQueryHookResult = ReturnType<
	typeof useGetPostCaptionAndAttachmentsQuery
>
export type GetPostCaptionAndAttachmentsLazyQueryHookResult = ReturnType<
	typeof useGetPostCaptionAndAttachmentsLazyQuery
>
export type GetPostCaptionAndAttachmentsQueryResult = Apollo.QueryResult<
	GetPostCaptionAndAttachmentsQuery,
	GetPostCaptionAndAttachmentsQueryVariables
>
export const GetPostCommentsDocument = gql`
	query GetPostComments($postId: String!) {
		getPostComments(postId: $postId) {
			id
			text
			created_at
			author {
				id
				email
				username
				avatar_url
			}
		}
	}
`

/**
 * __useGetPostCommentsQuery__
 *
 * To run a query within a React component, call `useGetPostCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostCommentsQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useGetPostCommentsQuery(
	baseOptions: Apollo.QueryHookOptions<
		GetPostCommentsQuery,
		GetPostCommentsQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useQuery<GetPostCommentsQuery, GetPostCommentsQueryVariables>(
		GetPostCommentsDocument,
		options
	)
}
export function useGetPostCommentsLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		GetPostCommentsQuery,
		GetPostCommentsQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useLazyQuery<
		GetPostCommentsQuery,
		GetPostCommentsQueryVariables
	>(GetPostCommentsDocument, options)
}
export type GetPostCommentsQueryHookResult = ReturnType<
	typeof useGetPostCommentsQuery
>
export type GetPostCommentsLazyQueryHookResult = ReturnType<
	typeof useGetPostCommentsLazyQuery
>
export type GetPostCommentsQueryResult = Apollo.QueryResult<
	GetPostCommentsQuery,
	GetPostCommentsQueryVariables
>
export const GetPublicFeedReachsDocument = gql`
	query getPublicFeedReachs($postId: String!) {
		getPostReachs(postId: $postId)
	}
`

/**
 * __useGetPublicFeedReachsQuery__
 *
 * To run a query within a React component, call `useGetPublicFeedReachsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPublicFeedReachsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPublicFeedReachsQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useGetPublicFeedReachsQuery(
	baseOptions: Apollo.QueryHookOptions<
		GetPublicFeedReachsQuery,
		GetPublicFeedReachsQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useQuery<
		GetPublicFeedReachsQuery,
		GetPublicFeedReachsQueryVariables
	>(GetPublicFeedReachsDocument, options)
}
export function useGetPublicFeedReachsLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		GetPublicFeedReachsQuery,
		GetPublicFeedReachsQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useLazyQuery<
		GetPublicFeedReachsQuery,
		GetPublicFeedReachsQueryVariables
	>(GetPublicFeedReachsDocument, options)
}
export type GetPublicFeedReachsQueryHookResult = ReturnType<
	typeof useGetPublicFeedReachsQuery
>
export type GetPublicFeedReachsLazyQueryHookResult = ReturnType<
	typeof useGetPublicFeedReachsLazyQuery
>
export type GetPublicFeedReachsQueryResult = Apollo.QueryResult<
	GetPublicFeedReachsQuery,
	GetPublicFeedReachsQueryVariables
>
export const GetPostVotesDocument = gql`
	query getPostVotes($postId: String!) {
		post(postId: $postId) {
			upvoter {
				id
				username
			}
			downvoter {
				id
				username
			}
		}
	}
`

/**
 * __useGetPostVotesQuery__
 *
 * To run a query within a React component, call `useGetPostVotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostVotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostVotesQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useGetPostVotesQuery(
	baseOptions: Apollo.QueryHookOptions<
		GetPostVotesQuery,
		GetPostVotesQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useQuery<GetPostVotesQuery, GetPostVotesQueryVariables>(
		GetPostVotesDocument,
		options
	)
}
export function useGetPostVotesLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		GetPostVotesQuery,
		GetPostVotesQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useLazyQuery<GetPostVotesQuery, GetPostVotesQueryVariables>(
		GetPostVotesDocument,
		options
	)
}
export type GetPostVotesQueryHookResult = ReturnType<
	typeof useGetPostVotesQuery
>
export type GetPostVotesLazyQueryHookResult = ReturnType<
	typeof useGetPostVotesLazyQuery
>
export type GetPostVotesQueryResult = Apollo.QueryResult<
	GetPostVotesQuery,
	GetPostVotesQueryVariables
>
export const GetPublicFeedsDocument = gql`
	query getPublicFeeds {
		posts {
			id
			caption
			type
			created_at
			author {
				id
				username
				avatar_url
				badges {
					id
					label
					variant
					color
					background
					border
				}
			}
			attachments {
				id
				type
				uri
			}
		}
	}
`

/**
 * __useGetPublicFeedsQuery__
 *
 * To run a query within a React component, call `useGetPublicFeedsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPublicFeedsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPublicFeedsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPublicFeedsQuery(
	baseOptions?: Apollo.QueryHookOptions<
		GetPublicFeedsQuery,
		GetPublicFeedsQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useQuery<GetPublicFeedsQuery, GetPublicFeedsQueryVariables>(
		GetPublicFeedsDocument,
		options
	)
}
export function useGetPublicFeedsLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		GetPublicFeedsQuery,
		GetPublicFeedsQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useLazyQuery<
		GetPublicFeedsQuery,
		GetPublicFeedsQueryVariables
	>(GetPublicFeedsDocument, options)
}
export type GetPublicFeedsQueryHookResult = ReturnType<
	typeof useGetPublicFeedsQuery
>
export type GetPublicFeedsLazyQueryHookResult = ReturnType<
	typeof useGetPublicFeedsLazyQuery
>
export type GetPublicFeedsQueryResult = Apollo.QueryResult<
	GetPublicFeedsQuery,
	GetPublicFeedsQueryVariables
>
export const GetUnreadNotificationsDocument = gql`
	query getUnreadNotifications {
		notifications {
			unread
		}
	}
`

/**
 * __useGetUnreadNotificationsQuery__
 *
 * To run a query within a React component, call `useGetUnreadNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnreadNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnreadNotificationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUnreadNotificationsQuery(
	baseOptions?: Apollo.QueryHookOptions<
		GetUnreadNotificationsQuery,
		GetUnreadNotificationsQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useQuery<
		GetUnreadNotificationsQuery,
		GetUnreadNotificationsQueryVariables
	>(GetUnreadNotificationsDocument, options)
}
export function useGetUnreadNotificationsLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		GetUnreadNotificationsQuery,
		GetUnreadNotificationsQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useLazyQuery<
		GetUnreadNotificationsQuery,
		GetUnreadNotificationsQueryVariables
	>(GetUnreadNotificationsDocument, options)
}
export type GetUnreadNotificationsQueryHookResult = ReturnType<
	typeof useGetUnreadNotificationsQuery
>
export type GetUnreadNotificationsLazyQueryHookResult = ReturnType<
	typeof useGetUnreadNotificationsLazyQuery
>
export type GetUnreadNotificationsQueryResult = Apollo.QueryResult<
	GetUnreadNotificationsQuery,
	GetUnreadNotificationsQueryVariables
>
export const GetUserBadgeDocument = gql`
	query GetUserBadge($username: String!) {
		user(username: $username) {
			badges {
				id
				label
				variant
				color
				background
				border
			}
		}
	}
`

/**
 * __useGetUserBadgeQuery__
 *
 * To run a query within a React component, call `useGetUserBadgeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserBadgeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserBadgeQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useGetUserBadgeQuery(
	baseOptions: Apollo.QueryHookOptions<
		GetUserBadgeQuery,
		GetUserBadgeQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useQuery<GetUserBadgeQuery, GetUserBadgeQueryVariables>(
		GetUserBadgeDocument,
		options
	)
}
export function useGetUserBadgeLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		GetUserBadgeQuery,
		GetUserBadgeQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useLazyQuery<GetUserBadgeQuery, GetUserBadgeQueryVariables>(
		GetUserBadgeDocument,
		options
	)
}
export type GetUserBadgeQueryHookResult = ReturnType<
	typeof useGetUserBadgeQuery
>
export type GetUserBadgeLazyQueryHookResult = ReturnType<
	typeof useGetUserBadgeLazyQuery
>
export type GetUserBadgeQueryResult = Apollo.QueryResult<
	GetUserBadgeQuery,
	GetUserBadgeQueryVariables
>
export const GetUserProfileDocument = gql`
	query getUserProfile($id: String!) {
		getUserById(id: $id) {
			id
			username
			avatar_url
		}
	}
`

/**
 * __useGetUserProfileQuery__
 *
 * To run a query within a React component, call `useGetUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserProfileQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserProfileQuery(
	baseOptions: Apollo.QueryHookOptions<
		GetUserProfileQuery,
		GetUserProfileQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useQuery<GetUserProfileQuery, GetUserProfileQueryVariables>(
		GetUserProfileDocument,
		options
	)
}
export function useGetUserProfileLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		GetUserProfileQuery,
		GetUserProfileQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useLazyQuery<
		GetUserProfileQuery,
		GetUserProfileQueryVariables
	>(GetUserProfileDocument, options)
}
export type GetUserProfileQueryHookResult = ReturnType<
	typeof useGetUserProfileQuery
>
export type GetUserProfileLazyQueryHookResult = ReturnType<
	typeof useGetUserProfileLazyQuery
>
export type GetUserProfileQueryResult = Apollo.QueryResult<
	GetUserProfileQuery,
	GetUserProfileQueryVariables
>
export const CommentsSubscriptionDocument = gql`
	subscription CommentsSubscription($postId: String!) {
		commentsSubscription(postId: $postId) {
			postId
			comment {
				id
				text
				created_at
				author {
					id
					username
					email
					avatar_url
				}
			}
			type
		}
	}
`

/**
 * __useCommentsSubscriptionSubscription__
 *
 * To run a query within a React component, call `useCommentsSubscriptionSubscription` and pass it any options that fit your needs.
 * When your component renders, `useCommentsSubscriptionSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentsSubscriptionSubscription({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useCommentsSubscriptionSubscription(
	baseOptions: Apollo.SubscriptionHookOptions<
		CommentsSubscriptionSubscription,
		CommentsSubscriptionSubscriptionVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useSubscription<
		CommentsSubscriptionSubscription,
		CommentsSubscriptionSubscriptionVariables
	>(CommentsSubscriptionDocument, options)
}
export type CommentsSubscriptionSubscriptionHookResult = ReturnType<
	typeof useCommentsSubscriptionSubscription
>
export type CommentsSubscriptionSubscriptionResult =
	Apollo.SubscriptionResult<CommentsSubscriptionSubscription>
export const DownvoteDocument = gql`
	subscription downvote($postId: String!) {
		downvoteSubscription(postId: $postId) {
			downvotes
			downvoters {
				id
			}
		}
	}
`

/**
 * __useDownvoteSubscription__
 *
 * To run a query within a React component, call `useDownvoteSubscription` and pass it any options that fit your needs.
 * When your component renders, `useDownvoteSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDownvoteSubscription({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDownvoteSubscription(
	baseOptions: Apollo.SubscriptionHookOptions<
		DownvoteSubscription,
		DownvoteSubscriptionVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useSubscription<
		DownvoteSubscription,
		DownvoteSubscriptionVariables
	>(DownvoteDocument, options)
}
export type DownvoteSubscriptionHookResult = ReturnType<
	typeof useDownvoteSubscription
>
export type DownvoteSubscriptionResult =
	Apollo.SubscriptionResult<DownvoteSubscription>
export const UnreadNotificationsDocument = gql`
	subscription UnreadNotifications($userId: String!) {
		notificationSubscription(userId: $userId) {
			userId
			unread
		}
	}
`

/**
 * __useUnreadNotificationsSubscription__
 *
 * To run a query within a React component, call `useUnreadNotificationsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useUnreadNotificationsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUnreadNotificationsSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUnreadNotificationsSubscription(
	baseOptions: Apollo.SubscriptionHookOptions<
		UnreadNotificationsSubscription,
		UnreadNotificationsSubscriptionVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useSubscription<
		UnreadNotificationsSubscription,
		UnreadNotificationsSubscriptionVariables
	>(UnreadNotificationsDocument, options)
}
export type UnreadNotificationsSubscriptionHookResult = ReturnType<
	typeof useUnreadNotificationsSubscription
>
export type UnreadNotificationsSubscriptionResult =
	Apollo.SubscriptionResult<UnreadNotificationsSubscription>
export const TotalCommentsSubscriptionDocument = gql`
	subscription TotalCommentsSubscription($postId: String!) {
		commentsSubscription(postId: $postId) {
			postId
			commentsSum
		}
	}
`

/**
 * __useTotalCommentsSubscriptionSubscription__
 *
 * To run a query within a React component, call `useTotalCommentsSubscriptionSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTotalCommentsSubscriptionSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTotalCommentsSubscriptionSubscription({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useTotalCommentsSubscriptionSubscription(
	baseOptions: Apollo.SubscriptionHookOptions<
		TotalCommentsSubscriptionSubscription,
		TotalCommentsSubscriptionSubscriptionVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useSubscription<
		TotalCommentsSubscriptionSubscription,
		TotalCommentsSubscriptionSubscriptionVariables
	>(TotalCommentsSubscriptionDocument, options)
}
export type TotalCommentsSubscriptionSubscriptionHookResult = ReturnType<
	typeof useTotalCommentsSubscriptionSubscription
>
export type TotalCommentsSubscriptionSubscriptionResult =
	Apollo.SubscriptionResult<TotalCommentsSubscriptionSubscription>
export const UpvoteDocument = gql`
	subscription upvote($postId: String!) {
		upvoteSubscription(postId: $postId) {
			upvotes
			upvoters {
				id
			}
		}
	}
`

/**
 * __useUpvoteSubscription__
 *
 * To run a query within a React component, call `useUpvoteSubscription` and pass it any options that fit your needs.
 * When your component renders, `useUpvoteSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUpvoteSubscription({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useUpvoteSubscription(
	baseOptions: Apollo.SubscriptionHookOptions<
		UpvoteSubscription,
		UpvoteSubscriptionVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useSubscription<
		UpvoteSubscription,
		UpvoteSubscriptionVariables
	>(UpvoteDocument, options)
}
export type UpvoteSubscriptionHookResult = ReturnType<
	typeof useUpvoteSubscription
>
export type UpvoteSubscriptionResult =
	Apollo.SubscriptionResult<UpvoteSubscription>
