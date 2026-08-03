import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(storedUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4">
      <div className="bg-zinc-900 rounded-xl shadow-lg p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-8">
          My Profile
        </h1>

        <div className="space-y-5">

          <div>
            <p className="text-gray-400 text-sm">Name</p>
            <p className="text-lg font-medium">{user.name}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Email</p>
            <p className="text-lg font-medium">{user.email}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Role</p>
            <span className="inline-block bg-blue-600 px-3 py-1 rounded-full text-sm capitalize">
              {user.role}
            </span>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Account Created</p>
            <p>{new Date(user.createdAt).toLocaleDateString()}</p>
          </div>

        </div>

        <button
          onClick={handleLogout}
          className="w-full mt-8 bg-blue-700 hover:bg-blue-900 py-3 rounded-lg font-semibold transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;