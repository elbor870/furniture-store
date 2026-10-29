import React from 'react'
export default function Loader() { return <div className="spinner" role="status"></div> }
export function SkeletonGrid({ count = 8 }) { return <div className="product-grid">{Array.from({ length: count }).map((_, i) => <div key={i} className="skeleton skeleton-card" />)}</div> }
