import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Header from '../header/header';
import SortPanel from '../sort-panel/sort-panel';
import OffersList from '../offers-list/offers-list';
import Map from '../map/map';
import CitiesList from '../cities-list/cities-list';
import Spinner from '../spinner/spinner';
import MainEmpty from '../main-empty/main-empty';
import { State } from '../../types/state';
import { cities } from '../../const';

const DEFAULT_ACTIVE_OFFER = 0;

function MainScreen(): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<number>(DEFAULT_ACTIVE_OFFER);
  const { city, offers: storeOffers, isLoading, error } = useSelector(({ OFFERS }: State) => OFFERS);
  const offers = storeOffers.filter((offer) => offer.city.name === city);

  const handleMouseEnter = useCallback((id: number) => {
    setActiveOffer(id);
  }, [activeOffer]);

  const handleMouseLeave = useCallback(() => {
    setActiveOffer(DEFAULT_ACTIVE_OFFER);
  }, [activeOffer]);

  const renderOffers = () => {
    if (isLoading) {
      return <Spinner />;
    }

    if (error || offers.length === 0) {
      return <MainEmpty />;
    } else {
      return (
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offers.length} places to stay in {city}</b>
            <SortPanel />

            {!isLoading && (
              <OffersList
                offers={offers}
                onMouseEnter={(id) => handleMouseEnter(id)}
                onMouseLeave={() => handleMouseLeave()}
              />
            )}
          </section>
          <div className="cities__right-section">
            {offers.length ? (
              <Map
                city={offers[0].city}
                offers={offers}
                active={activeOffer}
                mapMainClassName="cities__map"
              />
            ) : (
              <section className="cities__map map" />
            )}
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <div style={{ display: 'none' }}>
        <svg xmlns="http://www.w3.org/2000/svg"><symbol id="icon-arrow-select" viewBox="0 0 7 4"><path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z" /></symbol><symbol id="icon-bookmark" viewBox="0 0 17 18"><path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z" /></symbol><symbol id="icon-star" viewBox="0 0 13 12"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z" /></symbol></svg>
      </div>
      <div className="page page--gray page--main">
        <Header />
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <CitiesList cities={cities} selectedCity={city} />
          </div>
          <div className="cities">
            {renderOffers()}
          </div>
        </main>
      </div>
    </>
  );
}

export default MainScreen;
