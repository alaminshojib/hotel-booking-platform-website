


const useBook = () => {
    const { id } = useParams();
    const [singleData, setSingleData] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [bookingDate, setBookingDate] = useState(new Date());
    const [bookingLoading, setBookingLoading] = useState(false);
    const [showBookingSummary, setShowBookingSummary] = useState(false); // State to control booking summary modal
  
    const { user } = useContext(AuthContext); // Get the authentication object from ReactFire
  
    const loadedRoom = useLoaderData();
  
    useEffect(() => {
      if (loadedRoom) {
        const signData = loadedRoom.find((item) => item._id == id);
        setSingleData(signData);
      }
    }, [loadedRoom, id]);
  
    const {
      images,
      name,
      description,
      price_per_night,
      room_size,
      availability,
      special_offers
    } = singleData || {};
  
    const nextImage = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (images.length || 1));
    };
  
    const prevImage = () => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? (images.length || 1) - 1 : prevIndex - 1
      );
    };
  
     const handleConfirmBooking  = () => {
      setShowBookingSummary(true); // Display booking summary modal
    };
  
    const handleBookNow = async () => {
      if (availability === "Yes") {
        if (!user) {
          // Handle case where user is not authenticated
          return;
        }
        const userEmail = user.email;
        const userName = user.displayName;
    
        try {
          const response = await fetch(`https://hotel-booking-platform-server-side.vercel.app/bookings?userEmail=${userEmail}&roomId=${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch existing bookings');
          }
          const existingBookings = await response.json();
          
          // Check if the user has already booked for this room
          if (existingBookings.length > 0) {
            Swal.fire('You have already booked this room.', '', 'warning');
            return;
          } else {
            setBookingLoading(true); 
            const bookingData = {
              roomId: id,
              name: name,
              images: images,
              description: description,
              price_per_night: price_per_night,
              room_size: room_size,
              availability: availability,
              special_offers: special_offers,
              userEmail: userEmail,
              userName: userName,
              bookingDate: bookingDate,
            };
            const bookingResponse = await fetch('https://hotel-booking-platform-server-side.vercel.app/bookings', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(bookingData)
            });
            if (!bookingResponse.ok) {
              throw new Error('Failed to create booking');
            }
            // Show success alert after booking
            Swal.fire('The booking was successful!', '', 'success');
          }
        } catch (error) {
          console.error('Error handling booking:', error);
          Swal.fire('You have already booked this room!', '', 'error');
        } finally {
          setBookingLoading(false);
          Navigate("/mybookings") 
        }
      } else {
        Swal.fire('Room not available', '', 'error');
      }
    };
  
};

export default {useBook};
    
