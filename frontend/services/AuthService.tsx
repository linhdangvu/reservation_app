import axios from 'axios';
const URL_API= "'http://localhost:3000";

export type LoginResponse = {
    access_token: string | null,
    refresh_token: string | null
};

export async function login(name : string, password : string) {
    try {
      // 👇️ const data: LoginResponse
      const { data } = await axios.post<LoginResponse>(
        URL_API+'/auth/login',
        { username: name, password: password },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );
  
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        // 👇️ error: AxiosError<any, any>
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }
  }

  
export async function refreshToken(tokens: LoginResponse) {
  try {
    // 👇️ const data: LoginResponse
    const { data } = await axios.post<LoginResponse>(
      URL_API+'/auth/refreshtoken',
      tokens,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      // 👇️ error: AxiosError<any, any>
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}