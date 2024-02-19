import React, { useEffect, useState } from "react";
import { onSnapshot, collection, query } from "firebase/firestore";
import { db } from "../../firebase-config";

const DummyData = () => {
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    // Fetch events
    const eventsCollection = collection(db, "events");
    const eventsQuery = query(eventsCollection);
    const unsubscribeEvents = onSnapshot(eventsQuery, (snapshot) => {
      const eventData = [];
      snapshot.forEach((doc) => {
        const event = doc.data();
        eventData.push({
          id: doc.id,
          ...event,
        });
      });
      setEvents(eventData);
    });

    // Fetch announcements
    const announcementsCollection = collection(db, "announcements");
    const announcementsQuery = query(announcementsCollection);
    const unsubscribeAnnouncements = onSnapshot(announcementsQuery, (snapshot) => {
      const announcementData = [];
      snapshot.forEach((doc) => {
        const announcement = doc.data();
        announcementData.push({
          id: doc.id,
          ...announcement,
        });
      });
      setAnnouncements(announcementData);
    });

    // Fetch members
    const membersCollection = collection(db, "members");
    const membersQuery = query(membersCollection);
    const unsubscribeMembers = onSnapshot(membersQuery, (snapshot) => {
      const memberData = [];
      snapshot.forEach((doc) => {
        const member = doc.data();
        memberData.push({
          id: doc.id,
          ...member,
        });
      });
      setMembers(memberData);
    });

    // Clean up subscriptions when the component unmounts
    return () => {
      unsubscribeEvents();
      unsubscribeAnnouncements();
      unsubscribeMembers();
    };
  }, []);

  return (
    <div>
      <section className="events">
        <h2 className="events__title">Weekly Community Events</h2>
        <div className="events__list">
          {events.map((event) => (
            <div key={event.id} className="event">
              <h3 className="event__title">{event.title}</h3>
              <p className="event__description">{event.eventInfo}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="announcements">
        <h2 className="announcements__title">Community Announcements</h2>
        <div className="announcements__list">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="announcement">
              <h3 className="announcement__title">{announcement.title}</h3>
              <p className="announcement__content">{announcement.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="members">
        <h2 className="members__title">Community Members</h2>
        <div className="members__list">
          {members.map((member) => (
            <div key={member.id} className="member">
              <h3 className="member__name">{member.name}</h3>
              <h4 className="member__role">{member.role}</h4>
              <p className="member__description">{member.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DummyData;

