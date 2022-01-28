import {axios} from './config';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserCredential {
  email: string;
  password: string;
}

export async function sendLoginRequest({
  email,
  password,
}: UserCredential): Promise<User | undefined> {
  try {
    const {data} = await axios.get<User[]>('/users', {
      params: {
        email,
        password,
      },
    });
    const user = data?.[0];

    if (!user) {
      throw Error('Email or Password is wrong');
    }

    return user;
  } catch (e) {
    if (e.status == '404') {
      e.message = 'Email or Password is wrong';
    }

    throw e;
  }
}

export interface UserSignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export async function signUpRequest({
  email,
  firstName,
  lastName,
  password,
}: UserSignUpData): Promise<User | undefined> {
  const {data} = await axios.post<User>('/users', {
    data: {
      email,
      password,
      firstName,
      lastName,
    },
  });

  return data;
}
