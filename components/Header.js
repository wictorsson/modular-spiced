import styled from "styled-components";
import { useSession, signIn, signOut } from "next-auth/react";

const Headline = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  position: fixed;
  color: grey;
  gap: 10px;
  width: 100%;
  text-align: center;
  z-index: 1;
  background-color: #181818;
  background: radial-gradient(
    circle,
    rgba(34, 30, 26, 1) 0%,
    rgba(19, 19, 19, 1) 83%
  );
  border-style: solid;
  border-color: #46494c;
  border-width: 1px;
  top: 0px;
`;

export default function Header() {
  const { data: session } = useSession();
  return (
    <Headline>
      {session ? (
        <>
          Signed in | {session.user.name} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          <br />
          <button onClick={() => signIn()}>Sign in</button> to save and browse
          patches
        </>
      )}
    </Headline>
  );
}
