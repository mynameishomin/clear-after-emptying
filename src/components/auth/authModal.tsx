import { useRouter } from "next/navigation";
import { Modal, ModalBody, ModalHeader } from "@/components/modal";
import {
    CHECK_EMAIL_API_URL,
    SIGNIN_API_URL,
    SIGNUP_API_URL,
} from "@/variables";
import { Dispatch, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SignupFormProps, SigninFormProps } from "@/auth/auth.interface";

type AuthMethodType = "signup" | "signin";
interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const onChangeFormState = (modifier: Dispatch<any>) => {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value, name } = e.target;

        modifier((prev: any) => {
            prev[name] = value;
            return { ...prev };
        });
    };
};

const SignupForm = ({ onClose }: { onClose: () => void }) => {
    const createInitialSignupForm = (): SignupFormProps => {
        return {
            email: "",
            password: "",
            confirmPassword: "",
            name: "",
        };
    };

    const [signupForm, setSignupForm] = useState(createInitialSignupForm());
    const [emailValid, setEmailValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const onChangeSignupForm = onChangeFormState(setSignupForm);

    const onCheckEmail = useMemo(() => {
        let checkEmailRequestTimer: NodeJS.Timeout;
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            onChangeSignupForm(e);
            clearTimeout(checkEmailRequestTimer);
            checkEmailRequestTimer = setTimeout(async () => {
                const response = await fetch(CHECK_EMAIL_API_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: e.target.value }),
                });

                setEmailValid(response.ok);
            }, 300);
        };
    }, [onChangeSignupForm]);

    const onSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const response = await fetch(SIGNUP_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(signupForm),
        });

        if (response.ok) {
            onClose();
            setSignupForm(createInitialSignupForm());
            setIsLoading(false);
            router.refresh();
        } else {
            // 로그인, 회원가입 실패처리
        }
    };

    const onSignup_ = async (e: React.FormEvent) => {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(signupForm),
        });

        if (response.ok) {
            showToast("회원가입에 성공했습니다.");
        } else {
            showAlert("회원가입에 실패했습니다.");
        }
    };

    return (
        <form className="flex flex-col gap-4" onSubmit={onSignup}>
            <div className="flex flex-col gap-4">
                <label className="flex flex-col">
                    <h4>이메일</h4>
                    <div className="border-b-2 border-point">
                        <input
                            className="w-full bg-transparent focus:outline-none"
                            type="text"
                            value={signupForm.email}
                            onChange={onCheckEmail}
                            name="email"
                        />
                    </div>
                    <span className="text-xs">
                        {!emailValid &&
                            signupForm.email &&
                            "사용할 수 없는 이메일 입니다."}
                    </span>
                </label>
                <label className="flex flex-col">
                    <h4>비밀번호</h4>
                    <div className="border-b-2 border-point">
                        <input
                            className="w-full bg-transparent focus:outline-none"
                            type="password"
                            value={signupForm.password}
                            onChange={onChangeSignupForm}
                            name="password"
                        />
                    </div>
                </label>

                <label className="flex flex-col">
                    <h4>비밀번호 확인</h4>
                    <div className="border-b-2 border-point">
                        <input
                            className="w-full bg-transparent focus:outline-none"
                            type="password"
                            value={signupForm.confirmPassword}
                            onChange={onChangeSignupForm}
                            name="confirmPassword"
                        />
                    </div>
                    <span className="text-xs">
                        {signupForm.confirmPassword &&
                            signupForm.confirmPassword !==
                                signupForm.password &&
                            "비밀번호가 다릅니다."}
                    </span>
                </label>
                <label className="flex flex-col">
                    <h4>이름</h4>
                    <div className="border-b-2 border-point">
                        <input
                            className="w-full bg-transparent focus:outline-none"
                            type="text"
                            value={signupForm.name}
                            onChange={onChangeSignupForm}
                            name="name"
                        />
                    </div>
                </label>
            </div>
            <button
                className="py-1 px-2 rounded-lg border-2 border-point bg-sub disabled:text-gray-400"
                type="submit"
            >
                회원가입
            </button>
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
                        회원가입 중입니다.
                        <br />
                        잠시만 기다려주세요.
                    </p>
                </motion.div>
            )}
        </form>
    );
};

const SigninForm = ({ onClose }: { onClose: () => void }) => {
    const createInitialSigninForm = (): SigninFormProps => {
        return {
            email: "",
            password: "",
        };
    };

    const [signinForm, setSigninForm] = useState(createInitialSigninForm());
    const [isLoading, setIsLoading] = useState(false);

    const onChangeSigninForm = onChangeFormState(setSigninForm);

    const router = useRouter();

    const onSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const response = await fetch(SIGNIN_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(signinForm),
        });

        if (response.ok) {
            onClose();
            setSigninForm(createInitialSigninForm());
            setIsLoading(false);
            router.refresh();
        } else {
            // 로그인, 회원가입 실패처리
        }
    };

    return (
        <form className="flex flex-col gap-4" onSubmit={onSignup}>
            <div className="flex flex-col gap-4">
                <label className="flex flex-col">
                    <h4>이메일</h4>
                    <div className="border-b-2 border-point">
                        <input
                            className="w-full bg-transparent focus:outline-none"
                            type="text"
                            value={signinForm.email}
                            onChange={onChangeSigninForm}
                            name="email"
                        />
                    </div>
                </label>
                <label className="flex flex-col">
                    <h4>비밀번호</h4>
                    <div className="border-b-2 border-point">
                        <input
                            className="w-full bg-transparent focus:outline-none"
                            type="password"
                            value={signinForm.password}
                            onChange={onChangeSigninForm}
                            name="password"
                        />
                    </div>
                </label>
            </div>
            <button
                className="py-1 px-2 rounded-lg border-2 border-point bg-sub disabled:text-gray-400"
                type="submit"
            >
                로그인
            </button>
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
                        로그인 중입니다.
                        <br />
                        잠시만 기다려주세요.
                    </p>
                </motion.div>
            )}
        </form>
    );
};

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
    const [authMethod, setAuthMethod] = useState<AuthMethodType>("signup");

    return (
        <AnimatePresence>
            <Modal isOpen={isOpen} onClose={onClose}>
                <>
                    <ModalHeader>
                        <div className="flex gap-2 text-xl text-gray-400">
                            <button
                                className={`${
                                    authMethod === "signin" &&
                                    "text-point border-b-2 border-point"
                                } transition-all`}
                                onClick={() => setAuthMethod("signin")}
                                type="button"
                            >
                                로그인
                            </button>
                            <button
                                className={`${
                                    authMethod === "signup" &&
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
                        <>
                            {authMethod === "signup" && (
                                <SignupForm onClose={onClose} />
                            )}
                            {authMethod === "signin" && (
                                <SigninForm onClose={onClose} />
                            )}
                        </>
                    </ModalBody>
                </>
            </Modal>
        </AnimatePresence>
    );
};

export default AuthModal;
