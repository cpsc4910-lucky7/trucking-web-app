import { useState } from 'react';
import { useAuth } from './use-auth';

function LogInWindow() {
  const { signIn } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
      <div className='flex flex-col mx-auto mt-10 p-2 w-96 bg-slate-500 rounded'>
        <h2>Login</h2>
        <input className='m-2 rounded shadow bg-slate-300' type="Username" value={username} onChange={(e) => {setUsername(e.target.value)}} />

        <input className='m-2 rounded shadow bg-slate-300' type="Password" value={password} onChange={(e) => {setPassword(e.target.value)}} />

        <button className='m-2 p-2 rounded shadow bg-slate-300' onClick={() => {signIn(username, password)}}>
          Log In
        </button>
      </div>
      
  );
}

function SignedInDummy() {
  const { user, signOut } = useAuth();
  return (
    <div>
      <p>Welcome {user.username}</p>
      <button onClick={() => {signOut()}}>Log Out</button>
    </div>
  )
}

function App() {
  const { isSignedIn } = useAuth();

  return (
    <div className='w-screen h-screen'>
      {isSignedIn?<SignedInDummy/>:<LogInWindow/>}
      
    </div>
  );
}

export default App;
