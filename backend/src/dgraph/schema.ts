import { fetch } from 'cross-undici-fetch'
import { introspectSchema, wrapSchema } from '@graphql-tools/wrap';
import { AsyncExecutor } from '@graphql-tools/utils';
import { print } from 'graphql';

const { DGRAPH_ENDPOINT } = process.env
if(!DGRAPH_ENDPOINT) throw new Error('You must set DGRAPH_ENDPOINT')

export const executor: AsyncExecutor = async ({ document, variables }) => {
  const query = print(document);
  const fetchResult = await fetch(DGRAPH_ENDPOINT, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ query, variables }),
  });
  return fetchResult.json();
};

export default async () => {
  const schema = await introspectSchema(executor)
  return wrapSchema({
    schema,
    executor,
  });
}

