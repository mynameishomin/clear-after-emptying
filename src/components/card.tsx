export const Card = ({ children }: { children: React.ReactElement }) => {
    return (
        <div className="relative w-full h-full rounded-md shadow-lg overflow-hidden md:max-w-52">
            {children}
        </div>
    );
};
