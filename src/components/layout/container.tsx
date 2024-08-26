const Container = ({ children }: { children: React.ReactElement }) => {
    return (
        <div className="flex flex-col w-full grow px-4 max-w-6xl mx-auto">
            {children}
        </div>
    );
};

export default Container;
