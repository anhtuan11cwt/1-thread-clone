import cloudinary from "@/lib/cloudinary";

export interface CloudinaryUploadResponse {
  public_id: string;
  secure_url: string;
}

export const uploadToCloudinary = async (
  file: File,
  folder: string,
): Promise<CloudinaryUploadResponse> => {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `threads-clone/${folder}`,
        resource_type: "auto",
      },
      (error, result) => {
        if (error || !result) {
          return reject(error);
        }
        resolve({
          public_id: result.public_id,
          secure_url: result.secure_url,
        });
      },
    );

    uploadStream.end(buffer);
  });
};

export const deleteFromCloudinary = async (
  publicId: string,
): Promise<{ result: string }> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        return reject(error);
      }
      resolve({ result: result as string });
    });
  });
};
