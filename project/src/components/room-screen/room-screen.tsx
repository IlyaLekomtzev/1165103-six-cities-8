import { useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../header/header';
import DetailInfo from '../detail-info/detail-info';
import ReviewsForm from '../reviews-form/reviews-form';
import ReviewsList from '../reviews-list/reviews-list';
import Map from '../map/map';
import DetailGallery from '../detail-gallery/detail-gallery';
import NearbyOffersList from '../nearby-offers-list/nearby-offers-list';
import Spinner from '../spinner/spinner';
import { getRoom } from '../../store/api-actions';
import { State } from '../../types/state';
import { AppRoute, AuthorizationStatus } from '../../const';

function RoomScreen(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const authorizationStatus = useSelector(({ AUTH }: State) => AUTH.authorizationStatus);
  const { offer, reviews, nearbyOffers, isLoading, error } = useSelector(({ ROOM }: State) => ROOM);

  useEffect(() => {
    dispatch(getRoom(id));
  }, [id]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!offer || error) {
    return <Redirect to={AppRoute.Main} />;
  }

  const offersMap = [...nearbyOffers, offer];

  return (
    <>
      <div style={{ display: 'none' }}>
        <svg xmlns="http://www.w3.org/2000/svg"><symbol id="icon-arrow-select" viewBox="0 0 7 4"><path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z" /></symbol><symbol id="icon-bookmark" viewBox="0 0 17 18"><path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z" /></symbol><symbol id="icon-star" viewBox="0 0 13 12"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z" /></symbol></svg>
      </div>
      <div className="page">
        <Header />
        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              {offer.images && <DetailGallery images={offer.images} />}
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                <DetailInfo offer={offer} />
                <section className="property__reviews reviews">
                  <ReviewsList reviews={reviews} />
                  {(authorizationStatus === AuthorizationStatus.Auth) && <ReviewsForm id={id} />}
                </section>
              </div>
            </div>
            <Map
              city={offer.city}
              offers={offersMap}
              active={+id}
              mapMainClassName="property__map"
            />
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <NearbyOffersList offers={nearbyOffers} />
            </section>
          </div>
        </main>
      </div>
    </>
  );
}

export default RoomScreen;
