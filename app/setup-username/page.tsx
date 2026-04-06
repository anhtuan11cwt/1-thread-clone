import { authStyles } from "../(auth)/styles";

export default function SetupUsernamePage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-white text-center">
          Thiết lập tên người dùng
        </h1>

        <form className="space-y-4">
          <input
            className={authStyles.input}
            placeholder="Chọn tên người dùng của bạn"
            type="text"
          />

          <button className={authStyles.button} type="submit">
            Tiếp tục
          </button>
        </form>
      </div>
    </main>
  );
}
