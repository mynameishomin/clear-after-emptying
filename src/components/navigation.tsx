"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = [
    { name: "버릴 물건", path: "/" },
    { name: "버린 물건", path: "/history" },
];

export default function Navigation() {
    const pathname = usePathname();
    return (
        <nav>
            <ul className="flex text-2xl font-bold gap-4">
                {menus.map((menu, index: number) => {
                    return (
                        <li key={index}>
                            <Link
                                className={`link ${
                                    pathname === menu.path
                                        ? "border-b-2 border-black"
                                        : "text-gray-500"
                                }`}
                                href={menu.path}
                            >
                                {menu.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
