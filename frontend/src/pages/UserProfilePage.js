import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserProfilePage = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`http://localhost:5000/api/users/${id}`);
            setUser(res.data);
        };
        fetchUser();
    }, [id]);

    if (!user) return <p>Loading...</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>{user.username}'s Profile</h1>
            <h3>Reviews:</h3>
            {user.reviews.length === 0 ? <p>No reviews yet.</p> : (
                user.reviews.map(r => (
                    <div key={r._id} style={{ borderTop: '1px solid #ccc', marginTop: '5px', paddingTop: '5px' }}>
                        <p><strong>Book:</strong> {r.bookTitle}</p>
                        <p><strong>Rating:</strong> {r.rating}</p>
                        <p>{r.comment}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default UserProfilePage;
