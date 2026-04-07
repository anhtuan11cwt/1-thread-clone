interface Props {
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  title: string;
}

const PostButton = ({ title, onClick, disabled, loading }: Props) => {
  return (
    <button
      className="w-full bg-white text-black font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition cursor-pointer disabled:opacity-50"
      disabled={disabled || loading}
      onClick={onClick}
      type="button"
    >
      {loading ? "Đang tải..." : title}
    </button>
  );
};

export default PostButton;
