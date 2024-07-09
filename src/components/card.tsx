export const Card = ({ children }: { children: React.ReactElement }) => {
    return (
        <div className="border-2 border-point rounded-md bg-sub overflow-hidden">
            {children}
        </div>
    );
};