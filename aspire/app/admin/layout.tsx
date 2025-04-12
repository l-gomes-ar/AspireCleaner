import NavBar from "@/app/ui/admin/navbar";

export default function Layout({ children }: { children: React.ReactNode}) {
    return (
        <>
            <NavBar />
            {children}
        </>
    );
};