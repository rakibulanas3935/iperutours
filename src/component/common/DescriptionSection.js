"use client";

export default function DescriptionSection({ data }) {
  const descriptions = data?.description || [];

  if (!descriptions.length) return null;

  return (
    <section id="description" className="mb-12 scroll-mt-28">
      <h2 className="text-xl font-bold text-gray-800 mb-3">Description</h2>

      <div className="space-y-4">
        {descriptions.map((desc, idx) => (
          <div
            key={idx}
            className="text-sm text-text-body"
            dangerouslySetInnerHTML={{ __html: desc }}
          />
        ))}
      </div>
    </section>
  );
}
