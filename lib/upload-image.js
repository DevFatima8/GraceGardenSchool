import { v2 as cloudinary } from 'cloudinary';
import { promises as fs } from 'fs';
import path from 'path';

let cloudinaryReady = false;

function configureCloudinary() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return false;
  }

  if (!cloudinaryReady) {
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });
    cloudinaryReady = true;
  }

  return true;
}

async function uploadToCloudinary(buffer, originalName) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'grace-garden-school',
        resource_type: 'image',
        public_id: `${path.parse(originalName).name}-${Date.now()}`.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 120),
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(buffer);
  });
}

async function uploadToLocal(buffer, originalName) {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const ext = path.extname(originalName) || '.jpg';
  const safeBase = path.basename(originalName, ext).replace(/[^a-zA-Z0-9_-]/g, '_') || 'image';
  const filename = `${safeBase}-${uniqueSuffix}${ext}`;
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');

  try {
    await fs.access(uploadDir);
  } catch {
    await fs.mkdir(uploadDir, { recursive: true });
  }

  await fs.writeFile(path.join(uploadDir, filename), buffer);
  return `/uploads/${filename}`;
}

/**
 * Upload an image buffer. Prefers Cloudinary so files survive redeploys.
 * Falls back to local public/uploads when Cloudinary is not configured.
 */
export async function uploadImageBuffer(buffer, originalName = 'image.jpg') {
  if (configureCloudinary()) {
    try {
      const result = await uploadToCloudinary(buffer, originalName);
      return {
        success: true,
        imageUrl: result.secure_url,
        provider: 'cloudinary',
      };
    } catch (error) {
      console.error('Cloudinary upload failed, falling back to local:', error.message);
    }
  }

  const imageUrl = await uploadToLocal(buffer, originalName);
  return {
    success: true,
    imageUrl,
    provider: 'local',
  };
}
