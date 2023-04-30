import { ChangeEvent } from 'react';

type GetRatingProps = {
    value: number;
    rating: number;
    postLoadingStatus: boolean;
    onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
}

export default function GetRating(props: GetRatingProps): JSX.Element {
  const {value, rating, postLoadingStatus, onChange} = props;
  return(
    <>
      <input
        className='form__rating-input visually-hidden'
        name="rating"
        id={`${value}-stars`}
        type="radio"
        value={value}
        onChange={onChange}
        data-testid='rating-id'
        checked={value === Number(rating)}
      />
      <label
        htmlFor={`${value}-stars`}
        className={`reviews__rating-label form__rating-label ${postLoadingStatus ? 'form__rating-input_disabled' : ''}`}
        title="perfect"
      >
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}
