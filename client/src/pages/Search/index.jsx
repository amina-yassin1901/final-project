import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import UserSearchItem from "@/components/UserSearchItem";

import { searchUsersRequest } from "@/api/users";

import styles from "./Search.module.css";

function Search() {
  const { user: currentUser } = useSelector((state) => state.auth);

  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const currentUserId = currentUser?._id || currentUser?.id;

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setUsers([]);
      setStatus("idle");
      setError("");
      return;
    }

    const timerId = setTimeout(async () => {
      try {
        setStatus("loading");
        setError("");

        const response = await searchUsersRequest(trimmedQuery);

        const filteredUsers = response.data.filter(
          (user) => user._id?.toString() !== currentUserId?.toString(),
        );

        setUsers(filteredUsers);
        setStatus("succeeded");
      } catch (error) {
        setUsers([]);
        setStatus("failed");
        setError(error.response?.data?.message || "Failed to search users");
      }
    }, 400);

    return () => {
      clearTimeout(timerId);
    };
  }, [query, currentUserId]);

  const handleClear = () => {
    setQuery("");
    setUsers([]);
    setStatus("idle");
    setError("");
  };

  return (
    <main className={styles.page}>
      <h1>Search</h1>

      <div className={styles.searchBox}>
        <span className={styles.searchIcon}>⌕</span>

        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search users"
          autoComplete="off"
        />

        {query && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={handleClear}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      <section className={styles.results}>
        {!query.trim() && (
          <div className={styles.start}>
            <h2>Find people</h2>

            <p>Search by username or full name.</p>
          </div>
        )}

        {status === "loading" && <p className={styles.message}>Searching...</p>}

        {status === "failed" && <p className={styles.error}>{error}</p>}

        {status === "succeeded" && users.length === 0 && (
          <div className={styles.empty}>
            <h2>No users found</h2>

            <p>Try searching with another username or name.</p>
          </div>
        )}

        {status === "succeeded" && users.length > 0 && (
          <div className={styles.list}>
            {users.map((user) => (
              <UserSearchItem key={user._id} user={user} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Search;
