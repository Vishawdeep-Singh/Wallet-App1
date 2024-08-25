'use client';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        await router.push('/dashboard');
      }}
      className="p-5 mt-24 border-2 rounded-lg"
    >
      Go to Dashboard
    </button>
  );
}
