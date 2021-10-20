type detailGalleryPropsTypes = {
  images: string[];
}

function DetailGallery({ images }: detailGalleryPropsTypes): JSX.Element {
  const renderImages = () => (
    images.map((image) => (
      <div key={image} className="property__image-wrapper">
        <img className="property__image" src={image} alt="Offer studio" />
      </div>
    ))
  );

  return (
    <div className="property__gallery">
      {renderImages()}
    </div>
  );
}

export default DetailGallery;
