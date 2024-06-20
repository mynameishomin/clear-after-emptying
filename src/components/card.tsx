export const Card = ({ children }: { children: React.ReactElement }) => {
    return (
        <div className="relative w-full h-full rounded-sm bg-white shadow-lg max-w-52">
            {children}
        </div>
    );
};
