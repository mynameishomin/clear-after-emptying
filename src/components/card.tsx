// export const Card = ({ children }: { children: React.ReactElement }) => {
//     return (
//         <div className="relative w-full h-full rounded-md shadow-lg overflow-hidden md:max-w-52">
//             {children}
//         </div>
//     );
// };

export const CardWrapper = ({ children }: { children: React.ReactElement }) => {
    return <div className="p-4 rounded-md bg-main">{children}</div>;
};

export const Card = ({ children }: { children: React.ReactElement }) => {
    return <div className="p-2 border-point rounded-md bg-sub">{children}</div>;
};
