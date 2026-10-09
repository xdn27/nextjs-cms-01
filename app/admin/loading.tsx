import { Loader2 } from 'lucide-react';

export default function AdminLoading() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center text-[#9a9996]">
      <Loader2 className="h-6 w-6 animate-spin" />
    </div>
  );
}
