import { Link } from "react-router-dom";

export default function HomePage({ mainUser, isAuthenticated }: any) {
  console.log(mainUser);

  return (
    <>
      {isAuthenticated ? (
        <>
          {Object.keys(mainUser).length ? (
            <div>User Found</div>
          ) : (
            <div>Loading...</div>
          )}
        </>
      ) : (
        <div>
          <h2>Please Sign In To See Your Content</h2>
          <Link to="/login">Sign In</Link>
        </div>
      )}
    </>
  );
}
