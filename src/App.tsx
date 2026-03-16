import { useState } from "react";
import LoanForm from "@/components/LoanForm";
import LoanResult from "@/components/LoanResult";
import LoanTable from "@/components/LoanTable";
import type { CaculateLoanResponse } from "@/ultils/loan";

function App() {
  const [cal, setCal] = useState<CaculateLoanResponse | null>(null);

  return (
    <div className="min-h-screen flex items-start justify-center p-8">
      <div className="w-full max-w-6xl space-y-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="xl:col-span-8 col-span-12">
            <LoanForm setCal={setCal} />
          </div>

          <div className="xl:col-span-4 col-span-12">
            <LoanResult cal={cal} />
          </div>
        </div>

        <LoanTable cal={cal} />
      </div>
    </div>
  );
}

export default App;
