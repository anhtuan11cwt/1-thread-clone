import Image from "next/image";

interface AvatarProps {
  alt?: string;
  height?: number;
  imageSrc?: string | null;
  width?: number;
}

const Avatar = ({
  imageSrc,
  alt = "ảnh đại diện",
  width = 80,
  height = 80,
}: AvatarProps) => {
  return (
    <div
      className="relative rounded-full overflow-hidden bg-surface shrink-0"
      style={{ height, width }}
    >
      {imageSrc ? (
        <Image alt={alt} className="object-cover" fill src={imageSrc} />
      ) : (
        <div className="flex items-center justify-center h-full text-text-muted">
          ?
        </div>
      )}
    </div>
  );
};

export default Avatar;
