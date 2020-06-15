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
  html: Scalars['String'];
  hexcode1: Scalars['String'];
  hexcode2: Scalars['String'];
};

export type AnimationPage = {
   __typename?: 'AnimationPage';
  data: Array<Maybe<Animation>>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};



export type Morph = {
   __typename?: 'Morph';
  _id: Scalars['ID'];
  data: Scalars['String'];
  hexcode1: Scalars['String'];
  hexcode2: Scalars['String'];
  _ts: Scalars['Long'];
};

export type MorphInput = {
  data: Scalars['String'];
  hexcode1: Scalars['String'];
  hexcode2: Scalars['String'];
};

export type MorphPage = {
   __typename?: 'MorphPage';
  data: Array<Maybe<Morph>>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

export type Mutation = {
   __typename?: 'Mutation';
  createMorph: Morph;
  createAnimation: Animation;
  updateMorph?: Maybe<Morph>;
  deleteMorph?: Maybe<Morph>;
  updateAnimation?: Maybe<Animation>;
  deleteAnimation?: Maybe<Animation>;
};


export type MutationCreateMorphArgs = {
  data: MorphInput;
};


export type MutationCreateAnimationArgs = {
  data: AnimationInput;
};


export type MutationUpdateMorphArgs = {
  id: Scalars['ID'];
  data: MorphInput;
};


export type MutationDeleteMorphArgs = {
  id: Scalars['ID'];
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
  sayHello: Scalars['String'];
  morphs: MorphPage;
  findMorphByID?: Maybe<Morph>;
  animations: AnimationPage;
  findAnimationByID?: Maybe<Animation>;
};


export type QueryMorphsArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};


export type QueryFindMorphByIdArgs = {
  id: Scalars['ID'];
};


export type QueryAnimationsArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};


export type QueryFindAnimationByIdArgs = {
  id: Scalars['ID'];
};


export type CreateMorphMutationVariables = {
  hexcode1: Scalars['String'];
  hexcode2: Scalars['String'];
  data: Scalars['String'];
};


export type CreateMorphMutation = (
  { __typename?: 'Mutation' }
  & { createMorph: (
    { __typename?: 'Morph' }
    & Pick<Morph, '_id' | 'hexcode1' | 'hexcode2' | 'data' | '_ts'>
  ) }
);

export type FindMorphByIdQueryVariables = {
  id: Scalars['ID'];
};


export type FindMorphByIdQuery = (
  { __typename?: 'Query' }
  & { findMorphByID?: Maybe<(
    { __typename?: 'Morph' }
    & Pick<Morph, '_id' | 'hexcode1' | 'hexcode2' | 'data' | '_ts'>
  )> }
);

export type MorphsQueryVariables = {
  size?: Maybe<Scalars['Int']>;
  cursor?: Maybe<Scalars['String']>;
};


export type MorphsQuery = (
  { __typename?: 'Query' }
  & { morphs: (
    { __typename?: 'MorphPage' }
    & Pick<MorphPage, 'before' | 'after'>
    & { data: Array<Maybe<(
      { __typename?: 'Morph' }
      & Pick<Morph, '_id' | 'hexcode1' | 'hexcode2' | 'data' | '_ts'>
    )>> }
  ) }
);


export const CreateMorphDocument = gql`
    mutation createMorph($hexcode1: String!, $hexcode2: String!, $data: String!) {
  createMorph(data: {hexcode1: $hexcode1, hexcode2: $hexcode2, data: $data}) {
    _id
    hexcode1
    hexcode2
    data
    _ts
  }
}
    `;
export type CreateMorphMutationFn = ApolloReactCommon.MutationFunction<CreateMorphMutation, CreateMorphMutationVariables>;

/**
 * __useCreateMorphMutation__
 *
 * To run a mutation, you first call `useCreateMorphMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMorphMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMorphMutation, { data, loading, error }] = useCreateMorphMutation({
 *   variables: {
 *      hexcode1: // value for 'hexcode1'
 *      hexcode2: // value for 'hexcode2'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateMorphMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateMorphMutation, CreateMorphMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateMorphMutation, CreateMorphMutationVariables>(CreateMorphDocument, baseOptions);
      }
export type CreateMorphMutationHookResult = ReturnType<typeof useCreateMorphMutation>;
export type CreateMorphMutationResult = ApolloReactCommon.MutationResult<CreateMorphMutation>;
export type CreateMorphMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateMorphMutation, CreateMorphMutationVariables>;
export const FindMorphByIdDocument = gql`
    query findMorphByID($id: ID!) {
  findMorphByID(id: $id) {
    _id
    hexcode1
    hexcode2
    data
    _ts
  }
}
    `;

/**
 * __useFindMorphByIdQuery__
 *
 * To run a query within a React component, call `useFindMorphByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindMorphByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindMorphByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindMorphByIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindMorphByIdQuery, FindMorphByIdQueryVariables>) {
        return ApolloReactHooks.useQuery<FindMorphByIdQuery, FindMorphByIdQueryVariables>(FindMorphByIdDocument, baseOptions);
      }
export function useFindMorphByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindMorphByIdQuery, FindMorphByIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FindMorphByIdQuery, FindMorphByIdQueryVariables>(FindMorphByIdDocument, baseOptions);
        }
export type FindMorphByIdQueryHookResult = ReturnType<typeof useFindMorphByIdQuery>;
export type FindMorphByIdLazyQueryHookResult = ReturnType<typeof useFindMorphByIdLazyQuery>;
export type FindMorphByIdQueryResult = ApolloReactCommon.QueryResult<FindMorphByIdQuery, FindMorphByIdQueryVariables>;
export const MorphsDocument = gql`
    query morphs($size: Int, $cursor: String) {
  morphs(_size: $size, _cursor: $cursor) {
    data {
      _id
      hexcode1
      hexcode2
      data
      _ts
    }
    before
    after
  }
}
    `;

/**
 * __useMorphsQuery__
 *
 * To run a query within a React component, call `useMorphsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMorphsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMorphsQuery({
 *   variables: {
 *      size: // value for 'size'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useMorphsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MorphsQuery, MorphsQueryVariables>) {
        return ApolloReactHooks.useQuery<MorphsQuery, MorphsQueryVariables>(MorphsDocument, baseOptions);
      }
export function useMorphsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MorphsQuery, MorphsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MorphsQuery, MorphsQueryVariables>(MorphsDocument, baseOptions);
        }
export type MorphsQueryHookResult = ReturnType<typeof useMorphsQuery>;
export type MorphsLazyQueryHookResult = ReturnType<typeof useMorphsLazyQuery>;
export type MorphsQueryResult = ApolloReactCommon.QueryResult<MorphsQuery, MorphsQueryVariables>;

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
    