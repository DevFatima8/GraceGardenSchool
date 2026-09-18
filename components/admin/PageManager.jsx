import React, { useState, useEffect, useRef } from 'react';

export default function PageManager() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSection, setEditingSection] = useState(null);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/home-content');
      const data = await res.json();
      if (data.success) {
        setContent(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (section) => {
    setEditingSection(section.section_id);
    setFormData(section);
    setMessage('');
    setError('');
  };

  const handleCancel = () => {
    setEditingSection(null);
    setFormData({});
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });
      const data = await res.json();
      if (data.success) {
        setFormData({ ...formData, image_url: data.imageUrl });
      } else {
        setError('Image upload failed.');
      }
    } catch (err) {
      setError('Image upload error.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/home-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Section updated successfully.');
        setEditingSection(null);
        fetchContent();
      } else {
        setError(data.error || 'Failed to update section.');
      }
    } catch (err) {
      setError('Error updating section.');
    }
  };

  if (loading) return <div>Loading content...</div>;

  return (
    <div>
      <h3 className="fw-bold mb-4">Manage Pages Content</h3>
      <p className="text-muted mb-4">Select a section to update its text and images on the home page.</p>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {content.map((section) => (
          <div key={section.section_id} className="col-md-6 mb-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body d-flex flex-column justify-content-between">
                {editingSection === section.section_id ? (
                  <form onSubmit={handleSubmit}>
                    <h5 className="fw-bold mb-3 text-uppercase">{section.section_id}</h5>
                    <div className="mb-2">
                      <label className="form-label small text-muted">Title</label>
                      <input type="text" name="title" className="form-control" value={formData.title || ''} onChange={handleChange} />
                    </div>
                    <div className="mb-2">
                      <label className="form-label small text-muted">Subtitle</label>
                      <input type="text" name="subtitle" className="form-control" value={formData.subtitle || ''} onChange={handleChange} />
                    </div>
                    <div className="mb-2">
                      <label className="form-label small text-muted">Description</label>
                      <textarea name="description" className="form-control" rows="4" value={formData.description || ''} onChange={handleChange}></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label small text-muted">Image</label>
                      {formData.image_url && <img src={formData.image_url} alt="preview" className="d-block mb-2 rounded" style={{ height: '80px', objectFit: 'cover' }} />}
                      <input type="file" className="form-control form-control-sm" onChange={handleImageUpload} ref={fileInputRef} accept="image/*" />
                    </div>
                    <div className="d-flex gap-2">
                      <button type="submit" className="btn btn-sm text-white" style={{ backgroundColor: 'var(--primary-color-1)' }}>Save Changes</button>
                      <button type="button" className="btn btn-sm btn-light" onClick={handleCancel}>Cancel</button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h5 className="card-title fw-bold text-uppercase mb-0">{section.section_id}</h5>
                      </div>
                      <h6 className="fw-semibold mt-2">{section.title}</h6>
                      <p className="text-muted small mb-3">{section.description?.substring(0, 100)}...</p>
                      {section.image_url && <img src={section.image_url} alt={section.title} className="rounded w-100 mb-3" style={{ height: '150px', objectFit: 'cover' }} />}
                    </div>
                    <button onClick={() => handleEdit(section)} className="btn btn-sm mt-3" style={{ color: 'var(--primary-color-1)', borderColor: 'var(--primary-color-1)' }}>Edit Content</button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
