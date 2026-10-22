import { notFound } from 'next/navigation';

export default function AdminLoginPage() {
  // Disguise route: direct access to /admin/login is completely blocked and returns 404
  notFound();
}
