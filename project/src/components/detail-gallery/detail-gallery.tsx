type detailGalleryPropsTypes = {
  images: string[];
}

function DetailGallery({ images }: detailGalleryPropsTypes): JSX.Element {
  return (
    <div className="property__gallery">
      {images.map((image) => (
        <div key={image} className="property__image-wrapper">
          <img className="property__image" src={image} alt="Offer studio" />
        </div>
      ))}
    </div>
  );
}

export default DetailGallery;
