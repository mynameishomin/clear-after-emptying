import { Modal, ModalBody, ModalHeader } from "@/components/modal";
import { useState } from "react";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface AuthInfoProps {
    [key: string]: string;
    email: string;
    password: string;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
    const [isLoginPage, setIsLoginPage] = useState(true);
    const [authInfo, setAuthInfo] = useState<AuthInfoProps>(
        {} as AuthInfoProps
    );

    const onChangeAuthInfo = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { value, name } = e.target;
        setAuthInfo((prev) => {
            prev[name] = value;
            return { ...prev };
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <>
                <ModalHeader>
                    <div className="flex gap-2 text-xl text-main">
                        <button
                            className={`${
                                isLoginPage &&
                                "text-point border-b-2 border-point"
                            } transition-all`}
                            onClick={() => setIsLoginPage(true)}
                        >
                            로그인
                        </button>
                        <button
                            className={`${
                                !isLoginPage &&
                                "text-point border-b-2 border-point"
                            } transition-all`}
                            onClick={() => setIsLoginPage(false)}
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
                                    onChange={onChangeAuthInfo}
                                    name="email"
                                />
                            </div>
                        </label>
                        <label className="flex flex-col">
                            <h4>비밀번호</h4>
                            <div className="border-b-2 border-point">
                                <input
                                    className="w-full bg-transparent focus:outline-none"
                                    type="text"
                                    value={authInfo.password}
                                    onChange={onChangeAuthInfo}
                                    name="password"
                                />
                            </div>
                        </label>
                        <label className="flex flex-col">
                            <h4>비밀번호 확인</h4>
                            <div className="border-b-2 border-point">
                                <input
                                    className="w-full bg-transparent focus:outline-none"
                                    type="text"
                                    value={authInfo.confirmPassword}
                                    onChange={onChangeAuthInfo}
                                    name="confirmPassword"
                                />
                            </div>
                        </label>
                        <label className="flex flex-col">
                            <h4>별명</h4>
                            <div className="border-b-2 border-point">
                                <input
                                    className="w-full bg-transparent focus:outline-none"
                                    type="text"
                                    value={authInfo.confirmPassword}
                                    onChange={onChangeAuthInfo}
                                    name="confirmPassword"
                                />
                            </div>
                        </label>
                    </div>
                </ModalBody>
            </>
        </Modal>
    );
};

export default AuthModal;
