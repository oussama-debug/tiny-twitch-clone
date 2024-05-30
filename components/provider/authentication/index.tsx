"use client";

import LoginForm from "@/app/(guest)/(website)/_slices/forms/login";
import Modal from "@/components/modal";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import RegisterForm from "@/app/(guest)/(website)/_slices/forms/register";

type AuthenticationProviderProps = {
  children?: React.ReactNode;
};

export default function AuthenticationProvider({
  children,
}: AuthenticationProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const showLogin = params.get("showLogin") === "true" ? true : false;
  const showSignUp = params.get("showSignup") === "true" ? true : false;

  const closeModal = (typeOfModal: "register" | "login") => {
    const toDelete = typeOfModal === "register" ? "showSignup" : "showLogin";
    const newParams = new URLSearchParams(params.toString());
    newParams.delete(toDelete);
    router.push(`${pathname}?${newParams}`);
  };

  return (
    <>
      {children}
      <Modal
        show={showLogin}
        size={"small"}
        onClose={() => closeModal("login")}
      >
        <LoginForm />
      </Modal>
      <Modal
        show={showSignUp}
        size={"small"}
        onClose={() => closeModal("register")}
      >
        <RegisterForm />
      </Modal>
    </>
  );
}
