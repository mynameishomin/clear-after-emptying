import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faBars } from "@fortawesome/free-solid-svg-icons";
import { site } from "@/variables";
import Link from "next/link";

export const Header = () => {
    return (
        <header className="fixed inset-0 bottom-auto mt-4 px-2 overflow-hidden sm:flex sm:justify-center z-10">
            <div className="border-2 border-point h-12 pl-4 rounded-md backdrop-blur-3xl sm:pr-4">
                <div className="flex h-full items-center">
                    <div className="mr-auto sm:mr-4 sm:pr-2 sm:border-r-2 sm:border-point">
                        {site.title}
                    </div>

                    <button className="sm:hidden">
                        <FontAwesomeIcon
                            className="block w-5 h-5 p-4"
                            icon={faBars}
                        />
                    </button>
                    <nav className="hidden sm:block">
                        <ul className="flex space-x-2">
                            <li className="p-2">
                                <Link href="/">메뉴</Link>
                            </li>
                            <li className="p-2">
                                <Link href="/">메뉴</Link>
                            </li>
                            <li className="p-2">
                                <Link href="/">메뉴</Link>
                            </li>
                            <li className="p-2">
                                <Link href="/">메뉴</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};
