import { useEffect, useState } from "react";
import UserTable from "../components/UserTable";
import SearchBar from "../components/SearchBar";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const usersPerPage = 5;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  const filteredUsers = users
    .filter(user =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      const valA = sortField === "company" ? a.company.name : a.name;
      const valB = sortField === "company" ? b.company.name : b.name;
      return order === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });

  const start = (page - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(start, start + usersPerPage);

  if (loading) return <p style={{textAlign:"center"}}>Loading users...</p>;

  return (
    <div className="container">
      <h2>User Directory</h2>

      <SearchBar setSearch={setSearch} />

      {filteredUsers.length === 0 ? (
        <p>No users found</p>
      ) : (
        <>
          <UserTable
            users={paginatedUsers}
            setSortField={setSortField}
            setOrder={setOrder}
            order={order}
          />

          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>
              Prev
            </button>
            <span> Page {page} </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={start + usersPerPage >= filteredUsers.length}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;