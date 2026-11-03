import React from 'react';

const EventDetailsPage = async({params}) => {
    const { id } =await params;
    console.log("id",id);
    return (
        <div>
            event details page for {id}
        </div>
    );
};

export default EventDetailsPage;