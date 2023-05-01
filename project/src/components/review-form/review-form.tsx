import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postReviewAction } from '../../store/api-action';
import { getPostLoadingStatus } from '../../store/reviews/selectors';
import GetRating from '../get-rating/get-rating';

type CommentFormProps = {
  offerId: number;
}

export default function CommentForm (props: CommentFormProps): JSX.Element {
  const isReviewPosted = useAppSelector(getPostLoadingStatus);
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    rating: 0,
    review: '',
    date: new Date(),
  });

  const [submitButtonDisabled, setSubmitButtonDisabled] = useState<boolean>(true);

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
    dispatch(
      postReviewAction({
        offerId: props.offerId,
        comment: formData.review,
        rating: formData.rating,
      })
    );
    clearFormData();
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
          <GetRating value={star} onChange={handleInput} key={star} rating={formData.rating} postLoadingStatus={isReviewPosted} />
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
        disabled={isReviewPosted}
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
          disabled={submitButtonDisabled}
          data-testid='send-comment-button'
        >
          Submit
        </button>
      </div>
    </form>
  );
}