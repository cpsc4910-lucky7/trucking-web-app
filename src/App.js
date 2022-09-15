import { useState } from "react";
import { useAuth } from "./use-auth";

function LogInWindow() {
  const { signIn } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col mx-auto mt-10 p-2 w-96 bg-orange-300 rounded">
      <h2 className="text-2xl font-bold text-white text-center">Login</h2>
      <input
        className="m-2 p-1 rounded shadow bg-slate-100"
        type="Username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />

      <input
        className="m-2 p-1 rounded shadow bg-slate-100"
        type="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <button
        className="m-2 p-2 rounded shadow bg-slate-100"
        onClick={() => {
          signIn(username, password);
        }}
      >
        Log In
      </button>
    </div>
  );
}

function SignedInDummy() {
  const { user, signOut } = useAuth();
  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="flex w-full h-12 bg-orange-300">
        Truck
      </div>
      <div className="mx-auto pt-4">
      <p>Welcome {user.username}</p>
      <button
      className="bg-orange-200 rounded shadow p-1 m-2"
        onClick={() => {
          signOut();
        }}
      >
        Log Out
      </button>
      </div>
      
    </div>
  );
}

function App() {
  const { isSignedIn } = useAuth();

  return (
    <div className="w-screen h-screen">
      {isSignedIn ? <SignedInDummy /> : <LogInWindow />}
    </div>
  );
}

export default App;
