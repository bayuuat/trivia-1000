import { handleGoogleSignIn } from "@/app/actions";
import { Button } from "./ui/button";

export default function GoogleLoginButton() {
	return (
		<Button onClick={handleGoogleSignIn} variant='outline' className='w-full'>
			Login with Google
		</Button>
	);
}
