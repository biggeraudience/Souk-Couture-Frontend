import React, { useState, useEffect } from 'react';
import '../../styles/components/_announcement-bar.scss';

const announcements = [
  "Free shipping on all orders over $100! íºš",
  "New Arrivals every week! Discover your next favorite piece.",
  "Limited Time Offer: Get 20% off your first purchase! Use code: NEW20",
  "Follow us on social media for exclusive deals and style tips!",
];

const AnnouncementBar = () => {
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncementIndex((prevIndex) =>
        (prevIndex + 1) % announcements.length
      );
    }, 5000); // Change announcement every 5 seconds

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  return (
    <div className="announcement-bar">
      <p className="announcement-bar__text">
        {announcements[currentAnnouncementIndex]}
      </p>
    </div>
  );
};

export default AnnouncementBar;