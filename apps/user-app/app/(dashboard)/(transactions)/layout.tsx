// import { getServerSession } from "next-auth";
// import { redirect } from 'next/navigation'
// import { authOptions } from "../../lib/auth";
// import { ServerSessionUser } from "@repo/interfaces/interfaces";

// export default async function Transactions() {
//     const session:{user:ServerSessionUser} | null = await getServerSession(authOptions);
//     if (!session?.user) {
//         redirect('/signin')
//     }

//     return <div>
//         Hi
//     </div>
// }
import { TransactionButtons } from '../../../components/TransactionButtons';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="w-full">
      <div className="text-6xl text-[#5640d7] pt-20 md:pl-10  font-bold">
        Transactions
      </div>

      <div>
        <TransactionButtons></TransactionButtons>
      </div>

      {children}
    </div>
  );
}
