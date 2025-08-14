export const SelectTravelesList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'A solo travels in exploration',
        icon:'✈️',
        people: '1 people'
    },
    {
        id: 2,
        title: 'Couple',
        desc: 'A couple’s getaway',
        icon:'🥂',
        people: '2 people'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A family trip with kids',
        icon:'🏠',
        people: '4 people'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'A group of friends on an adventure',
        icon:'🏝️',
        people: '2 people'
    }
]   

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Budget',
        desc: 'Affordable options for budget travelers',
        icon:'💵',
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Comfortable options for mid-range travelers',
        icon:'💳',
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'High-end options for luxury travelers',
        icon:'💸',
    }
];
export const AI_PROMPT="Generate Travel Plan for Location : {location}, for {totalDays} Days and {totalNight} Night for {traveler} with a {budget} Budget with a Flight details, Flight Price with Booking url, Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and Places to visit nearby with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time t travel each of the location for {totalDays} days and {totalNight} night with each day plan with best time to visit in JSON format.";