import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { store } from '../../store';
import { postCommentAction } from '../../store/api-action/api-action';
import { getPostLoadingStatus } from '../../store/reviews/selectors';
import RatingStar from '../get-rating/get-rating';

type SendCommentProps = {
  hotelId: number;
};

function SendComment({ hotelId }: SendCommentProps) {
  const isCommentBeingPosted = useAppSelector(getPostLoadingStatus);
  const dispatch = useAppDispatch();
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState<boolean>(true);

  const [formData, setFormData] = useState({
    rating: 0,
    review: '',
    date: new Date(),
  });

  const handleInput = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = evt.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const clearFormData = () => {
    setFormData({
      ...formData,
      rating: 0,
      review: '',
    });
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const commentsLength = store.getState().COMMENTS.comments.length;

    dispatch(
      postCommentAction({
        hotelId: hotelId,
        comment: formData.review,
        rating: formData.rating,
      })
    ).then(
      () => {
        if (store.getState().COMMENTS.comments.length !== commentsLength) {
          clearFormData();
        }
      });
  };

  useEffect(() => {
    if (formData.rating !== 0 && formData.review.length >= 50) {
      setSubmitButtonDisabled(false);
    } else {
      setSubmitButtonDisabled(true);
    }
  }, [formData]);

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
      data-testid='send-comment-form'
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((star) => (
          <RatingStar value={star} onChange={handleInput} key={star} rating={formData.rating} postLoadingStatus={isCommentBeingPosted}/>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.review}
        onChange={handleInput}
        data-testid='review-id'
        disabled={isCommentBeingPosted}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={submitButtonDisabled || isCommentBeingPosted }
          data-testid='send-comment-button'
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default SendComment;
