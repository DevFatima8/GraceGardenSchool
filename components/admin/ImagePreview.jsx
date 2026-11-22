'use client';

import React from 'react';

/**
 * Shows an existing image thumbnail that opens full-size on click / View.
 */
export default function ImagePreview({
  src,
  alt = 'Preview',
  width = 80,
  height = 80,
  className = '',
  imgClassName = 'rounded shadow-sm',
  showViewButton = true,
}) {
  if (!src) return null;

  const openImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(src, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`d-inline-flex flex-column align-items-center gap-1 ${className}`}>
      <button
        type="button"
        onClick={openImage}
        title="Click to view image"
        className="border-0 bg-transparent p-0"
        style={{ cursor: 'zoom-in', lineHeight: 0 }}
      >
        <img
          src={src}
          alt={alt}
          className={imgClassName}
          style={{ width, height, objectFit: 'cover', display: 'block', maxWidth: '100%' }}
        />
      </button>
      {showViewButton && (
        <button
          type="button"
          className="btn btn-link btn-sm p-0 text-decoration-none"
          style={{ color: 'var(--primary-color-1)', fontSize: '12px' }}
          onClick={openImage}
        >
          <i className="far fa-eye me-1"></i>View
        </button>
      )}
    </div>
  );
}
