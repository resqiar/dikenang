import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type AddUserABadgeInput = {
  userId: Scalars['String'];
  badgeId: Scalars['String'];
};

export type Attachments = {
  __typename?: 'Attachments';
  id: Scalars['String'];
  type: Scalars['String'];
  uri: Array<Scalars['String']>;
};

export type Badge = {
  __typename?: 'Badge';
  id: Scalars['String'];
  label: Scalars['String'];
  variant: Scalars['String'];
  color?: Maybe<Scalars['String']>;
  background?: Maybe<Scalars['String']>;
  border?: Maybe<Scalars['String']>;
  owners?: Maybe<Array<User>>;
};

export type CreateAttachmentInput = {
  type: Scalars['String'];
  uri: Array<Scalars['String']>;
};

export type CreateBadgeInput = {
  label: Scalars['String'];
  variant?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  background?: Maybe<Scalars['String']>;
  border?: Maybe<Scalars['String']>;
};

export type CreatePostInput = {
  caption: Scalars['String'];
  type: Scalars['String'];
};

export type CreateRelationshipInput = {
  type: Scalars['String'];
  description: Scalars['String'];
  target: Scalars['String'];
};


export type DeletePostResponse = {
  __typename?: 'DeletePostResponse';
  previous_data: Post;
  status: Scalars['String'];
  code: Scalars['Float'];
};

export type DeleteRelationshipResponse = {
  __typename?: 'DeleteRelationshipResponse';
  previous_data: Relationship;
  status: Scalars['String'];
  code: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  updateUser: User;
  createPost: Post;
  updatePost: Post;
  removePost: DeletePostResponse;
  createRelationship: Relationship;
  deleteRelationship: DeleteRelationshipResponse;
  createBadge: Badge;
  addUserABadge: User;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};


export type MutationCreatePostArgs = {
  createAttachmentInput?: Maybe<CreateAttachmentInput>;
  createPostInput: CreatePostInput;
};


export type MutationUpdatePostArgs = {
  updatePostInput: UpdatePostInput;
};


export type MutationRemovePostArgs = {
  postId: Scalars['String'];
};


export type MutationCreateRelationshipArgs = {
  createRelationshipInput: CreateRelationshipInput;
};


export type MutationCreateBadgeArgs = {
  createBadgeInput: CreateBadgeInput;
};


export type MutationAddUserABadgeArgs = {
  addUserABadgeInput: AddUserABadgeInput;
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['String'];
  caption: Scalars['String'];
  type?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['DateTime']>;
  updated_at?: Maybe<Scalars['DateTime']>;
  author: User;
  attachments?: Maybe<Attachments>;
  relationship?: Maybe<Relationship>;
};

export type Query = {
  __typename?: 'Query';
  users: Array<User>;
  user: User;
  getMyProfile: User;
  posts: Array<Post>;
  post: Post;
  badges: Array<Badge>;
};


export type QueryUserArgs = {
  username: Scalars['String'];
};


export type QueryPostArgs = {
  postId: Scalars['String'];
};

export type Relationship = {
  __typename?: 'Relationship';
  id: Scalars['String'];
  type?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['DateTime']>;
  updated_at?: Maybe<Scalars['DateTime']>;
  partnership?: Maybe<Array<User>>;
  posts?: Maybe<Array<Post>>;
};

export type UpdatePostInput = {
  caption?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};

export type UpdateUserInput = {
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  avatar_url?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  bio?: Maybe<Scalars['String']>;
  avatar_url?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['DateTime']>;
  updated_at?: Maybe<Scalars['DateTime']>;
  contents?: Maybe<Array<Post>>;
  relationship?: Maybe<Relationship>;
  badges?: Maybe<Array<Badge>>;
};

export type CreatePostMutationVariables = Exact<{
  createPostinput: CreatePostInput;
  createAttachmentInput?: Maybe<CreateAttachmentInput>;
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'Post' }
    & Pick<Post, 'caption' | 'type'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'avatar_url'>
    ) }
  ) }
);

export type GetPublicFeedsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPublicFeedsQuery = (
  { __typename?: 'Query' }
  & { posts: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'caption' | 'type' | 'created_at'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'username' | 'avatar_url'>
      & { badges?: Maybe<Array<(
        { __typename?: 'Badge' }
        & Pick<Badge, 'id' | 'label' | 'variant' | 'color' | 'background' | 'border'>
      )>> }
    ), attachments?: Maybe<(
      { __typename?: 'Attachments' }
      & Pick<Attachments, 'id' | 'type' | 'uri'>
    )> }
  )> }
);


export const CreatePostDocument = gql`
    mutation CreatePost($createPostinput: CreatePostInput!, $createAttachmentInput: CreateAttachmentInput) {
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
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

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
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const GetPublicFeedsDocument = gql`
    query getPublicFeeds {
  posts {
    id
    caption
    type
    created_at
    author {
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
    `;

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
export function useGetPublicFeedsQuery(baseOptions?: Apollo.QueryHookOptions<GetPublicFeedsQuery, GetPublicFeedsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPublicFeedsQuery, GetPublicFeedsQueryVariables>(GetPublicFeedsDocument, options);
      }
export function useGetPublicFeedsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPublicFeedsQuery, GetPublicFeedsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPublicFeedsQuery, GetPublicFeedsQueryVariables>(GetPublicFeedsDocument, options);
        }
export type GetPublicFeedsQueryHookResult = ReturnType<typeof useGetPublicFeedsQuery>;
export type GetPublicFeedsLazyQueryHookResult = ReturnType<typeof useGetPublicFeedsLazyQuery>;
export type GetPublicFeedsQueryResult = Apollo.QueryResult<GetPublicFeedsQuery, GetPublicFeedsQueryVariables>;