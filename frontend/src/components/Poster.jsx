const Poster = ({ image, alt = "Promotion Poster" }) => {
  return (
    <section className="w-full my-12 px-4">
      <img
        src={image}
        alt={alt}
        className="
          w-full 
          h-52 
         
        "
      />
    </section>
  );
};

export default Poster;