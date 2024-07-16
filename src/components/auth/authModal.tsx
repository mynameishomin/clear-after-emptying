import { useRouter } from "next/navigation";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/components/modal";
import { AUTH_API_URL, CHECK_EMAIL_API_URL } from "@/variables";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SignupFormProps, SigninFormProps } from "@/auth/auth.interface";

type AuthMethodType = "signup" | "signin";
interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const createInitialSignupForm = (): SignupFormProps => {
    return {
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
    };
};

const createInitialSigninForm = (): SigninFormProps => {
    return {
        email: "",
        password: "",
    };
};

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
    const router = useRouter();
    const [signupForm, setSignupForm] = useState(createInitialSignupForm());
    const [signinForm, setSigninForm] = useState(createInitialSigninForm());
    const [authMethod, setAuthMethod] = useState<AuthMethodType>("signup");

    // const [isLoginPage, setIsLoginPage] = useState(true);
    const [authInfo, setAuthInfo] = useState(createInitialAuthInfo());
    const [isLoading, setIsLoading] = useState(false);

    const isFormValid = isLoginPage
        ? Boolean(authInfo.email.value && authInfo.password.value)
        : Boolean(
              authInfo.email.valid &&
                  authInfo.password.value === authInfo.confirmPassword.value &&
                  authInfo.name.value
          );

    const onChangeAuthInfo = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { value, name } = e.target;
        setSigninForm((prev) => {
            prev[name] = value;
            return { ...prev };
        });

        setSignupForm((prev) => {
            prev[name] = value;
            return { ...prev };
        });
    };

    const onCheckEmail = useMemo(() => {
        let checkEmailRequestTimer: NodeJS.Timeout;
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            onChangeAuthInfo(e);
            clearTimeout(checkEmailRequestTimer);
            checkEmailRequestTimer = setTimeout(async () => {
                const response = await fetch(CHECK_EMAIL_API_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: e.target.value }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setAuthInfo((prev) => {
                        prev.email.message = data.message;
                        prev.email.valid = true;
                        return { ...prev };
                    });
                }
            }, 300);
        };
    }, []);

    const resetAuthInfo = () => {
        setSignupForm(createInitialSignupForm());
        setSigninForm(createInitialSigninForm());
    };

    const requestAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const response = await fetch(`${AUTH_API_URL}/${authMethod}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(authInfo),
        });

        if (response.ok) {
            resetAuthInfo();
            onClose();
            router.refresh();
        } else {
            // 로그인, 회원가입 실패처리
        }
        setIsLoading(true);
    };

    return (
        <AnimatePresence>
            <Modal isOpen={isOpen} onClose={onClose}>
                <form onSubmit={requestAuth}>
                    <ModalHeader>
                        <div className="flex gap-2 text-xl text-gray-400">
                            <button
                                className={`${
                                    isLoginPage &&
                                    "text-point border-b-2 border-point"
                                } transition-all`}
                                onClick={() => setAuthMethod("signin")}
                                type="button"
                            >
                                로그인
                            </button>
                            <button
                                className={`${
                                    !isLoginPage &&
                                    "text-point border-b-2 border-point"
                                } transition-all`}
                                onClick={() => setAuthMethod("signup")}
                                type="button"
                            >
                                회원가입
                            </button>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-4">
                            <label className="flex flex-col">
                                <h4>이메일</h4>
                                <div className="border-b-2 border-point">
                                    <input
                                        className="w-full bg-transparent focus:outline-none"
                                        type="text"
                                        value={authInfo.email.value}
                                        onChange={onCheckEmail}
                                        name="email"
                                    />
                                </div>
                                <span className="text-xs">
                                    {!authInfo.email.valid &&
                                        !isLoginPage &&
                                        authInfo.email.message}
                                </span>
                            </label>
                            <label className="flex flex-col">
                                <h4>비밀번호</h4>
                                <div className="border-b-2 border-point">
                                    <input
                                        className="w-full bg-transparent focus:outline-none"
                                        type="password"
                                        value={authInfo.password.value}
                                        onChange={onChangeAuthInfo}
                                        name="password"
                                    />
                                </div>
                            </label>

                            {!isLoginPage && (
                                <>
                                    <label className="flex flex-col">
                                        <h4>비밀번호 확인</h4>
                                        <div className="border-b-2 border-point">
                                            <input
                                                className="w-full bg-transparent focus:outline-none"
                                                type="password"
                                                value={
                                                    authInfo.confirmPassword
                                                        .value
                                                }
                                                onChange={onChangeAuthInfo}
                                                name="confirmPassword"
                                            />
                                        </div>
                                        <span className="text-xs">
                                            {authInfo.confirmPassword.value &&
                                                authInfo.confirmPassword
                                                    .value !==
                                                    authInfo.password.value &&
                                                "비밀번호가 다릅니다."}
                                        </span>
                                    </label>
                                    <label className="flex flex-col">
                                        <h4>이름</h4>
                                        <div className="border-b-2 border-point">
                                            <input
                                                className="w-full bg-transparent focus:outline-none"
                                                type="text"
                                                value={authInfo.name.value}
                                                onChange={onChangeAuthInfo}
                                                name="name"
                                            />
                                        </div>
                                    </label>
                                </>
                            )}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="flex justify-end gap-3">
                            <button onClick={onClose} type="button">
                                닫기
                            </button>
                            <button
                                className="disabled:text-gray-400"
                                type="submit"
                                disabled={!isFormValid}
                            >
                                {isLoginPage ? "로그인" : "회원가입"}
                            </button>
                        </div>
                    </ModalFooter>
                    {isLoading && (
                        <motion.div
                            className="absolute inset-0 flex justify-center items-center bg-sub"
                            layout
                            layoutId="auth-loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 1 }}
                        >
                            <p>
                                {isLoading ? "로그인" : "회원가입"} 중입니다.
                                <br />
                                잠시만 기다려주세요.
                            </p>
                        </motion.div>
                    )}
                </form>
            </Modal>
        </AnimatePresence>
    );
};

export default AuthModal;
