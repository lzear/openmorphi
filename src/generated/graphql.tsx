import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Long: any;
  Time: any;
};







export type Animation = {
   __typename?: 'Animation';
  _id: Scalars['ID'];
  html: Scalars['String'];
  hexcode1: Scalars['String'];
  hexcode2: Scalars['String'];
  _ts: Scalars['Long'];
};

export type AnimationInput = {
  hexcode1: Scalars['String'];
  hexcode2: Scalars['String'];
  html: Scalars['String'];
};

export type AnimationPage = {
   __typename?: 'AnimationPage';
  data: Array<Maybe<Animation>>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};



export type Mutation = {
   __typename?: 'Mutation';
  createAnimation: Animation;
  updateAnimation?: Maybe<Animation>;
  deleteAnimation?: Maybe<Animation>;
};


export type MutationCreateAnimationArgs = {
  data: AnimationInput;
};


export type MutationUpdateAnimationArgs = {
  id: Scalars['ID'];
  data: AnimationInput;
};


export type MutationDeleteAnimationArgs = {
  id: Scalars['ID'];
};

export type Query = {
   __typename?: 'Query';
  findAnimationByID?: Maybe<Animation>;
  animations: AnimationPage;
};


export type QueryFindAnimationByIdArgs = {
  id: Scalars['ID'];
};


export type QueryAnimationsArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};


export type GetAnimationQueryVariables = {
  id: Scalars['ID'];
};


export type GetAnimationQuery = (
  { __typename?: 'Query' }
  & { findAnimationByID?: Maybe<(
    { __typename?: 'Animation' }
    & Pick<Animation, '_id' | 'hexcode1' | 'hexcode2' | 'html' | '_ts'>
  )> }
);

export type GetAnimationsQueryVariables = {
  size?: Maybe<Scalars['Int']>;
  cursor?: Maybe<Scalars['String']>;
};


export type GetAnimationsQuery = (
  { __typename?: 'Query' }
  & { animations: (
    { __typename?: 'AnimationPage' }
    & Pick<AnimationPage, 'before' | 'after'>
    & { data: Array<Maybe<(
      { __typename?: 'Animation' }
      & Pick<Animation, '_id' | 'hexcode1' | 'hexcode2' | 'html' | '_ts'>
    )>> }
  ) }
);

export type CreateAnimationMutationVariables = {
  hexcode1: Scalars['String'];
  hexcode2: Scalars['String'];
  html: Scalars['String'];
};


export type CreateAnimationMutation = (
  { __typename?: 'Mutation' }
  & { createAnimation: (
    { __typename?: 'Animation' }
    & Pick<Animation, '_id' | 'hexcode1' | 'hexcode2' | '_ts'>
  ) }
);


export const GetAnimationDocument = gql`
    query getAnimation($id: ID!) {
  findAnimationByID(id: $id) {
    _id
    hexcode1
    hexcode2
    html
    _ts
  }
}
    `;

/**
 * __useGetAnimationQuery__
 *
 * To run a query within a React component, call `useGetAnimationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAnimationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAnimationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAnimationQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAnimationQuery, GetAnimationQueryVariables>) {
        return ApolloReactHooks.useQuery<GetAnimationQuery, GetAnimationQueryVariables>(GetAnimationDocument, baseOptions);
      }
export function useGetAnimationLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAnimationQuery, GetAnimationQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetAnimationQuery, GetAnimationQueryVariables>(GetAnimationDocument, baseOptions);
        }
export type GetAnimationQueryHookResult = ReturnType<typeof useGetAnimationQuery>;
export type GetAnimationLazyQueryHookResult = ReturnType<typeof useGetAnimationLazyQuery>;
export type GetAnimationQueryResult = ApolloReactCommon.QueryResult<GetAnimationQuery, GetAnimationQueryVariables>;
export const GetAnimationsDocument = gql`
    query getAnimations($size: Int, $cursor: String) {
  animations(_size: $size, _cursor: $cursor) {
    data {
      _id
      hexcode1
      hexcode2
      html
      _ts
    }
    before
    after
  }
}
    `;

/**
 * __useGetAnimationsQuery__
 *
 * To run a query within a React component, call `useGetAnimationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAnimationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAnimationsQuery({
 *   variables: {
 *      size: // value for 'size'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetAnimationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAnimationsQuery, GetAnimationsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetAnimationsQuery, GetAnimationsQueryVariables>(GetAnimationsDocument, baseOptions);
      }
export function useGetAnimationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAnimationsQuery, GetAnimationsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetAnimationsQuery, GetAnimationsQueryVariables>(GetAnimationsDocument, baseOptions);
        }
export type GetAnimationsQueryHookResult = ReturnType<typeof useGetAnimationsQuery>;
export type GetAnimationsLazyQueryHookResult = ReturnType<typeof useGetAnimationsLazyQuery>;
export type GetAnimationsQueryResult = ApolloReactCommon.QueryResult<GetAnimationsQuery, GetAnimationsQueryVariables>;
export const CreateAnimationDocument = gql`
    mutation createAnimation($hexcode1: String!, $hexcode2: String!, $html: String!) {
  createAnimation(data: {hexcode1: $hexcode1, hexcode2: $hexcode2, html: $html}) {
    _id
    hexcode1
    hexcode2
    _ts
  }
}
    `;
export type CreateAnimationMutationFn = ApolloReactCommon.MutationFunction<CreateAnimationMutation, CreateAnimationMutationVariables>;

/**
 * __useCreateAnimationMutation__
 *
 * To run a mutation, you first call `useCreateAnimationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAnimationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAnimationMutation, { data, loading, error }] = useCreateAnimationMutation({
 *   variables: {
 *      hexcode1: // value for 'hexcode1'
 *      hexcode2: // value for 'hexcode2'
 *      html: // value for 'html'
 *   },
 * });
 */
export function useCreateAnimationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateAnimationMutation, CreateAnimationMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateAnimationMutation, CreateAnimationMutationVariables>(CreateAnimationDocument, baseOptions);
      }
export type CreateAnimationMutationHookResult = ReturnType<typeof useCreateAnimationMutation>;
export type CreateAnimationMutationResult = ApolloReactCommon.MutationResult<CreateAnimationMutation>;
export type CreateAnimationMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateAnimationMutation, CreateAnimationMutationVariables>;

      export interface IntrospectionResultData {
        __schema: {
          types: {
            kind: string;
            name: string;
            possibleTypes: {
              name: string;
            }[];
          }[];
        };
      }
      const result: IntrospectionResultData = {
  "__schema": {
    "types": []
  }
};
      export default result;
    