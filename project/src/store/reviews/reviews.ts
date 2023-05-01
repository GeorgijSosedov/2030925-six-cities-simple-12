import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Reviews } from '../../types/review-type';
import { ReviewData } from '../../types/state';
import { fetchReviewsAction, postReviewAction } from '../api-action';

const initialState: ReviewData = {
  reviews: [],
  isReviewsLoading: false,
  isReviewPosted: false
};

export const reviewsData = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.isReviewsLoading = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action: PayloadAction<Reviews>) => {
        state.reviews = action.payload.sort((a,b) => b.date.localeCompare(a.date)).slice(0,10);
        state.isReviewsLoading = false;
      })
      .addCase(postReviewAction.fulfilled, (state, action: PayloadAction<Reviews>) => {
        state.reviews = action.payload.sort((a,b) => b.date.localeCompare(a.date)).slice(0,10);
        state.isReviewPosted = false;
      })
      .addCase(postReviewAction.pending, (state) => {
        state.isReviewPosted = true;
      });
  }
});