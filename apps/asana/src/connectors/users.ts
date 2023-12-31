import { env } from '@/env';
import { AsanaError } from './commons/error';

export type AsanaUser = {
  gid: string;
  email: string;
  name: string;
};

export type GetUsersResponseData = {
  data?: AsanaUser[];
  next_page?: {
    offset: string;
    path: string;
    uri: string;
  };
};

export const getUsers = async (accessToken: string, workspace: string, offset?: string) => {
  /* eslint-disable -- no type here */
  try {
    const opt_fields = 'email, name';

    const response = await fetch(
      `${env.ASANA_API_USER_BASE_URL}?opt_fields=${opt_fields}&workspace=${workspace}&limit=${
        env.USERS_SYNC_JOB_BATCH_SIZE
      }${offset ? `&offset=${offset}` : ''}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data: GetUsersResponseData = await response.json();
    /* eslint-enable -- no type here */
    return {
      users: data.data ?? [],
      offset: data.next_page?.offset ?? null,
    };
  } catch (error: unknown) {
    throw new AsanaError(`Could retrieve users of workspace=${workspace}`, {
      cause: error,
    });
  }
};
