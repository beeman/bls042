import { useRouter } from 'next/router';
import { trpc } from 'utils/trpc';
import NextError from 'next/error';

export default function UserViewPage() {
  const id = useRouter().query.id as string;
  const userQuery = trpc.useQuery(['user.byId', id]);

  if (userQuery.error) {
    return (
      <NextError
        title={userQuery.error.message}
        statusCode={userQuery.error.data?.httpStatus ?? 500}
      />
    );
  }

  if (userQuery.status !== 'success') {
    return <>Loading...</>;
  }
  const { data } = userQuery;
  return (
    <>
      <h1>{data.username}</h1>
      <em>Created {data.createdAt.toLocaleDateString()}</em>

      <h2>Raw data:</h2>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </>
  );
}
