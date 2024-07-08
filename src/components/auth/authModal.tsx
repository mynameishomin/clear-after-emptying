import { useRouter } from "next/navigation";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/components/modal";
import {
    CHECK_EMAIL_API_URL,
    SIGNIN_API_URL,
    SIGNUP_API_URL,
} from "@/variables";
import { useMemo, useState } from "react";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface AuthInfoProps {
    [key: string]: string;
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
    const router = useRouter();
    const [isLoginPage, setIsLoginPage] = useState(true);
    const [authInfo, setAuthInfo] = useState<AuthInfoProps>(
        {} as AuthInfoProps
    );

    const [emailStatus, setEmailStatus] = useState({
        message: "",
        valid: false,
    });

    const authApiUrl = isLoginPage ? SIGNIN_API_URL : SIGNUP_API_URL;

    const onChangeAuthInfo = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { value, name } = e.target;
        setAuthInfo((prev) => {
            prev[name] = value;
            return { ...prev };
        });
    };

    const onCheckEmail = useMemo(() => {
        let checkEmailRequestTimer: NodeJS.Timeout;

        return (e: React.ChangeEvent<HTMLInputElement>) => {
            clearTimeout(checkEmailRequestTimer);
            checkEmailRequestTimer = setTimeout(async () => {
                const response = await fetch(CHECK_EMAIL_API_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: e.target.value }),
                });

                const data = await response.json();
                setEmailStatus({message: data.message, valid: response.ok})
            }, 300);
        };
    }, []);

    const resetAuthInfo = () => {
        setAuthInfo({
            email: "",
            password: "",
            confirmPassword: "",
            name: "",
        });
    };

    const requestAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch(authApiUrl, {
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
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={requestAuth}>
                <ModalHeader>
                    <div className="flex gap-2 text-xl text-main">
                        <button
                            className={`${
                                isLoginPage &&
                                "text-point border-b-2 border-point"
                            } transition-all`}
                            onClick={() => setIsLoginPage(true)}
                            type="button"
                        >
                            로그인
                        </button>
                        <button
                            className={`${
                                !isLoginPage &&
                                "text-point border-b-2 border-point"
                            } transition-all`}
                            onClick={() => setIsLoginPage(false)}
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
                                    value={authInfo.email}
                                    onChange={onCheckEmail}
                                    name="email"
                                />
                            </div>
                            <span className="text-xs">{!emailStatus.valid && !isLoginPage && emailStatus.message}</span>
                        </label>
                        <label className="flex flex-col">
                            <h4>비밀번호</h4>
                            <div className="border-b-2 border-point">
                                <input
                                    className="w-full bg-transparent focus:outline-none"
                                    type="password"
                                    value={authInfo.password}
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
                                            value={authInfo.confirmPassword}
                                            onChange={onChangeAuthInfo}
                                            name="confirmPassword"
                                        />
                                    </div>
                                </label>
                                <label className="flex flex-col">
                                    <h4>이름</h4>
                                    <div className="border-b-2 border-point">
                                        <input
                                            className="w-full bg-transparent focus:outline-none"
                                            type="text"
                                            value={authInfo.name}
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
                        <button type="submit">
                            {isLoginPage ? "로그인" : "회원가입"}
                        </button>
                    </div>
                </ModalFooter>
            </form>
        </Modal>
    );
};

export default AuthModal;
