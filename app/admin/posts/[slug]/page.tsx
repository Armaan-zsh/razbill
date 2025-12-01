export async function generateStaticParams() {
  // No admin post pages should be statically exported.
  // Returning an empty array satisfies the `output: 'export'` requirement
  // for dynamic routes during the static export build.
  return []
}

export default function AdminPostPlaceholder() {
  // This placeholder page is never intended to be visited on the static site.
  // It exists only to allow `next build` + `next export` to complete.
  return null
}
