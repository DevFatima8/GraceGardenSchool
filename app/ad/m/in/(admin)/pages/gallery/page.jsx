'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

export default function GalleryAdminPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/gallery');
      if (res.data.success) {
        setItems(res.data.items || []);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to load gallery');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const toastId = toast.loading('Uploading image...');
    try {
      const formData = new FormData();
      formData.append('file', file);
      const uploadRes = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (!uploadRes.data.success) {
        throw new Error('Upload failed');
      }

      const saveRes = await axios.post('/api/gallery', {
        image_url: uploadRes.data.imageUrl,
        title: file.name,
      });

      if (saveRes.data.success) {
        toast.success('Image added to gallery', { id: toastId });
        fetchItems();
      } else {
        throw new Error(saveRes.data.error || 'Save failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to add gallery image', { id: toastId });
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleDelete = async (item) => {
    try {
      const toastId = toast.loading('Removing...');
      const res = await axios.delete('/api/gallery', { data: { id: item.id } });
      if (res.data.success) {
        toast.success('Image removed', { id: toastId });
        setItems((prev) => prev.filter((row) => row.id !== item.id));
      } else {
        toast.error('Failed to remove image', { id: toastId });
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to remove image');
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <Toaster position="top-right" />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="mb-1">Photo Gallery</h4>
          <p className="text-muted mb-0 small">Images are stored permanently (Cloudinary when configured) and listed on /gallery.</p>
        </div>
        <label className={`btn btn-primary mb-0 ${uploading ? 'disabled' : ''}`}>
          <i className="fas fa-plus me-2"></i>
          {uploading ? 'Uploading...' : 'Add Image'}
          <input type="file" accept="image/*" hidden disabled={uploading} onChange={handleUpload} />
        </label>
      </div>

      {loading ? (
        <div className="text-center py-5">Loading...</div>
      ) : items.length === 0 ? (
        <div className="alert alert-info">No gallery images yet. Upload one to get started.</div>
      ) : (
        <div className="row g-3">
          {items.map((item) => (
            <div className="col-lg-3 col-md-4 col-sm-6" key={item.id}>
              <div className="card border-0 shadow-sm h-100">
                <button
                  type="button"
                  className="border-0 bg-transparent p-0 w-100"
                  title="Click to view image"
                  style={{ cursor: 'zoom-in' }}
                  onClick={() => window.open(item.image_url, '_blank', 'noopener,noreferrer')}
                >
                  <img src={item.image_url} alt={item.title || 'Gallery'} className="card-img-top" style={{ height: '180px', objectFit: 'cover', width: '100%' }} />
                </button>
                <div className="card-body d-flex justify-content-between align-items-center">
                  <button
                    type="button"
                    className="btn btn-link btn-sm p-0 text-decoration-none"
                    style={{ color: 'var(--primary-color-1)' }}
                    onClick={() => window.open(item.image_url, '_blank', 'noopener,noreferrer')}
                  >
                    <i className="far fa-eye me-1"></i>View
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item)}>
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
