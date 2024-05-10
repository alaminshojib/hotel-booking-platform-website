
const Map = () => {
  return (
    <div>
      <div className="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12962.106565185172!2d-0.12463701634208246!3d51.50072923147572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604ceec1b46cb%3A0x8b200f6282d486c!2sBig%20Ben!5e0!3m2!1sen!2suk!4v1620588322230!5m2!1sen!2suk"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Hotel Map"
        ></iframe>
      </div>
      
    </div>
  );
};

export default Map;