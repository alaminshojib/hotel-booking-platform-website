
const rooms = [
    {
      id: 1,
      name: 'Deluxe Room',
      image: 'deluxe_room.jpg',
      description: 'Spacious room with a view of the city skyline.',
    },
    {
      id: 2,
      name: 'Executive Suite',
      image: 'executive_suite.jpg',
      description: 'Luxurious suite with a separate living area.',
    },
    {
      id: 3,
      name: 'Family Room',
      image: 'family_room.jpg',
      description: 'Comfortable room with enough space for the whole family.',
    },
  ];

const FeaturedRooms = () => {
    return (
        <div>
     

    <div className="featured-rooms">
      <h2>Featured Rooms</h2>
      <div className="room-list">
        {rooms.map((room) => (
          <div key={room.id} className="room">
            <img src={room.image} alt={room.name} />
            <h3>{room.name}</h3>
            <p>{room.description}</p>
            <button>Book Now</button>
          </div>
        ))}
      </div>
    </div>
              




        </div>
    );
};

export default FeaturedRooms;