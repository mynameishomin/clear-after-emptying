export default function Frame({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen w-screen bg-main-background bg-cover bg-bottom	">
            <div className="h-full w-full backdrop-blur-sm">{children}</div>
        </div>
    );
}
