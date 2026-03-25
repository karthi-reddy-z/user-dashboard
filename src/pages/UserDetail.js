import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [id]);

  if (!user) return <p style={{textAlign:"center"}}>Loading...</p>;

  return (
    <div className="container">
      <button onClick={() => navigate("/")}>← Back</button>

      <div className="card">
        <h2>{user.name}</h2>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Phone:</b> {user.phone}</p>
        <p><b>Username:</b> {user.username}</p>
        <p><b>Website:</b> {user.website}</p>
        <p><b>Company:</b> {user.company.name}</p>
        <p><b>City:</b> {user.address.city}</p>
      </div>
    </div>
  );
}

export default UserDetail;