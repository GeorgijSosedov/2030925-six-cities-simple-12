import { useEffect } from 'react';
import { useParams } from 'react-router';
import { getNearbyOffers, getNearbyOffersLoadingStatus, getSingleOffer, getSingleOfferErrorStatus, getSingleOfferLoadingStatus } from '../../store/offers/selectors';
import { getAuthorizationStatus } from '../../store/user/selectors';
import { countCurrrentRating } from '../../utils/utils';
import Header from '../../components/header/header';
import CommentsList from '../../components/comments-list/comments-list';
import Map from '../../components/map/map';
import NearbyPlacesList from '../../components/nearby-place-list/nearby-place-list';
import NotFoundScreen from '../error-page/error-page';
import LoadingScreen from '../loading-page/loading-page';
import { useAppDispatch, useAppSelector } from '../../hooks';
import SendComment from '../../components/review-form/review-form';
import { AuthorizationStatus } from '../../const';
import { fetchSingleOfferAction, fetchNearbyOffersAction, fetchCommentsAction } from '../../store/api-action/api-action';
import { getComments, getCommentsLoadingStatus } from '../../store/reviews/selectors';
import PropertyGallery from '../../components/property-gallery/property-gallery';
import { store } from '../../store';
import RoomFeatures from '../../components/room-features/room-features';

export default function Room(): JSX.Element {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const offer = useAppSelector(getSingleOffer);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const comments = useAppSelector(getComments);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isSingleOfferLoading = useAppSelector(getSingleOfferLoadingStatus);
  const areNearbyOffersLoading = useAppSelector(getNearbyOffersLoadingStatus);
  const areCommentsLoading = useAppSelector(getCommentsLoadingStatus);
  const singleOfferErrorStatus = useAppSelector(getSingleOfferErrorStatus);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleOfferAction(id));
      dispatch(fetchNearbyOffersAction(id));
      dispatch(fetchCommentsAction(id));
    }
  }, [id]);

  if (isSingleOfferLoading || areNearbyOffersLoading || areCommentsLoading || !offer) {
    return <LoadingScreen />;
  }

  if (singleOfferErrorStatus) {
    return <NotFoundScreen />;
  }

  return (
    <div className="page">
      <div style={{ display: 'none' }}>
        <svg xmlns="http://www.w3.org/2000/svg">
          <symbol id='icon-arrow-select' viewBox='0 0 7 4'>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"
            >
            </path>
          </symbol>
          <symbol id="icon-bookmark" viewBox="0 0 17 18">
            <path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z">
            </path>
          </symbol>
          <symbol id="icon-star" viewBox="0 0 13 12">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"
            >
            </path>
          </symbol>
        </svg>
      </div>
      <Header />
      {offer && (
        <main className="page__main page__main--property">
          <section className="property">
            <PropertyGallery images={offer.images} dataTestId="room-title"/>
            <div className="property__container container">
              <div className="property__wrapper">
                {offer.isPremium && (
                  <div className="property__mark">
                    <span>Premium</span>
                  </div>
                )}
                <div className="property__name-wrapper">
                  <h1 className="property__name">{offer.title}</h1>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{ width: countCurrrentRating(offer.rating) }}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">
                    {offer.rating}
                  </span>
                </div>
                <RoomFeatures
                  bedrooms={offer.bedrooms}
                  dataTestId="room-type room-bedroom-count room-max-adult-count"
                  maxAdults={offer.maxAdults}
                  type={offer.type}
                />
                <div className="property__price">
                  <b className="property__price-value">&euro;{offer.price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {offer.goods.map((item) => (
                      <li className="property__inside-item" key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div
                      className={`property__avatar-wrapper ${
                        offer.host.isPro ? 'property__avatar-wrapper--pro' : ''
                      } user__avatar-wrapper`}
                    >
                      <img
                        className="property__avatar user__avatar"
                        src={offer.host.avatarUrl}
                        width="74"
                        height="74"
                        alt={offer.host.name}
                      />
                    </div>
                    <span className="property__user-name">{offer.host.name}</span>
                    {offer.host.isPro && (
                      <span className="property__user-status">Pro</span>
                    )}
                  </div>
                  <div className="property__description">
                    <p className="property__text" key={offer.description.slice(0, 10)}>
                      {offer.description}
                    </p>
                  </div>
                </div>
                <section className="property__reviews reviews">
                  <h2 className="reviews__title">
                    Reviews &middot;{' '}
                    <span className="reviews__amount">
                      {store.getState().COMMENTS.comments.length}
                    </span>
                  </h2>
                  <CommentsList comments={comments} />
                  {authorizationStatus === AuthorizationStatus.Auth && <SendComment hotelId={offer.id} />}
                </section>
              </div>
            </div>
            <section className="property__map map">
              {nearbyOffers.length && (
                <Map
                  city={offer.city}
                  offers={[...nearbyOffers, offer]}
                  selectedPoint={offer}
                />
              )}
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">
                Other places in the neighbourhood
              </h2>
              {nearbyOffers.length &&
                (
                  <NearbyPlacesList
                    nearbyOffers={nearbyOffers}
                  />
                )}
            </section>
          </div>
        </main>
      )}
    </div>
  );
}
