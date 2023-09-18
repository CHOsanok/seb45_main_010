import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { APIurl } from 'components/Items/GetInfoAuth';
import { getAccessToken } from 'components/Items/GetAccessToken';
import { RequestInfoType } from 'Types/Types';
const token = getAccessToken();
export const FetchRequestInfo = createAsyncThunk<RequestInfoType, number>(
  'FetchRequestInfo',
  async (matchId: number) => {
    const response = await axios.get<RequestInfoType>(`${APIurl}/matches/${matchId}`);
    const data = response.data;
    return data;
  }
);

export const updateRequestStatus = createAsyncThunk(
  'request/updateRequestStatus',
  async ({ id, status }: { id: number; status: string }) => {
    const response = await axios.patch(
      `${APIurl}/matches`,
      {
        id: id,
        status: status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);
