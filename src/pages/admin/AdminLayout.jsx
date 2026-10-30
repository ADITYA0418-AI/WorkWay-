/**
 * AdminLayout — thin passthrough for the `/admin` route.
 *
 * The new AdminDashboard is fully self-contained (its own sidebar +
 * state-based routing), so this layout just renders it directly at `/admin`.
 * All the old sub-routes (/admin/verification, /admin/disputes, etc.) are
 * now handled INSIDE the dashboard via useState — no URL changes needed.
 */
import React from 'react';
import { AdminDashboard } from './AdminDashboard';

export const AdminLayout = () => <AdminDashboard />;
