import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { saveToken, dropToken } from '../../components/services/api/token';
import { ApiRoute, Approute, NameSpace } from '../../const';
import { AuthInfo } from '../../types/auth-data';
import { Offers, Offer } from '../../types/offer-type';
import { Comments } from '../../types/review-type';
import { AppDispatch, State } from '../../types/state';
import { UserInfo } from '../../types/user-data';
import { redirectToRoute } from '../action';


export const fetchOffersAction = createAsyncThunk<
  Offers,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('LOAD_OFFERS', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<Offers>(ApiRoute.Offers);
  return data;
});

export const fetchSingleOfferAction = createAsyncThunk<
  Offer,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('LOAD_OFFER', async (id, { dispatch, extra: api }) => {
  const { data } = await api.get<Offer>(`${ApiRoute.Offers}/${id}`);
  return data;
});

export const fetchNearbyOffersAction = createAsyncThunk<
  Offers,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('LOAD_NEARBY_OFFERS', async (id, { dispatch, extra: api }) => {
  const { data } = await api.get<Offers>(
    `${ApiRoute.Offers}/${id}/nearby`
  );
  return data.slice(0, 3);
});

export const fetchCommentsAction = createAsyncThunk<
  Comments,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('LOAD_COMMENTS', async (hotelId, { dispatch, extra: api }) => {
  const { data } = await api.get<Comments>(`${ApiRoute.Comments}/${hotelId}`);
  return data.slice(0, 10);
});

export const postCommentAction = createAsyncThunk<
  Comments,
  { hotelId: number; comment: string; rating: number },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'POST_COMMENT',
  async ({ hotelId, comment, rating }, { getState, extra: api }) => {
    try {
      const { data } = await api.post<Comments>(
        `${ApiRoute.Comments}/${hotelId}`,
        {
          comment,
          rating,
        }
      );
      return data;
    } catch {
      toast.warn('Sorry, we couldn\'t send your comment');
      return getState()[NameSpace.Comments].comments;
    }
  }
);

export const checkAuthAction = createAsyncThunk<
  UserInfo,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('CHECK_AUTHORIZATION', async (_arg, { dispatch, extra: api }) => {
  const { data }: AxiosResponse<UserInfo> = await api.get(ApiRoute.Login);
  return data;
});

export const loginAction = createAsyncThunk<
  void,
  AuthInfo,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('LOGIN', async ({ email, password }, { dispatch, extra: api }) => {
  const { data } = await api.post<UserInfo>(ApiRoute.Login, {
    email,
    password,
  });
  saveToken(data.token);
  dispatch(checkAuthAction());
  dispatch(redirectToRoute(Approute.Main));
});

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('LOGOUT', async (_arg, { dispatch, extra: api }) => {
  await api.delete(ApiRoute.Logout);
  dropToken();
  dispatch(redirectToRoute(Approute.Login));
});
