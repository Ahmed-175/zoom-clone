import useAuth from "../hooks/useAuth";
import Picture from "./Picture";

const Header = () => {
    const { user, loading } = useAuth();

    if (!user || loading) {
        return (
            <div className="fixed left-0 right-0 top-0 h-20 flex justify-between items-center px-6 bg-white ">

                <div className="w-24 h-8 bg-gray-200 rounded-md animate-pulse"></div>

                <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
        );
    }

    return (
        <div className="fixed left-0 right-0 top-0 h-20 flex justify-between items-center px-6 ">
            <div className="text-2xl"></div>
            <div className="flex justify-center items-center gap-3">
                <Picture user={user} size="lg" />
                <div>
                    <div className=" font-bold text-sm">{user.username}</div>
                    <div className="text-xs text-gray-600">{user.email}</div>
                </div>
            </div>
        </div>
    );
};

export default Header;