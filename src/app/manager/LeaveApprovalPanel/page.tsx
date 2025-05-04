'use client';

import { Suspense } from 'react';
import InnerLeaveApprovalPanel from './InnerLeaveApprovalPanel';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading Leave Panel...</div>}>
      <InnerLeaveApprovalPanel />
    </Suspense>
  );
}
