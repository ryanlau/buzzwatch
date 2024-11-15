import { SignInWithGoogleButton, SignOutButton } from "./SignInSignOutButton";

interface HeaderProps {
  signedIn: boolean;
}
export default function Header({ signedIn }: HeaderProps) {
  return (
    <div className="pb-4 text-4xl font-bold">
      <div className="flex">
        <div>buzzwatch</div>
        <div className="flex-grow"></div>
        <div className="flex flex-col">
          {signedIn ? <SignOutButton /> : <SignInWithGoogleButton />}
        </div>
      </div>
    </div>
  );
}
