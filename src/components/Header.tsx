type HeaderProps = {
  title?: string;
  userName?: string;
  userRole?: string;
  onLogout?: () => void;
};

export default function Header({
  title = "VisualMath AI",
  userName,
  userRole,
  onLogout,
}: HeaderProps) {
  return (
    <header className="bg-white rounded-2xl shadow-lg p-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brand-700">{title}</h1>

          {userName && <p className="text-gray-600 mt-1">Selamat datang, {userName} 👋</p>}
        </div>

        <div className="flex items-center gap-3">
          {userRole && (
            <div className="px-3 py-2 rounded-lg bg-gray-50">
              <p className="text-xs text-gray-500">Role</p>
              <p className="text-sm font-semibold text-gray-700">{userRole}</p>
            </div>
          )}

          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className="px-4 py-2 rounded-lg bg-gray-100 font-semibold text-gray-700 hover:bg-gray-200 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
